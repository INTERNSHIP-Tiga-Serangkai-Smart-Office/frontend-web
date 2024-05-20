import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BsArrowLeftShort,} from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { BiSolidEditLocation } from "react-icons/bi";
import { FaFolder,FaUserAlt } from "react-icons/fa";
import { LuFolderInput } from "react-icons/lu";
import { LuFolderOutput } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";

const SideBar = ({sidebarToggle, setSidebarToggle}) => {
  const menus =[
    {name: "Dashboard", link:"/dashboard", icon:RiDashboardFill},
    {name: "User", link:"/users", icon:FaUserAlt},
    {name: "Data Asset", link:"/dataaset", icon:FaFolder},
    {name: "Relokasi", link:"#", icon:BiSolidEditLocation},
    {name: "Asset Masuk", link:"#", icon:LuFolderInput},
    {name: "Asset Keluar", link:"#", icon:LuFolderOutput},
    {name: "Laporan", link:"#", icon:TbReportAnalytics},
    {name : "Settings", link:"#", icon:IoSettingsOutline,margin:true},
    {name : "LogOut", link:"#", icon:MdLogout},
  ]

  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };


  //get data user
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect (() => {
    axios.get('http://localhost:5000/me').then(res => {
      setUsername(res.data.name)
      setRole(res.data.role)
    }).catch(err => {
      console.log(err)
      
    })
  }, [])


  return (
    <aside className='flex fixed overflow-auto'>
      <div className={`bg-clr-bg-sd h-screen p-5 pt-8 ${sidebarToggle? "w-72":"w-20"} duration-300 relative`} style={{ borderRadius:  "0px 20px 20px 0px"  }}>
        <BsArrowLeftShort className={`bg-white text-purple-950 text-3xl rounded-full absolute -right-3 top-9 border border-black 
        cursor-pointer ${!sidebarToggle && "rotate-180"}`} onClick={()=>setSidebarToggle(!sidebarToggle)}/>
        <div className='inline-flex'>
          <img 
            src={process.env.PUBLIC_URL + '/logo2.png'} 
            alt="logo"
            className='w-[50px] h-[50px] block float-left mr-2 bg-black rounded-md p-2' />
          {/* <AiFillEnvironment className={`bg-amber-300 text-4xl
          rounded cursor-pointer block float-left mr-2 duration-500 ${!open && "rotate-[350deg]"}`}/> */}
          <h1 className={` items-center justify-center font-bold text-white origin-left text-2xl duration-350 mb-7 truncate ${!sidebarToggle && 'scale-0'}`}>
            A M S
          </h1>
        </div>

        <div className={ `mb-7 flex flex-row ${sidebarToggle && `p-3  bg-slate-100 rounded-xl`} hover:bg-light-white`}>
          <img 
            src={process.env.PUBLIC_URL + 'profile-avatar.svg'} 
            alt="profile" 
            className='w-[60px] h-[60px]'
          />
          <div className={`flex flex-col mx-3 items-center justify-center ${!sidebarToggle && `invisible`}`}>
            {role && <h3 className='inline-flex items-center text-white px-3 bg-[#2C449B] rounded-2xl truncate'>{role}</h3>}
            {username && <h2 className='text-xl font-bold'>{username}</h2>}
          </div>
        </div>

        <div className=' flex flex-col gap-4 relative'>
          {
            menus?.map((menu,i)=>(
                <Link to={menu?.link} key={i} 
                className={`${menu?.margin && 'mt-5'} flex items-center text-sm gap-3.5 font-medium p-2 rounded-md transition-colors duration-300 hover:bg-gray-200 hover:text-gray-800 ${activeIndex === i ? 'bg-gray-200 text-gray-800' : ''}`}
                onClick={() => handleItemClick(i)}
                style={{ paddingRight: '30px', marginRight: '-20px', width: 'calc(100% + 20px)', borderRadius: '20px 0px 0px 20px' }}
                >
                  <div>{React.createElement(menu?.icon,{size:"20"})}</div>
                  <h2 style={{transitionDelay:`${i+3}00ms`}} className={`whitespace-pre duration-500 ${!sidebarToggle && 'opacity-0 translate-x-28 overflow-hidden'}`}>
                    {menu?.name}
                    </h2>
                </Link>
            ))
          }
        </div>
        
                
      </div>
    </aside>
  )
}

export default SideBar
