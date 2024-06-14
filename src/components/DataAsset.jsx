import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdBarcode } from "react-icons/io";
import axios from "axios";
import Barcode from "react-barcode";
import ReactToPrint from "react-to-print";
import QRCode from "react-qr-code";
import PrintQRModal from "./PrintQRModal";

const DataAsset = () => {
  const [fixeds, setFixed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const ref = useRef([]);
  const multiRef = useRef([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    // getFixed();
    axios.get(`http://localhost:5000/fixed?page=${page}`).then((res) => {
      setFixed(res.data.data);
    });
    console.log(fixeds);
  }, [page]);

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

  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const handlePrevPage = () => {
    setPage((prevState) => prevState - 1);
  };

  //qrcode
  const AddToRefs = (el) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
      // console.log(ref);
    }
  };

  const barcodes = (value, index) => (
    <div className="p-5" ref={(el) => (multiRef.current[index] = el)}>
      <QRCode value={value} size={200} />
      <h1>{value}</h1>
    </div>
  );

  const printableContent = (
    <div>
      {fixeds.map((data, index) => (
        <div
          key={index}
          className="barcode-item p-5"
          // ref={(el) => (ref.current[index] = el)}
        >
          {barcodes(data.FixedNo, index)}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="w-full flex items-baseline justify-between">
        <h1 className="text-2xl montserrat-bold">Data Asset Page</h1>
        <div>
          <button onClick={() => setShowModal(true)} className="m-2 p-3 bg-blue-300 rounded-lg">
            Print Barcode
          </button>
          <button className="m-2 p-3 bg-green-300 rounded-lg">
            <Link to="/dataaset/add" >
              Add New
            </Link>
          </button>
        </div>
      </div>
      {/* <div className="hidden">
        <div ref={ref} className="flex flex-row flex-wrap">
          {fixeds.map((data, index) => (
            <div
              key={index}
              className="barcode-item"
              // ref={(el) => (multiRef.current[index] = el)}
            >
              {barcodes(data.FixedNo)}
            </div>
          ))}
        </div>
      </div> */}
      {/* <ReactToPrint
        trigger={() => (
          <button className="p-3">
            {" "}
            <IoMdBarcode
              className="text-green-300"
              style={{ fontSize: "1.4rem" }}
            />
          </button>
        )}
        content={() => ref.current}
      /> */}

      <div className="w-full">
        <div className="w-full shadow-md sm:rounded-lg  mt-5">
          {isLoading && <p>Loading assets...</p>}
          {error && <p className="error-message">{error}</p>}
          {/* {!isLoading && !error  && <p>No assets found.</p>} */}
          {!isLoading && !error && fixeds.length > 0 && (
            <>
              <table class="flex-row  overflow-y-auto w-full text-sm text-center  text-gray-500 dark:text-gray-400  table-fixed">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th>No</th>
                    <th>Entity</th>
                    <th>Acc No</th>
                    <th>AIN</th>
                    <th>Fixed Group</th>
                    <th>Entitas Bisnis</th>
                    {/* <th>
                          Barcode
                        </th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fixeds &&
                    fixeds.map((d, i) => (
                      <tr
                        class=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        key={d.FixedIDNo}
                      >
                        <td class=" ">{i + 1}</td>
                        <td class=" ">{d.Entity}</td>
                        <td class=" overflow-hidden  ">{d.AccNo}</td>
                        <td class="p-3 relative overflow-hidden">
                          {d.FixedNo}
                        </td>
                        <td class=" ">
                          {d.FixedGroup ? d.FixedGroup.Name : "N/A"}
                        </td>
                        <td class=" ">
                          {d.EntitasBisni ? d.EntitasBisni.EBCode : "N/A"}
                        </td>
                        {/* <td class='overflow-x-auto'><Barcode format={'CODE128'} width={2} height={50} ref={AddToRefs} value={d.FixedNo}/></td> */}
                        <td className="overflow-x-auto hidden">
                          {barcodes(d.FixedNo, i)}
                        </td>
                        <td class=" ">
                          <Link to={`/dataaset/edit/${d.FixedIDNo}`}>
                            <button className="p-3">
                              <MdEdit
                                className="text-blue-700"
                                style={{ fontSize: "1.5rem" }}
                              />
                            </button>
                          </Link>
                          <button>
                            <FaTrashAlt
                              className="text-red-600"
                              style={{ fontSize: "1.4rem" }}
                            />
                          </button>
                          <ReactToPrint
                            trigger={() => (
                              <button className="p-3">
                                {" "}
                                <IoMdBarcode
                                  className="text-green-300"
                                  style={{ fontSize: "1.4rem" }}
                                />
                              </button>
                            )}
                            content={() => multiRef.current[i]}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className="flex justify-end items-center py-4 px-2 fixed right-3 bottom-0">
          <button onClick={handlePrevPage}>Prev</button>
          <h2 className="p-5">{page}</h2>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </div>
      <PrintQRModal show={showModal} onClosed={() => setShowModal(!showModal)}/>
    </div>
  );
};

export default DataAsset;
