import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';


const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedPermissions, setSelectedPermissions] = useState({});
    const [originalPermissions, setOriginalPermissions] = useState({});

    useEffect(() => {
        // Fetch roles
        axios.get("http://localhost:5000/role").then((response) => {
          setRoles(response.data);
        });
        
        //Fetch permissions
        axios.get("http://localhost:5000/permissions").then((response) => {
          const organizedPermissions = organizePermissionsByResource(response.data);
          setPermissions(organizedPermissions);
        });
    }, []);

    useEffect(() => {
        if(selectedRole){
            axios.get(`http://localhost:5000/role-permissions/${selectedRole}`)
            .then((response) => {
                updateSelectedPermission(response.data);
            })
            .catch((error) => {
                console.error("Error retrieving role permissions:", error);
            });
        } else {
            setSelectedPermissions({});
            setOriginalPermissions({});
        }
    },[selectedRole]);

    const organizePermissionsByResource = (permissions) => {
        const organize = {};
        permissions.forEach((permissions) => {
            const {resource, action, id } = permissions;
            if(!organize[resource]){
                organize[resource] = {};
            }
            organize[resource][action] = id;
        });
        return organize;
    };

    const updateSelectedPermission = (rolePermission) => {
        const updatePermissions = {};
        const originalPerms = {};
        rolePermission.forEach(({ roleId, permissionId }) => {
            const foundPermission = Object.keys(permissions).find((resource) => Object.values(permissions[resource]).includes(permissionId));

            if(foundPermission){
                const resource = foundPermission;
                const action = Object.keys(permissions[resource]).find((action) => permissions[resource][action] === permissionId);
                if(!updatePermissions[resource]){
                    updatePermissions[resource] = {};
                    originalPerms[resource] = {};
                }
                updatePermissions[resource][action] = permissionId;
                originalPerms[resource][action] = permissionId;
            }
        });
        setSelectedPermissions(updatePermissions);
        setOriginalPermissions(originalPerms);
    };

    const handlePermissionChange = (resource, action, checked) => {
        setSelectedPermissions((prevState) => {
            const newState = {...prevState};

            const permission = permissions[resource][action];
            if(!permission){
                console.error(`Permission ID not found for action '${action}' on resource '${resource}'`);
                return newState;
            }

            if(checked){
                if(!newState[resource]){
                    newState[resource] = {};
                }
                newState[resource][action] = permission;
            }else{
                if(newState[resource]){
                    delete newState[resource][action];
                }
            }

            return newState
        });
    };

    const handleSave = async () => {
        const addedPermissions = [];
        const removedPermissions = [];

        Object.keys(selectedPermissions).forEach((resource) => {
            Object.keys(selectedPermissions[resource]).forEach((action) => {
                const permissionId = selectedPermissions[resource][action];
                if(!originalPermissions[resource] || originalPermissions[resource][action] !== permissionId){
                    addedPermissions.push(permissionId);    
                }
            });
        });

        Object.keys(originalPermissions).forEach((resource) => {
            Object.keys(originalPermissions[resource]).forEach((action) => {
                const permissionId = originalPermissions[resource][action];
                if(!selectedPermissions[resource] || selectedPermissions[resource][action] !== permissionId){
                    removedPermissions.push(permissionId);
                }
            });
        });

        if(selectedRole){
            try {
                const promises = [];

                if(addedPermissions.length > 0){
                    promises.push(
                        axios.post("http://localhost:5000/role-permissions",{
                            roleId: selectedRole,
                            permissionId: addedPermissions,
                        })
                    );
                    
                }

                if(removedPermissions.length > 0){
                    promises.push(
                        axios.delete("http://localhost:5000/role-permissions",{
                            data: {
                                roleId: selectedRole,
                                permissionId: removedPermissions,
                            },
                        })
                    );
                }

                await Promise.all(promises);

                // Update local state to reflect changes
                const updatedPermissions = { ...selectedPermissions };
                Object.keys(selectedPermissions).forEach((resource) => {
                Object.keys(selectedPermissions[resource]).forEach((action) => {
                    if (removedPermissions.includes(selectedPermissions[resource][action])) {
                    delete updatedPermissions[resource][action];
                    }
                });
                });
                setSelectedPermissions(updatedPermissions);
                setSelectedRole('');

                alert("Permissions updated successfully");
            } catch (error) {
                console.error("Error saving role permissions:", error);
                alert("Error saving role permissions"); 
            }
        } else {
            alert("Please select a role and at least one permission");
        }
    };

    return (
        <div>
            <h2 className='bold-32 my-5'>Roles</h2>
            <Link to={`/role/add/`}>Add</Link>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg container mt-5">
                
                <table class="min-w-full  h-full text-sm text-center  text-gray-500 dark:text-gray-400  table-fixed">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr >
                            <th className='px-2 '>
                                No
                            </th>
                            <th >
                                Role Name
                            </th>
                            <th className='px-6 py-3'>
                                Permissions
                            </th>
                            <th >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roles.map((role, i)=>(
                                <>
                                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-t dark:border-gray-700"
                                    key={role.id}>
                                        <td class="px-2 ">{i + 1}</td>
                                        <td class=" ">{role.name}</td>
                                        <td><button onClick={selectedRole? () => setSelectedRole('') : () => setSelectedRole(role.id)}>{(selectedRole === role.id)? 'Hide' : 'Show'}</button></td>
                                        <td class="px-6 py-3 ">
                                            <Link to={`/role/edit/${role.id}`}>
                                                <button className='items-center p-3'>
                                                    <MdEdit className='text-blue-700 items-center' style={{  fontSize: '1.5rem' }}/>
                                                </button>
                                            </Link>
                                            <button className='items-center'><FaTrashAlt className='text-red-600 items-center' style={{  fontSize: '1.4rem' }}/></button>
                                        </td>
                                    </tr>
                                    {(selectedRole === role.id) && (
                                        <tr class='border-none'>
                                            <td colSpan={4} className=' flex-col'>
                                                <div className='relative overflow-x-auto shadow-md p-3 m-3 border sm:rounded-md'>
                                                    <div className="max-h-64 overflow-y-auto">
                                                    <table className='min-w-full table-auto border-collapse p-2 w-full'>
                                                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
                                                            <tr>
                                                            <th class="px-2 py-3 ">Resource</th>
                                                            <th class="px-2 py-3 ">Create</th>
                                                            <th class="px-2 py-3 ">Read</th>
                                                            <th class="px-2 py-3 ">Update</th>
                                                            <th class="px-2 py-3 ">Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody >
                                                            {Object.keys(permissions).map((resource) => (
                                                            <tr key={resource}>
                                                                <td >{resource}</td>
                                                                <td>
                                                                <input type="checkbox" checked={!!selectedPermissions[resource]?.create} onChange={(e) => handlePermissionChange(resource, "create", e.target.checked)} />
                                                                </td>
                                                                <td>
                                                                <input type="checkbox" checked={!!selectedPermissions[resource]?.read} onChange={(e) => handlePermissionChange(resource, "read", e.target.checked)} />
                                                                </td>
                                                                <td>
                                                                <input type="checkbox" checked={!!selectedPermissions[resource]?.update} onChange={(e) => handlePermissionChange(resource, "update", e.target.checked)} />
                                                                </td>
                                                                <td>
                                                                <input type="checkbox" checked={!!selectedPermissions[resource]?.delete} onChange={(e) => handlePermissionChange(resource, "delete", e.target.checked)} />
                                                                </td>
                                                            </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <button className="bold-16 bg-green-300 p-3 w-auto m-3 rounded-xl shadow-lg hover:bg-green-400" onClick={handleSave}>
                                                        Save Permissions
                                                    </button>
                                                    </div>
                                                </div>
                                                
                                            </td>
                                        </tr>
                                    )}
                                        
                                </>
                                
                            ))
                        }
                        
                        
                    </tbody>
                </table>
            </div>
            </div>
    )
}

export default RoleList