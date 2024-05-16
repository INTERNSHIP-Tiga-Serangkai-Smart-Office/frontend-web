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
        <div class="relative w-full  shadow-md sm:rounded-lg">
            <table class="text-sm text-center  text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr >
                        <th >
                            No
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-7 py-5">
                            Roles
                        </th>
                        <th scope="col" class="px-6 py-3">
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

    )
}

export default Userlist