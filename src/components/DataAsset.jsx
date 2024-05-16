import React from 'react'
import { Link } from 'react-router-dom'

const DataAsset = () => {
  return (
    <div>
        <h1 className='text-2xl font-semibold'>Data Asset Page</h1>
        <Link to="/dataaset/add" className="button is-primary mb-2">
          Add New
        </Link>
    </div>
  )
}

export default DataAsset