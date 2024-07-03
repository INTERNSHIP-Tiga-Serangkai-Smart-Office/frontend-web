import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import { getToken } from "../features/authSlice";

const PrintQRCodeAsset = () => {
  const [fixeds, setFixed] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const ref = useRef([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  const getAsset = async(page, pageSize, search) => {
    try {
      const response = await axios.get(
        `${apiUrl}/fixed?page=${page}&pageSize=${pageSize}&search=${search}`, getToken()
      );
      setFixed(response.data.data);
      console.log(fixeds);
    } catch (error) {
      console.log("Failed to fetch fixed assets");
    }
  }

  useEffect(() => {
    getAsset(page, pageSize, search);
    console.log(fixeds);
  }, [page, pageSize, search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch(value);
    console.log(e.target);
  };

  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i.FixedNo !== item.FixedNo));
    }
    console.log(selectedItems);
  };

  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
  };

  const handlePrevPage = () => {
    setPage((prevState) => prevState - 1);
  };

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    onAfterPrint: () => setSelectedItems([]),
  });
  return (
    <div>
      <div className=" w-full flex ">
        <div className="w-full m-3 p-3 bg-white rounded-xl">
          <div className="flex justify-between items-center">
            <h2 className="bold-20 mb-3">Print QR Code</h2>
          </div>
          <div>
            <form class="xl:w-full mx-auto mb-5 ">
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
                  placeholder="Search name or AIN..."
                  onChange={handleChange}
                  value={search}
                />
              </div>
            </form>
          </div>
          <table class="flex-row w-full overflow-y-auto text-sm text-center  text-gray-500 dark:text-gray-400  table-fixed mb-3">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th>No</th>
                <th>Name</th>
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
                    <td class=" ">{d.FixedAssetName}</td>
                    <td class="p-3 relative overflow-hidden">{d.FixedNo}</td>
                    <td class=" ">
                      {d.FixedGroup ? d.FixedGroup.Name : "N/A"}
                    </td>
                    <td class=" ">
                      {d.EntitasBisni ? d.EntitasBisni.EBCode : "N/A"}
                    </td>
                    <td class=" ">
                      <input
                        type="checkbox"
                        checked={selectedItems.some(
                          (i) => i.FixedNo === d.FixedNo
                        )}
                        onChange={(event) => handleCheckboxChange(event, d)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="">
            <div ref={ref} className="flex flex-row flex-wrap">
              {selectedItems.map((data, index) => (
                <div
                  key={index}
                  className="barcode-item p-3 m-3 flex border rounded-md w-85"
                  // ref={(el) => (multiRef.current[index] = el)}
                >
                  <QRCode value={data.FixedNo} size={130} />
                  <div className="p-3">
                    <h1 className="items-center">{data.FixedNo}</h1>
                    <h1 className="items-center">{data.FixedAssetName}</h1>
                    <h1 className="items-center">{data.EntityRelations.EntityName}</h1>
                    <h1 className="items-center">{data.FixedGroup.Name}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center py-4 px-2 right-3 ">
              <button onClick={handlePrevPage}>Prev</button>
              <h2 className="p-5">{page}</h2>
              <button onClick={handleNextPage}>Next</button>
            </div>
            <button
              className="flex items-center h-10 px-3 bg-green-300 rounded-md"
              onClick={handlePrint}
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintQRCodeAsset;
