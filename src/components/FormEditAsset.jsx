import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormEditAsset = () => {
  const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [asset, setAsset] = useState([]);
    const {id} = useParams();

    useEffect(() => {
      if(id){
        const getFixedById = async () => {
          try {
              const response = await axios.get(`http://localhost:5000/fixed/${id}`);
              setAsset(response.data);
            console.log(asset);
    
          } catch (error) {
              if(error.response){
                  setMsg(error.response.data.msg);
              }
          }
        };
        getFixedById();
      }
    }, [id]);

    const mainData = [
      {name: 'IDNoEB', value: asset.IDNoEB, index: 0 },
      {name: 'IDNoGR', value: asset.IDNoGR, index: 1 },
      {name: 'RegDate', value: asset.Entity, index: 2 },
      {name: 'FixedNo', value: asset.FixedNo, index: 3 },
      {name: 'FixedAssetName', value: asset.FixedAssetName, index: 4 },
      {name: 'Status', value: asset.Status, index: 5 },
      // {name: 'IDNoGR', value: asset.IDNoGR },
    ];

    const handleChange = (e) => {
      const {name, value} = e.target;
      setAsset((prev) => {
          return {...prev, [name]: value};
      });
      console.log(e.target);
  };

  return (
    <div className='w-full flex-1 flex-col bg-green-300'>
      <h1>Detail Asset</h1>
      <form>
        <div className='flex flex-wrap'>
          {
            mainData.map((data, i) => {
              <div key={data.index} className='mx-3 w-[45%]'>
                    <label htmlFor={data.name} className='label' >{data.name}</label>
                    <input
                        type={'text'}
                        id={data.name}
                        name={data.name}
                        value={data.value}
                        onChange={handleChange}
                        className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
                    />
                </div>
            })
          }
        </div>
      </form>
    </div>
  )
}

export default FormEditAsset