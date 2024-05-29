import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const DataAsset = () => {
  const [fixeds, setFixed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    getFixed();
  }, []);

  const getFixed = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fixed");
      setFixed(response.data);
    } catch (error) {
      setError("Failed to fetch fixed assets");
    }
  };

  const deleteFixed = async (FixedIDNo) => {
    await axios.delete(`http://localhost:5000/fixed/${FixedIDNo}`);
    getFixed();
  };
  
  return (
    <div>
        <h1 className='text-2xl font-semibold'>Data Asset Page</h1>
        <Link to="/dataaset/add" className="button is-primary mb-2">
          Add New
        </Link>
          <div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg container mt-5">
          {isLoading && <p>Loading assets...</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && !error && fixeds.length === 0 && <p>No assets found.</p>}
      {!isLoading && !error && fixeds.length > 0 && (
        <table class="flex-row  w-full text-sm text-center  text-gray-500 dark:text-gray-400  table-fixed">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr >
                <th >
                    No
                </th>
                <th >
                    Entity
                </th>
                <th >
                  Acc No
                </th>
                <th >
                  AIN
                </th>
                <th >
                Fixed Group
                </th>
                <th >
                Entitas Bisnis
                </th>
                <th >
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
                fixeds.map((d, i)=>(
                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    key={d.FixedIDNo}>
                    
                        <td class=" ">{i + 1}</td>
                        <td class=" ">{d.Entity}</td>
                        <td class=" ">{d.AccNo}</td>
                        <td class=" ">{d.Currency}</td>
                        <td class=" ">{d.FixedNo}</td>
                        <td class=" ">{d.Qty}</td>
                        <td class=" ">
                            <button className='p-3'><MdEdit className='text-blue-700' style={{  fontSize: '1.5rem' }}/></button>
                            <button><FaTrashAlt className='text-red-600' style={{  fontSize: '1.4rem' }}/></button>
                        </td>
                        
                    </tr>
                ))
            }
            
            
        </tbody>
    </table>
      )}
            
        </div>
          </div>
        
    </div>
  )
}

export default DataAsset