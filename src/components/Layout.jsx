import React, { useState } from 'react'
import SideBar from './SideBar'

const Layout = ({children}) => {
  const [sidebarToggle, setSidebarToggle] = useState(true);

  return (
    <React.Fragment>
        <div className='flex'>
            <SideBar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
            <div >
                <div className={` ${sidebarToggle ? 'ml-72' : 'ml-20'} w-full p-10`}>{children}</div>
            </div>

        </div>
    </React.Fragment>
  )
}

export default Layout