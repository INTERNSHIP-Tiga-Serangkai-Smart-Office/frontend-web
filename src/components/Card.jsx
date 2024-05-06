import React from 'react'

function Card({imgSrc, title, number, bgColor}) {
  return (
    <div className='m-10 p-5 rounded-xl flex flex-row w-[250px] h-[150px]' style={{backgroundColor: bgColor}}>
        <div className='flex-col'>
            <h1 className='text-2xl font-bold text-white'>{number}</h1>
            <h3 className='text-m font-semibold text-white'>{title}</h3>
        </div>
        <div>
            <img 
                src={imgSrc}
                alt="building"
                width={100}
                height={100}
            />
        </div>
    </div>
  )
}

export default Card