import { Link } from 'react-router-dom';
import axios from 'axios';
// import { Button } from 'bootstrap';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { FaTrashAlt } from "react-icons/fa";


function Userlist() {
    const[data,setdata] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/users')
        .then(res => setdata(res.data))
        .catch(err => console.log(err));
    }, [])
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
                                <td class=" ">{d.role}</td>
                                <td class=" ">
                                    <button className='p-3'><MdEdit className='text-blue-700' style={{  fontSize: '1.5rem' }}/></button>
                                    <button><FaTrashAlt className='text-red-600' style={{  fontSize: '1.4rem' }}/></button>
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