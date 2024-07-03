import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../features/authSlice';

const FormAddRole = () => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [, setMsg] = useState('');
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const saveRole = async (e) => {
      e.preventDefault();
      try {
        await axios.post(`${apiUrl}/role`, getToken(), {
          name: name,
          slug: slug,
        });
        navigate('/role');
      } catch (error) {
        if(error.response){
          setMsg(error.response.data.msg);
        }
      }
    }

  return (
    <div className='mx-10'>
        <h1 className='bold-32 my-5'>Add New Role</h1>
        <div >
          <form onSubmit={saveRole}>
            <div>
              <label className='label'>Name</label>
              <div>
                <input 
                  type="text" 
                  className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}/>
              </div>
            </div>
            <div>
              <label className='label'>Slug</label>
              <div>
                <input 
                  type="text" 
                  className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}/>
              </div>
            </div>
            <div className="flex xl:justify-end mt-5 md:justify-center">
                <button type="submit" className="bold-32 bg-green-300 p-3 xl:w-[30%] w-[100%] rounded-xl shadow-lg hover:bg-green-400">
                  Submit
                </button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default FormAddRole