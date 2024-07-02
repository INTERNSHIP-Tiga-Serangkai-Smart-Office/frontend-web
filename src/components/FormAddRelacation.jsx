import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormAddRelacation = () => {
  const [header, setHeader] = useState([]);
  const [item, setItem] = useState({
    FixedIDNo: "",
    NewLocation: "",
    NewEmployeeResponsible: "",
  });
  const [items, setItems] = useState([]);

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(
        "http://localhost:5000/asset-relocation",
        {
          TransDesc: header.TransDesc,
          IDNoEB: header.IDNoEB,
          items: items,
        }
      );
      console.log("Data submitted successfully:", request.data);
      navigate("/relocation");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        console.log(msg);
        // console.log(date);
      }
    }
  };

  const headerFields = [
    { label: "Description", name: "TransDesc", value: header.TransDesc },
    { label: "Entitas Bisnis", name: "IDNoEB", value: header.IDNoEB },
  ];

  const itemFields = [
    { label: "ID Asset", name: "FixedIDNo", value: header.FixedIDNo },
    { label: "New Location", name: "NewLocation", value: header.NewLocation },
    {
      label: "New Employee",
      name: "NewEmployeeResponsible",
      value: header.NewEmployeeResponsible,
    },
  ];

  const renderForm = (fieldName, value) => {
    const inputType = typeof value === "number" ? "number" : "text";

    return (
      <div key={fieldName} className="flex flex-row items-center mx-3">
        <label htmlFor={fieldName} className="label w-[45%]">
          {fieldName}
        </label>
        <input
          type={inputType}
          id={fieldName}
          name={fieldName}
          value={value}
          onChange={handleHeaderChange}
          className="w-[55%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
        />
      </div>
    );
  };
  const renderItem = (fieldName, value) => {
    const inputType = typeof value === "number" ? "number" : "text";

    return (
      <div key={fieldName} className="flex flex-row items-center mx-3">
        <label htmlFor={fieldName} className="label w-[45%]">
          {fieldName}
        </label>
        <input
          type={inputType}
          id={fieldName}
          name={fieldName}
          value={value}
          onChange={handleItemChange}
          className="w-[55%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
        />
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Header</h1>
        <div>
          {headerFields &&
            headerFields.map((data) => renderForm(data.name, data.value))}
        </div>
        <div className="p-3 border rounded-md">
          {items.length > 0 && (
            <table>
              <thead>
                <tr>
                  <td>No</td>
                  <td>Asset ID</td>
                  <td>New Location</td>
                  <td>New Employee</td>
                </tr>
              </thead>
              <tbody>
                {items &&
                  items.map((data, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{data.FixedIDNo}</td>
                      <td>{data.NewLocation}</td>
                      <td>{data.NewEmployeeResponsible}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
          <div>
            <div>
              {itemFields &&
                itemFields.map((data) => renderItem(data.name, data.value))}
            </div>
            <button type="button" onClick={handleAddItem}>
              add item
            </button>
          </div>
        </div>
        <button type="submit" className="bg-green-300 p-3 rounded-md">
          submit
        </button>
      </form>
    </div>
  );
};

export default FormAddRelacation;
