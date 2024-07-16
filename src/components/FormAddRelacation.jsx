import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../features/authSlice";
import DropdownComp from "./DropdownComp";

const FormAddRelacation = () => {
  const {id} = useParams();
  const [asset, setAsset] = useState([]);
  const [location, setLocation] = useState([]);
  const [header, setHeader] = useState([]);
  const [item, setItem] = useState({
    FixedIDNo: "",
    NewLocation: "",
    NewEmployeeResponsible: "",
  });
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const getAsset = async (search) => {
    try {
      const response = await axios.get(
        `${apiUrl}/fixed?search=${search}`,
        getToken()
      );
      setAsset(response.data.data);
      console.log(asset);
    } catch (error) {
      console.log("Failed to fetch fixed assets");
    }
  };

  const getLocation = async () => {
    const res = await axios.get(`${apiUrl}/location`, getToken());
    setLocation(res.data);
  };

  useEffect(() => {
    getAsset(search);
    getLocation();
    console.log(asset);
    if(id){
      console.log(id)
      setItem((prevItems) => ({
        ...prevItems,
        FixedIDNo: id,
      }));
    }
  }, [search, id]);

  useEffect(() => {
      console.log(item.FixedIDNo)
  }, [item.FixedIDNo]);

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeader((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(e.target);
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(e.target);
  };

  const handleAddItem = () => {
    setItems((prevArray) => [...prevArray, item]);
    setItem({ FixedIDNo: "", NewLocation: "", NewEmployeeResponsible: "" });
    console.log(items);
  };
  const handleDelDocs = (index) => {
    setItems((prevArray) => prevArray.filter((_, i) => i !== index));
  };

  //dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [isLocOpen, setIsLocOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectOption = (name, value) => {
    setItem((prevItems) => ({
      ...prevItems,
      [name]: value,
    }));
    setSearch("");
    setIsOpen(false);
  };

  const handleSelectLoc = (option) => {
    setItem({ FixedIDNo: option });
    setSearch("");
    setIsOpen(false);
  };

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(
        `${apiUrl}/asset-relocation`,
        {
          TransDesc: header.TransDesc,
          IDNoEB: header.IDNoEB,
          items: items,
        },
        getToken()
      );
      console.log("Data submitted successfully:", request.data);
      navigate("/relocation");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const headerFields = [
    { label: "Description", name: "TransDesc", value: header.TransDesc },
    { label: "Entitas Bisnis", name: "IDNoEB", value: header.IDNoEB },
  ];

  const itemFields = [
    { label: "ID Asset", name: "FixedIDNo", value: item.FixedIDNo },
    { label: "New Location", name: "NewLocation", value: item.NewLocation },
    {
      label: "New Employee",
      name: "NewEmployeeResponsible",
      value: item.NewEmployeeResponsible,
    },
  ];

  const renderForm = (fieldName, value, onChange) => {
    const inputType = typeof value === "number" ? "number" : "text";

    return (
      <div key={fieldName} className="flex flex-row items-center my-3">
        <label htmlFor={fieldName} className="label w-[50%]">
          {fieldName}
        </label>
        <input
          type={inputType}
          id={fieldName}
          name={fieldName}
          value={value}
          onChange={onChange}
          className="w-[50%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
        />
      </div>
    );
  };

  const displayDataName = ( data, selectedOption, displayKey, valueKey) => {
    const selectedValue = data.filter(item => item[valueKey] === selectedOption).map(item => item[displayKey]);
    return selectedValue;
  }

  return (
    <div className="bg-white border rounded-xl p-5 min-h-full">
      <div className=" justify-between items-center">
        <button
          type="button"
          onClick={() => navigate("/relocation", { replace: true })}
          className=""
        >
          &lt; Back
        </button>
        <h2 className="bold-20 mb-3">Relocate</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {/* <h1>Header</h1> */}
        <div className="px-3">
          {headerFields &&
            headerFields.map((data) =>
              renderForm(data.name, data.value, handleHeaderChange)
            )}
        </div>
        <div className="p-3 border rounded-md my-3">
          {items.length > 0 && (
            <table className="w-full h-full text-sm text-center  text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <td>No</td>
                  <td className="px-6 py-3">Asset ID</td>
                  <td>New Location</td>
                  <td>New Employee</td>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items.map((data, index) => (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td>{index + 1}</td>
                      <td className="px-6 py-3">{displayDataName(asset, data.FixedIDNo, "FixedNo", "FixedIDNo")}</td>
                      <td>{displayDataName(location, data.NewLocation, "LocationName", "LocID")}</td>
                      <td>{data.NewEmployeeResponsible}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          <div>
            <div className="px-3">
              <DropdownComp
                label="Select Item"
                name="FixedIDNo"
                options={asset}
                selectedOption={item.FixedIDNo}
                onOptionSelect={handleSelectOption}
                placeholder="Select Item"
                displayKey="FixedNo"
                valueKey="FixedIDNo"
                enableSearch={true}
              />
              <DropdownComp
                label="Select New Location"
                name="NewLocation"
                options={location}
                selectedOption={item.NewLocation}
                onOptionSelect={handleSelectOption}
                placeholder="Select Location"
                displayKey="LocationName"
                valueKey="LocID"
              />
              {renderForm("NewEmployeeResponsible", item.NewEmployeeResponsible, handleItemChange)}
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="p-3 bg-green-200 rounded-md"
            >
              Add item
            </button>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <button type="submit" className="bg-green-300 p-3 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddRelacation;
