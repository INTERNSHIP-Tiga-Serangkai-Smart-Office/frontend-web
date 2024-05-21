import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { FaTrashAlt } from "react-icons/fa";


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
        
        // Fetch permissions
        // axios.get("http://localhost:5000/permissions").then((response) => {
        //   const organizedPermissions = organizePermissionsByResource(response.data);
        //   setPermissions(organizedPermissions);
        // });
    }, []);

    useEffect(() => {
        if(selectedRole){
            axios.get(`http://localhost:5000/role-permissions/${selectedRole}`)
            .then((response) => {

            })
        }
    })

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg container mt-5">
                
                <table class="flex-row  w-full text-sm text-center  text-gray-500 dark:text-gray-400  table-fixed">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr >
                            <th >
                                No
                            </th>
                            <th >
                                Role Name
                            </th>
                            <th >
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
                                        <td class=" ">{i + 1}</td>
                                        <td class=" ">{role.name}</td>
                                        <td><button onClick={selectedRole? () => setSelectedRole('') : () => setSelectedRole(role.id)}>{(selectedRole === role.id)? 'Hide' : 'Show'}</button></td>
                                        <td class=" ">
                                            <button className='p-3'><MdEdit className='text-blue-700' style={{  fontSize: '1.5rem' }}/></button>
                                            <button><FaTrashAlt className='text-red-600' style={{  fontSize: '1.4rem' }}/></button>
                                        </td>
                                    </tr>
                                    <tr class='border-none'>
                                        {(selectedRole === role.id) && (
                                            <td className='col-span-4'>
                                                <table>

                                                </table>
                                            </td>
                                        )}
                                        
                                    </tr>
                                </>
                                
                            ))
                        }
                        
                        
                    </tbody>
                </table>
            </div>
    )
}

export default RoleList