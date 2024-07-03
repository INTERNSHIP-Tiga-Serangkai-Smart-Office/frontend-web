import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../features/authSlice';

const FormAddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setMsg] = useState('');
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    const saveUser = async (e) => {
        e.preventDefault();
        try {
          await axios.post(`${apiUrl}/users`, getToken(), {
            name: name,
            email: email,
            password: password,
          });
          navigate('/users');
        } catch (error) {
          if(error.response){
            setMsg(error.response.data.msg);
          }
        }
    }

  return (
    <div className='mx-10'>
        <h1 className='bold-32 my-5'>Create User</h1>
        <div >
          <form onSubmit={saveUser}>
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
              <label className='label'>Email</label>
              <div>
                <input 
                  type="text" 
                  className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>
            <div>
              <label className='label'>Password</label>
              <div>
                <input 
                  type="text" 
                  className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
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

export default FormAddUser