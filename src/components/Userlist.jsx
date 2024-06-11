import { Link } from 'react-router-dom';
import axios from 'axios';
// import { Button } from 'bootstrap';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { FaTrashAlt } from "react-icons/fa";
import AlertComp from './AlertComp';


function Userlist() {
    const[data,setdata] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [selectRole, setSelectRole] = useState(null);

    useEffect(()=>{
        getRoles();
        getUserRoles();
    }, []);

    const getRoles = async () => {
        const response = await axios.get('http://localhost:5000/role');
        setRoles(response.data);
    };

    const getUserRoles = async () => {
        try {
          const userResponse = await axios.get("http://localhost:5000/users");
          const userRolesResponse = await axios.get("http://localhost:5000/user-role");
          const rolesResponse = await axios.get("http://localhost:5000/role");
    
          const users = userResponse.data;
          const userRoles = userRolesResponse.data.userRoles;
          const roles = rolesResponse.data;
    
          // Create a map to efficiently lookup role IDs by user ID
          const roleIdsByUserId = userRoles.reduce((acc, { userId, roleId }) => {
            if (!acc[userId]) {
              acc[userId] = [];
            }
            acc[userId].push(roleId);
            return acc;
          }, {});
    
          // Update users with their corresponding roles and role IDs
          const updatedUsers = users.map((user) => {
            const roleIds = roleIdsByUserId[user.id] || [];
            const userRole = roleIds.map((roleId) => roles.find((role) => role.id === roleId)?.name);
            return { ...user, roles: userRole, roleIds: roleIds }; // Assign roleIds to user
          });
    
          setdata(updatedUsers);
          console.log(data);

        } catch (error) {
          console.error("Error fetching user roles:", error);
        }
    };

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        setShowAlert(false);
        getUserRoles(); // Update users after deletion
    };

    const addRole = async(userId, roleId) => {
        try {
            await axios.post("http://localhost:5000/user-role", {
                userId: userId,
                roleId: roleId,
            });
            await getUserRoles();
            setSelectRole(null);
        } catch (error) {
            console.error("Error adding role:", error);
            setSelectRole(null);
        }
    }
    
    const deleteRole = async (userId, roleId) => {
        try {
          await axios.delete("http://localhost:5000/user-role", {
            data: { userId, roleId },
          });
          // Update user data after role deletion
          await getUserRoles();
        } catch (error) {
          console.error("Error deleting role:", error);
        }
    };

    const toggleDropdown = (index) => {
        setSelectRole((prevIndex) => (prevIndex === index ? null : index));
    }

    return (
        <div className='text-start mb-3'>
                <Link to='/users/add' className='buton bg-btn-primary'>Add +</Link>
            
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg container mt-5">
            
            <table class="flex-row  w-full h-full text-sm text-center  text-gray-500 dark:text-gray-400  table-auto">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr >
                        <th >
                            No
                        </th>
                        <th >
                            Name
                        </th>
                        <th >
                            Email
                        </th>
                        <th >
                            Roles
                        </th>
                        <th >
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d, i)=>(
                            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            key={d.id}>
                            
                                <td class=" ">{i+1}</td>
                                <td class=" ">{d.name}</td>
                                <td class=" ">{d.email}</td>
                                <td>
                                    {d.roles && 
                                        d.roles.map((role, idx) => (
                                        <span key={idx}>
                                            {role}
                                            <button
                                                onClick={() => {
                                                console.log("User ID:", d.id);
                                                console.log("Role IDs:", d.roleIds);
                                                console.log("Current Index:", idx);
                                                if (d.roleIds && idx < d.roleIds.length) {
                                                    console.log("Deleting Role ID:", d.roleIds[idx]);
                                                    deleteRole(d.id, d.roleIds[idx]);
                                                }
                                                }}
                                                className="px-2 py-1 ml-1 mt-1 rounded-full text-white" style={{ backgroundColor: 'red' }}
                                            >x</button>
                                            {idx < d.roles.length - 1 && "  "}
                                        </span>
                                    ))}
                                    {/* <select name="" id="">
                                        <option value="">+</option>
                                        {roles.map((roles) => (
                                            <option value={roles.id}>{roles.name}</option>
                                        ))}
                                    </select> */}
                                    <div className='relative inline-block text-left ml-2'>
                                        <button onClick={() => toggleDropdown(i)} type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                            Roles
                                            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                            </svg>
                                        </button>

                                        <div className={`${ selectRole === i ? 'absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none' : 'hidden'}`}>
                                            {roles.map((roles, i) => (
                                                <div key={i}>
                                                    <button  onClick={() => addRole(d.id, roles.id)}>
                                                        {roles.name}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </td>
                                <td class=" ">
                                    <Link to={`/users/edit/${d.id}`}>
                                        <button className='p-3'><MdEdit className='text-blue-700' style={{  fontSize: '1.5rem' }}/></button>
                                    </Link>
                                    <button onClick={() => deleteUser(d.id)}>
                                        <FaTrashAlt className='text-red-600' style={{  fontSize: '1.4rem' }}/>
                                    </button>
                                </td>
                                
                            </tr>
                        ))
                    }
                    
                    
                </tbody>
            </table>
        </div>
        
    </div>

    )
}

export default Userlist