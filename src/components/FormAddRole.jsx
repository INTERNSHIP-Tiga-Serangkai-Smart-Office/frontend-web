import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormAddRole = () => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveRole = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:5000/role', {
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
  //   const {id} = useParams();

  //   useEffect(() => {
  //   if(id){
        
  //           const getRoleById = async () => {
  //               try {
  //                   const response = await axios.get(`http://localhost:5000/role/${id}`);
  //                   setName(response.data.name);
  //                   setSlug(response.data.slug);
  //               } catch (error) {
  //                   if(error.response){
  //                       setMsg(error.response.data.msg);
  //                   }
  //               }
  //           };
  //           getRoleById();
  //   }
  // }, [id]);

  return (
    <div className=''>
        <h1>Add New Role</h1>
        <div>
          <form className='' onSubmit={saveRole}>
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
            <div className="field mt-5">
                <button type="submit" className="bold-32 bg-green-300 p-3 w-full rounded-xl shadow-lg hover:bg-green-400">
                  Submit
                </button>
              </div>
          </form>
        </div>
    </div>
  )
}

export default FormAddRole