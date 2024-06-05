import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormEditAsset = () => {
  const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [asset, setAsset] = useState([]);
    const {id} = useParams();

    useEffect(() => {
      // if(id){
      //   const getFixedById = async () => {
      //     try {
      //         const response = await axios.get(`http://localhost:5000/fixed/${id}`);
      //         setAsset(response.data);
      //       console.log(asset);
    
      //     } catch (error) {
      //         if(error.response){
      //             setMsg(error.response.data.msg);
      //         }
      //     }
      //   };
      //   getFixedById();
      // }
      axios.get(`http://localhost:5000/fixed/${id}`).then((res) => {
        setAsset(res.data);
      });
      console.log(asset);
    }, [id]);

    const mainData = [
      {name: 'IDNoEB', value: asset.IDNoEB, index: 0 },
      {name: 'IDNoGR', value: asset.IDNoGR, index: 1 },
      {name: 'RegDate', value: asset.Entity, index: 2 },
      {name: 'FixedNo', value: asset.FixedNo, index: 3 },
      {name: 'FixedAssetName', value: asset.FixedAssetName, index: 4 },
      {name: 'Status', value: asset.Status, index: 5 },
    ];

    const handleChange = (e) => {
      const {name, value} = e.target;
      setAsset((prev) => {
          return {...prev, [name]: value};
      });
      console.log(e.target);
  };

  //tab layout
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className='flex w-full h-full flex-col'>
      <h1>Detail Asset</h1>
      <form>
        <div className='grid grid-cols-3  bg-green-300'>
          { mainData.map((data) => (
              <div key={data.index} className='flex flex-row items-center mx-3'>
                    <label htmlFor={data.name} className='label w-[40%]' >{data.name}</label>
                    <input
                        type={'text'}
                        id={data.name}
                        name={data.name}
                        value={data.value}
                        onChange={handleChange}
                        className="w-[60%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
                    />
              </div>
          ))
          }
        </div>

        <div className='w-full h-full mt-3 border-2 p-4 rounded-xl'>
          <div className='flex flex-row border-b-2'>
            <div 
            className={toggleState === 1 ? 'inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400' : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}
            onClick={() => toggleTab(1)}
            >General Info</div>
            <div 
            className={toggleState === 2 ? 'inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400' : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}
            onClick={() => toggleTab(2)}
            >Tab 2</div>
            <div 
            className={toggleState === 3 ? 'inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400' : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}
            onClick={() => toggleTab(3)}
            >Tab 3</div>
          </div>

          <div className='w-full h-full'>
            <div className={toggleState === 1 ? '' : 'hidden'}>
              <h1>Content 1</h1>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto beatae quod perspiciatis excepturi fugit soluta natus, sunt odio impedit ipsum culpa deserunt nihil nobis tenetur veniam aperiam saepe distinctio exercitationem.</p>
            </div>
            <div className={toggleState === 2 ? '' : 'hidden'}>
              <h1>Content 2</h1>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto beatae quod perspiciatis excepturi fugit soluta natus, sunt odio impedit ipsum culpa deserunt nihil nobis tenetur veniam aperiam saepe distinctio exercitationem.</p>
            </div>
            <div className={toggleState === 3 ? '' : 'hidden'}>
              <h1>Content 3</h1>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto beatae quod perspiciatis excepturi fugit soluta natus, sunt odio impedit ipsum culpa deserunt nihil nobis tenetur veniam aperiam saepe distinctio exercitationem.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default FormEditAsset