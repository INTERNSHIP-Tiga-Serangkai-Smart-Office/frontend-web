import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {BsArrowLeftShort,} from "react-icons/bs";
import {AiFillEnvironment} from "react-icons/ai";
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className='flex'>
      <div className={`bg-clr-bg-sd h-screen p-5 pt-8 ${open? "w-72":"w-20"} duration-300 relative`}>
        <BsArrowLeftShort className={`bg-white text-purple-950 text-3xl rounded-full absolute -right-3 top-9 border border-black 
        cursor-pointer ${!open && "rotate-180"}`} onClick={()=>setOpen(!open)}/>
        <div className='inline-flex'>
          <AiFillEnvironment className={`bg-amber-300 text-4xl
          rounded cursor-pointer block float-left mr-2 duration-500 ${!open && "rotate-[350deg]"}`}/>
          <h1 className={`text-white origin-left font-medium text-2xl duration-300 ${!open && 'scale-0'}`}>
            Dashboard</h1>
            <div>
            </div> 
        </div>
        
        <ul className='pt-5'>
                  <li className='text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white 
                  rounded-md mt-2 text-white font-montserrat font-semibold'><NavLink>Dashboard</NavLink></li>
                  <li className='text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white 
                  rounded-md mt-2 text-white font-montserrat font-semibold'><NavLink>Data Asset</NavLink></li>
                  <li className='text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white 
                  rounded-md mt-2 text-white font-montserrat font-semibold'><NavLink>Relokasi</NavLink></li>
                  <li className='text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white 
                  rounded-md mt-2 text-white font-montserrat font-semibold'><NavLink>Asset Masuk</NavLink></li>
                  <li className='text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white 
                  rounded-md mt-2 text-white font-montserrat font-semibold'><NavLink>Asset Keluar</NavLink></li>
                  <li className='text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white 
                  rounded-md mt-2 text-white font-montserrat font-semibold'><NavLink>Laporan</NavLink></li>
                  
                </ul>
                
        </div>
      <div className='p-7'>
        <h1 className='text-2xl font-semibold'>Home Page</h1>

        
      </div>
    </div>
  )
}

export default Dashboard
