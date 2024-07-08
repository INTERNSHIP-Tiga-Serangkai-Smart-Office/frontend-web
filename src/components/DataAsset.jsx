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
import AlertComp from "./AlertComp";
import { getToken } from "../features/authSlice";

const DataAsset = () => {
  const [fixeds, setFixed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(null);

  const ref = useRef([]);
  const multiRef = useRef([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getFixed(page, pageSize);
    console.log(fixeds);
  }, [page, pageSize]);

  const getFixed = async (page, pageSize) => {
    try {
      const response = await axios.get(
        `${apiUrl}/fixed?page=${page}&pageSize=${pageSize}`, getToken()
      );
      setFixed(response.data.data);
      console.log(fixeds);
    } catch (error) {
      setError("Failed to fetch fixed assets");
    }
  };

  const deleteFixed = async (FixedIDNo) => {
    await axios.delete(`${apiUrl}/fixed/${FixedIDNo}`, getToken());
    getFixed(page, pageSize);
  };

  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const handlePrevPage = () => {
    setPage((prevState) => prevState - 1);
  };

  const barcodes = (value, index) => (
    <div className="p-5" ref={(el) => (multiRef.current[index] = el)}>
      <QRCode value={value} size={200} />
      <h1>{value}</h1>
    </div>
  );

  const handlePageSize = (e) => {
    const value = e.target.value;
    setPageSize(value);
    getFixed(page, pageSize);
  };

  const handleDelete = (fixedId) => {
    deleteFixed(fixedId);
    setShowAlert(null);
  };

  return (
    <div className="bg-white border rounded-xl p-5 min-h-full">
      <div className="w-full flex items-baseline justify-between">
        <h1 className="text-2xl montserrat-bold">Data Asset Page</h1>
        <div>
          <button
            className="mx-2 p-3 bg-blue-300 rounded-lg"
            type="button"
            onClick={() => navigate("/dataaset/printqr")}
          >
            Print Barcode
          </button>
          <button className="mx-2 p-3 bg-green-300 rounded-lg" type="button" onClick={() => navigate("/dataaset/add")}>
            Add New
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-row-reverse justify-between w-full m-3">
          <div className="w-[30%] mx-3">
            <form class="xl:w-full mx-auto">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-end">
            <p>Show</p>
            <select
              name=""
              id=""
              onChange={handlePageSize}
              className="mx-3 border rounded-md"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>
        <div className="w-full shadow-md sm:rounded-lg  mt-5">
          {isLoading && <p>Loading assets...</p>}
          {error && <p className="error-message">{error}</p>}
          {/* {!isLoading && !error  && <p>No assets found.</p>} */}
          {!isLoading && !error && fixeds.length > 0 && (
            <>
              <table class="flex-row  overflow-y-auto w-full text-sm text-center  text-gray-500 dark:text-gray-400  table-fixed">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">No</th>
                    <th>Entity</th>
                    <th>Acc No</th>
                    <th>AIN</th>
                    <th>Fixed Group</th>
                    <th>Entitas Bisnis</th>
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
                        <td class=" ">{d.EntityRelations.EntityName}</td>
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
                        <td className="overflow-x-auto hidden">
                          {barcodes(d.FixedNo, i)}
                        </td>
                        <td class=" ">
                          <Link to={`/dataaset/detail/${d.FixedIDNo}`}>
                            <button className="p-3">
                              <MdEdit
                                className="text-blue-300"
                                style={{ fontSize: "1.5rem" }}
                              />
                            </button>
                          </Link>
                          <Link to={`/dataaset/edit/${d.FixedIDNo}`}>
                            <button className="p-3">
                              <MdEdit
                                className="text-blue-700"
                                style={{ fontSize: "1.5rem" }}
                              />
                            </button>
                          </Link>
                          <button onClick={() => setShowAlert(d.FixedIDNo)}>
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
                          {showAlert === d.FixedIDNo && (
                            <AlertComp
                              show={true}
                              title={"Delete Data"}
                              message={`Are you sure to delete data ${d.FixedNo}?`}
                              onConfirm={() => handleDelete(d.FixedIDNo)}
                              onCancel={() => setShowAlert(null)}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div> 
        <div className="flex justify-end items-baseline px-2 pt-3">
          <button onClick={handlePrevPage}>Prev</button>
          <h2 className="px-5 ">{page}</h2>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default DataAsset;
