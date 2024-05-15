import React from 'react'
import SideBar from './Sidebar'

const Layout = ({children}) => {
  return (
    <React.Fragment>
        <div className='flex flex-row'>
            <SideBar/>
            <div className='p-10'>
                <main>{children}</main>
            </div>

        </div>
    </React.Fragment>
  )
}

export default Layout