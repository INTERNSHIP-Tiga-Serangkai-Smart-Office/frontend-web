import React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {BsArrowLeftShort,} from "react-icons/bs";
import {AiFillEnvironment} from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { BiSolidEditLocation } from "react-icons/bi";
import { FaFolder } from "react-icons/fa";
import { LuFolderInput } from "react-icons/lu";
import { LuFolderOutput } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
// import { HiMenuAlt3} from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import Card from '../components/Card';
// import SideBar from '../components/SideBar';

const Dashboard = () => {
  const menus =[
    {name: "Dashboard", link:"/dashboard", icon:RiDashboardFill},
    {name: "Data Asset", link:"#", icon:FaFolder},
    {name: "Relokasi", link:"#", icon:BiSolidEditLocation},
    {name: "Asset Masuk", link:"#", icon:LuFolderInput},
    {name: "Asset Keluar", link:"#", icon:LuFolderOutput},
    {name: "Laporan", link:"#", icon:TbReportAnalytics},
    {name : "Settings", link:"#", icon:IoSettingsOutline,margin:true},
    {name : "LogOut", link:"#", icon:MdLogout},
  ]
  
  const [open, setOpen] = useState(true);
  return (
    <div className='flex'>
      <div className={`bg-clr-bg-sd h-screen p-5 pt-8 ${open? "w-72":"w-20"} duration-300 relative`} style={{ borderRadius: "0px 20px 20px 0px"  }}>
        <BsArrowLeftShort className={`bg-white text-purple-950 text-3xl rounded-full absolute -right-3 top-9 border border-black 
        cursor-pointer ${!open && "rotate-180"}`} onClick={()=>setOpen(!open)}/>
        <div className='inline-flex'>
          <AiFillEnvironment className={`bg-amber-300 text-4xl
          rounded cursor-pointer block float-left mr-2 duration-500 ${!open && "rotate-[350deg]"}`}/>
          <h1 className={`text-white origin-left font-medium text-2xl duration-350 mb-20 ${!open && 'scale-0'}`}>
            Dashboard</h1>
        </div>
        <div className=' flex flex-col gap-4 relative'>
          {
            menus?.map((menu,i)=>(
                <Link to={menu?.link} key={i} 
                className={`${menu?.margin && 'mt-5'} flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-light-white rounded-md`}>
                  <div>{React.createElement(menu?.icon,{size:"20"})}</div>
                  <h2 style={{transitionDelay:`${i+3}00ms`}} className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                    {menu?.name}
                    </h2>
                </Link>
            ))
          }
        </div>
        
                
      </div>
      <div className='p-7'>
        <h1 className='text-2xl font-semibold'>Home Page</h1>
        
        <div className='flex flex-row'>
          <Card 
            imgSrc={process.env.PUBLIC_URL + '/building-icon.svg'}
            title={'Asset Master'}
            number={580}
            bgColor={'#8196CE'}
          />

          <Card 
            imgSrc={process.env.PUBLIC_URL + '/building-icon.svg'}
            title={'Asset TSPM'}
            number={444}
            bgColor={'#2A4876'}
          />

          <Card 
            imgSrc={process.env.PUBLIC_URL + '/building-icon.svg'}
            title={'Asset TSPM'}
            number={444}
            bgColor={'#2A4876'}
          />
        </div>
        
      </div>
    </div>
  )
}

export default Dashboard
