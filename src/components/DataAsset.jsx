import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { FaTrashAlt } from "react-icons/fa";
import { IoMdBarcode } from "react-icons/io";
import axios from "axios";
import Barcode from 'react-barcode';
import ReactToPrint from "react-to-print";

const DataAsset = () => {
  const [fixeds, setFixed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [barcode, setBarcode] = useState('');
  const ref = useRef([]);
  ref.current = [];

  useEffect(() => {
    // getFixed();
    axios.get("http://localhost:5000/fixed").then((res)=> {
      setFixed(res.data.data);
    });
    console.log(fixeds);
  }, []);

  const getFixed = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fixed");
      setFixed(response.data.data.data);
      console.log(fixeds);
    } catch (error) {
      setError("Failed to fetch fixed assets");
    }
  };

  const deleteFixed = async (FixedIDNo) => {
    await axios.delete(`http://localhost:5000/fixed/${FixedIDNo}`);
    getFixed();
  };

  // const [ref, { content }] = useBarcode({ value: data });
  const printBarcodes = () => {
    const printableContent = (
      <div className="barcode-container"> {/* Container for layout */}
        {ref.current.map((item, index) => (
          <div key={index} className="barcode-item"> {/* Styling for each barcode */}
            <Barcode ref={item[index]} value={item} />
          </div>
        ))}
      </div>
    );
    return <ReactToPrint ref={ref} documentTitle="Barcodes">{printableContent}</ReactToPrint>;
  };

  const AddToRefs = (el) => {
    if(el && !ref.current.includes(el)){
      ref.current.push(el);
      console.log(ref.current);
    } 
  };
  
  return (
    <div>
        <h1 className='text-2xl montserrat-bold'>Data Asset Page</h1>
        <Link to="/dataaset/add" className="button is-primary mb-2">
          Add New
        </Link>
        {/* <ReactToPrint 
                              trigger={() => <button className="p-3"> <IoMdBarcode className="text-green-300" style={{  fontSize: '1.4rem' }}/></button>}
                              content={() => ref.current}/> */}
        <button onClick={printBarcodes}>print</button>
          <div>
          <div class="relative shadow-md sm:rounded-lg container mt-5">
          {isLoading && <p>Loading assets...</p>}
      {error && <p className="error-message">{error}</p>}
      {/* {!isLoading && !error  && <p>No assets found.</p>} */}
      {!isLoading && !error && fixeds.length > 0 && (
          <table class="flex-row  overflow-y-auto w-full text-sm text-center  text-gray-500 dark:text-gray-400  table-fixed">
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
                <th>
                  Barcode
                </th>
                <th >
                  Action
                </th>
            </tr>
        </thead>
        <tbody>
            {
                fixeds && fixeds.map((d, i)=>(
                    <tr class=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    key={d.FixedIDNo}>
                    
                        <td class=" ">{i + 1}</td>
                        <td class=" ">{d.Entity}</td>
                        <td class=" overflow-hidden  ">{d.AccNo}</td>
                        <td class="p-3 relative overflow-hidden">{d.FixedNo}</td>
                        <td class=" ">{d.FixedGroup ? d.FixedGroup.Name : "N/A"}</td>
                        <td class=" ">{d.EntitasBisni ? d.EntitasBisni.EBCode : "N/A"}</td>
                        <td class='overflow-x-auto'><Barcode width={1} height={30} ref={AddToRefs} value={d.FixedNo}/></td>
                        <td class=" ">
                            <Link to={`/dataaset/edit/${d.FixedIDNo}`}><button  className='p-3'><MdEdit className='text-blue-700' style={{  fontSize: '1.5rem' }}/></button></Link>
                            <button><FaTrashAlt className='text-red-600' style={{  fontSize: '1.4rem' }}/></button>
                            <ReactToPrint 
                              trigger={() => <button className="p-3"> <IoMdBarcode className="text-green-300" style={{  fontSize: '1.4rem' }}/></button>}
                              content={() => ref.current[i]}/>
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