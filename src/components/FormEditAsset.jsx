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
      {name: 'RegDate', value: asset.RegDate, index: 2 },
      {name: 'FixedNo', value: asset.FixedNo, index: 3 },
      {name: 'FixedAssetName', value: asset.FixedAssetName, index: 4 },
      {name: 'Status', value: asset.Status, index: 5 },
      {name: 'Entity', value: asset.Entity, index: 6 },
    ];

    const generalInfo = [
      {index: 0, name: 'AccNo'},
      {index: 1, name: 'Currency'},
      {index: 2, name: 'DateAq'},
      {index: 3, name: 'CostCenterNo'},
      {index: 4, name: 'ProfitCenterNo'},
      {index: 5, name: 'LocId'},
      {index: 6, name: 'OrderNo'},
      {index: 7, name: 'InvNo'},
      {index: 8, name: 'Qty'},
      {index: 9, name: 'Pick'},
      {index: 10, name: 'PickGR'},
      {index: 11, name: 'GRNo'},
      {index: 12, name: 'Unit'},
      {index: 13, name: 'Cost'},
      {index: 14, name: 'SUnit'},
      {index: 15, name: 'SalVageValue'},
      {index: 16, name: 'SalVageValueORG'},
      {index: 17, name: 'AccDep'},
      {index: 18, name: 'Pict'},
      {index: 19, name: 'Remark'},
      {index: 20, name: 'HolderName'},
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
      <h1 className='bold-32 my-3'>Detail Asset</h1>
      <form>
        <div className='grid md:grid-cols-2 xl:grid-cols-3'>
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

        <div className='w-full mt-3 border-2 p-4 rounded-xl'>
          <div className='flex flex-row border-b-2'>
            <div 
            className={toggleState === 1 ? 'inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400' : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}
            onClick={() => toggleTab(1)}
            >General Info</div>
            <div 
            className={toggleState === 2 ? 'inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400' : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}
            onClick={() => toggleTab(2)}
            >Maintenance</div>
            <div 
            className={toggleState === 3 ? 'inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400' : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}
            onClick={() => toggleTab(3)}
            >Dokumen</div>
          </div>

          <div className='w-full h-full'>
            <div className={toggleState === 1 ? 'flex flex-col xl:flex-row' : 'hidden'}>
              <div className='grid xl:grid-cols-2'>
                { generalInfo.map((data) => (
                    <div key={data.index} className='flex flex-row items-center mx-3'>
                          <label htmlFor={data.name} className='label w-[45%]' >{data.name}</label>
                          <input
                              type={'text'}
                              id={data.name}
                              name={data.name}
                              // value={data.value}
                              onChange={handleChange}
                              className="w-[55%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
                          />
                    </div>
                ))
                }
              </div>
              <div className='flex items-centers'>
                <table class=" text-sm text-center text-gray-500 dark:text-gray-400 table-cell table-fixed">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 m-3 ">
                    <tr>
                      <th className='px-4 py-2'>Property Name</th>  
                      <th className='px-4 py-2'>Value</th>
                      <th className='px-4 py-2'>UoM</th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
              </div>
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