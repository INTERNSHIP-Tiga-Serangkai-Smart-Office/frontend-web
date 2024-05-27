import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormAddRole = () => {
  //   const [name, setName] = useState('');
  //   const [slug, setSlug] = useState('');
  //   const [msg, setMsg] = useState('');
  //   const navigate = useNavigate();
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
    <div>
        <h1>hello world</h1>
    </div>
  )
}

export default FormAddRole