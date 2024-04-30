import React from 'react'

function Sidebar({}) {
  return (
    <aside className='h-screen'>
        <nav className='h-full flex flex-col bg-white birder-r shadow-sm'>
            <div className='p-4 pb-2 flex justify-between items-center'>
                <img src="https://img.logoipsum.com/243.svg" alt="" />
            </div>
        </nav>
    </aside>
  )
}

export default Sidebar