import { Link } from 'react-router-dom';
import axios from 'axios';
// import { Button } from 'bootstrap';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { FaTrashAlt } from "react-icons/fa";


function Userlist() {
    const[data,setdata] = useState([]);

    useEffect(()=>{
        // getUser();
        getUserRoles();
    }, []);

    const getUser = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setdata(response.data);
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
        getUserRoles(); // Update users after deletion
    };
    
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

    return (
        <div className='text-start mb-3'>
                <Link to='' className='buton bg-btn-primary'>Add +</Link>
            
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg container mt-5">
            
            <table class="flex-row  w-full text-sm text-center  text-gray-500 dark:text-gray-400  table-fixed">
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
                            key={i}>
                            
                                <td class=" ">{d.id}</td>
                                <td class=" ">{d.name}</td>
                                <td class=" ">{d.email}</td>
                                <td class=" ">
                                    {data.roles && 
                                    data.roles.map((role, idx) => (
                                        <span key={idx}>
                                            {role}
                                            <button
                                                onClick={() => {
                                                console.log("User ID:", data.id);
                                                console.log("Role IDs:", data.roleIds);
                                                console.log("Current Index:", idx);
                                                if (data.roleIds && idx < data.roleIds.length) {
                                                    console.log("Deleting Role ID:", data.roleIds[idx]);
                                                    deleteRole(data.id, data.roleIds[idx]);
                                                }
                                                }}
                                                className="delete is-small ml-1 mt-1" style={{ backgroundColor: 'red' }}
                                            ></button>
                                            {idx < data.roles.length - 1 && "  "}
                                        </span>
                                    ))}
                                </td>
                                <td class=" ">
                                    <button className='p-3'><MdEdit className='text-blue-700' style={{  fontSize: '1.5rem' }}/></button>
                                    <button ><FaTrashAlt className='text-red-600' style={{  fontSize: '1.4rem' }}/></button>
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