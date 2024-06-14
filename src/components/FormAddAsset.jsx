import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormAddAsset = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const currDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const currTime = new Date().toLocaleTimeString();
  const reg = currDate + " " + currTime;

  // var date;
  //     date = new Date();
  //     date = date.getUTCFullYear() + '-' +
  //         ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
  //         ('00' + date.getUTCDate()).slice(-2) + 'T' +
  //         ('00' + date.getUTCHours()).slice(-2) + ':' +
  //         ('00' + date.getUTCMinutes()).slice(-2) + ':' +
  //         ('00' + date.getUTCSeconds()).slice(-2);

  const [asset, setAsset] = useState({
    FixedAssetName: null,
    Entity: null,
    AccNo: null,
    DateAq: null,
    DateDisp: null,
    CostCenterNo: null,
    ProfitCenterNo: null,
    LocId: null,
    IDNoEB: null,
    IDNoPO: null,
    IDNoPR: null,
    IDNoGR: null,
    IDNoPC: null,
    LineNoBD: null,
    OrderNo: null,
    InvNo: null,
    PickBill: null,
    SupplierId: null,
    Qty: null,
    Pick: null,
    PickGR: null,
    Unit: null,
    SUnit: null,
    Cost: null,
    SalVageValue: null,
    SalVageValueORG: null,
    AccDep: null,
    Pict: null,
    Remark: null,
    Status: 0,
    IDNo: null,
    SQM: null,
    Weight: null,
    HolderName: null,
    Classification: null,
    Brand: null,
    ChassisNo: null,
    EngineNo: null,
    RegNo: null,
    RegDate: null,
    GuaranteeDate: null,
    EmpID: null,
    UserID: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(e.target);
  };

  const handleDateChange = (date, fieldName) => {
    setAsset({ ...asset, [fieldName]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/fixed", {
        FixedAssetName: asset.FixedAssetName,
        Entity: asset.Entity,
        AccNo: asset.AccNo,
        DateAq: asset.DateAq,
        DateDisp: asset.DateDisp,
        CostCenterNo: asset.CostCenterNo,
        ProfitCenterNo: asset.ProfitCenterNo,
        LocId: asset.LocId,
        IDNoEB: asset.IDNoEB,
        IDNoPO: asset.IDNoPO,
        IDNoPR: asset.IDNoPR,
        IDNoGR: asset.IDNoGR,
        IDNoPC: asset.IDNoPC,
        LineNoBD: asset.LineNoBD,
        OrderNo: asset.OrderNo,
        InvNo: asset.InvNo,
        PickBill: asset.PickBill,
        SupplierId: asset.SupplierId,
        Qty: asset.Qty,
        Pick: asset.Pick,
        PickGR: asset.PickGR,
        Unit: asset.Unit,
        SUnit: asset.SUnit,
        Cost: asset.Cost,
        SalVageValue: asset.SalVageValue,
        SalVageValueORG: asset.SalVageValueORG,
        AccDep: asset.AccDep,
        Pict: asset.Pict,
        Remark: asset.Remark,
        Status: asset.Status,
        IDNo: asset.IDNo,
        SQM: asset.SQM,
        Weight: asset.Weight,
        HolderName: asset.HolderName,
        Classification: asset.Classification,
        Brand: asset.Brand,
        ChassisNo: asset.ChassisNo,
        EngineNo: asset.EngineNo,
        RegNo: asset.RegNo,
        RegDate: currDate,
        GuaranteeDate: asset.GuaranteeDate,
        EmpID: asset.EmpID,
        UserID: asset.UserID,
      });
      navigate("/dataaset");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        console.log(msg);
        // console.log(date);
      }
    }
  };

  //tab layout
  const mainData = [
    { name: "FixedAssetName", value: asset.FixedAssetName},
    { name: "Status", value: asset.Status},
    { name: "Entity", value: asset.Entity},
    { name: "IDNoEB", value: asset.IDNoEB},
    { name: "IDNoGR", value: asset.IDNoGR},
    { name: "RegDate", value: asset.RegDate},
  ];

  const generalInfo = [
    { name: "AccNo", value: asset.AccNo },
    { name: "AccDep", value: asset.AccDep },
    { name: "DateAq", value: asset.DateAq },
    { name: "DateDisp", value: asset.DateDisp },
    { name: "CostCenterNo", value: asset.CostCenterNo },
    { name: "ProfitCenterNo", value: asset.ProfitCenterNo },
    { name: "LocId", value: asset.LocId },
    { name: "IDNoPO", value: asset.IDNoPO },
    { name: "IDNoPR", value: asset.IDNoPR },
    { name: "IDNoPC", value: asset.IDNoPC },
    { name: "LineNoBD", value: asset.LineNoBD },
    { name: "OrderNo", value: asset.OrderNo },
    { name: "InvNo", value: asset.InvNo },
    { name: "PickBill", value: asset.PickBill },
    { name: "SupplierId", value: asset.SupplierId },
    { name: "Qty", value: asset.Qty },
    { name: "Pick", value: asset.Pick },
    { name: "PickGR", value: asset.PickGR },
    { name: "GRNo", value: asset.GRNo },
    { name: "Unit", value: asset.Unit },
    { name: "Cost", value: asset.Cost },
    { name: "SUnit", value: asset.SUnit },
    { name: "SalVageValue", value: asset.SalVageValue },
    { name: "SalVageValueORG", value: asset.SalVageValueORG },
    { name: "Remark", value: asset.Remark },
    // { name: "Sqm", value: asset.Sqm },
    { name: "Classification", value: asset.Classification },
    { name: "Brand", value: asset.Brand },
    { name: "ChassisNo", value: asset.ChassisNo },
    { name: "EngineNo", value: asset.EngineNo },
    { name: "Weight", value: asset.Weight },
    { name: "RegNo", value: asset.RegNo },
    { name: "RegDate", value: asset.RegDate },
    { name: "GuaranteeDate", value: asset.GuaranteeDate },
    { name: "HolderName", value: asset.HolderName },
    { name: "EmpId", value: asset.EmpID },
    { name: "UserId", value: asset.UserID },
  ];


  //fixed group dropdown
  const [entity, setEntity] = useState([]);
  const [group, setGroup] = useState([]);
  const [entitasBisnis, setEntitasBisnis] = useState([]);
  useEffect(() => {
    const fetchEntity = async () => {
      const res = await axios.get("http://localhost:5000/entity");
      setEntity(res.data);
    };
    const fetchGroup = async () => {
      const res = await axios.get("http://localhost:5000/fixed-group");
      setGroup(res.data);
    };
    const fetchEB = async () => {
      const res = await axios.get("http://localhost:5000/entitas-bisnis");
      setEntitasBisnis(res.data);
    };
    fetchEntity();
    fetchEB();
    fetchGroup();
  }, [setEntity, setGroup, setEntitasBisnis]);

  const statusOption = [
    {Name:'Inactive', value: 0},
    {Name:'Active', value: 1},
  ]

  // Form component logic for each field (replace with your actual components)
  const renderField = (fieldName) => {
    const inputType = typeof asset[fieldName] === "number" ? "number" : "text";
    // const isOptional = fieldName.includes('AccNo');

    const options = (() => {
      switch (fieldName) {
        case "Entity":
          return entity;
        case "IDNoGR":
          return group;
        case "IDNoEB":
          return entitasBisnis;
        case "Status":
          return statusOption;
        default:
          return null;
      }
    })();

    if (
      fieldName === "DateAq" ||
      fieldName === "DateDisp" ||
      fieldName === "RegDate" ||
      fieldName === "GuaranteeDate" 
    ) {
      return (
        <div key={fieldName} className="flex flex-col mx-2 w-[22%]">
          <label htmlFor={fieldName}>{fieldName}</label>
          <DatePicker
            selected={asset[fieldName]}
            onChange={(date) => handleDateChange(date, fieldName)}
            className="p-3 shadow border rounded my-2"
          />
        </div>
      );
    } else if (options) {
      return (
        <div key={fieldName} className="flex flex-col mx-3 w-[45%]">
          <label htmlFor={fieldName}>{fieldName}</label>
          <select
            id={fieldName}
            name={fieldName}
            value={asset[fieldName]}
            onChange={handleChange}
            className="flex p-3 shadow border rounded my-2"
          >
            <option value="">Select {fieldName}</option>
            {options.map((option) => (
              <option
                key={option.IDNo || option.Entity || option.value}
                value={option.Entity || option.IDNo || option.IDNo || option.value}
                style={{ display: "flex" }}
              >
                <span style={{ width: "50px" }}>
                  {option.Entity || option.IDNo || option.IDNo}
                </span>
                <span style={{ marginLeft: "20px" }}>
                  {option.EntityName || option.EBName || option.Name}
                </span>
              </option>
            ))}
          </select>
        </div>
      );
    } else {
      return (
        <div key={fieldName} className="mx-3 w-[45%]">
          <label htmlFor={fieldName} className="label">
            {fieldName}
          </label>
          {/* {isOptional ? (
                    <input
                        type={inputType}
                        id={fieldName}
                        name={fieldName}
                        value={asset[fieldName]}
                        onChange={handleChange}
                        className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2 "
                    />
                    ) : ( */}
          <input
            type={inputType}
            id={fieldName}
            name={fieldName}
            // required
            value={asset[fieldName]}
            onChange={handleChange}
            className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
          />
          {/* )} */}
        </div>
      );
    }
  };

  const renderForm = (fieldName, value) => {
    const inputType = typeof value === "number" ? "number" : "text";

    const options = (() => {
      switch (fieldName) {
        case "Entity":
          return entity;
        case "IDNoGR":
          return group;
        case "IDNoEB":
          return entitasBisnis;
        case "Status":
          return statusOption;
        default:
          return null;
      }
    })();

    if (
      fieldName === "DateAq" ||
      fieldName === "DateDisp" ||
      fieldName === "RegDate" ||
      fieldName === "GuaranteeDate" 
    ) {
      return (
        <div key={fieldName} className="flex flex-row items-center mx-3">
          <label htmlFor={fieldName} className="label w-[40%]">{fieldName}</label>
          <DatePicker
            selected={value}
            onChange={(date) => handleDateChange(date, fieldName)}
            className="w-[60%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
          />
        </div>
      );
    } else if (options) {
      return (
        <div key={fieldName} className="flex flex-row items-center mx-3">
          <label htmlFor={fieldName} className="label w-[40%]">{fieldName}</label>
          <select
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={handleChange}
            className="w-[60%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
          >
            <option value="">Select {fieldName}</option>
            {options.map((option) => (
              <option
                key={option.IDNo || option.Entity || option.value}
                value={option.Entity || option.IDNo || option.IDNo || option.value}
                style={{ display: "flex" }}
              >
                <span style={{ width: "50px" }}>
                  {option.Entity || option.IDNo || option.IDNo}
                </span>
                <span style={{ marginLeft: "20px" }}>
                  {option.EntityName || option.EBName || option.Name}
                </span>
              </option>
            ))}
          </select>
        </div>
      );
    } else {
      return (
        <div key={fieldName} className="flex flex-row items-center mx-3">
          <label htmlFor={fieldName} className="label w-[40%]">
            {fieldName}
          </label>
          {/* {isOptional ? (
                    <input
                        type={inputType}
                        id={fieldName}
                        name={fieldName}
                        value={asset[fieldName]}
                        onChange={handleChange}
                        className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2 "
                    />
                    ) : ( */}
          <input
            type={inputType}
            id={fieldName}
            name={fieldName}
            // required
            value={value}
            onChange={handleChange}
            className="w-[60%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
          />
          {/* )} */}
        </div>
      );
    }
  }

  //tab layout
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="flex flex-col place-content-center">
      <h2 className="bold-32 my-5">Add New Asset</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {mainData.map((data) => (
              renderForm(data.name, data.value)
            ))}
        </div>

        <div className="w-full mt-3 border-2 p-4 rounded-xl">
          <div className="flex flex-row border-b-2">
            <div
              className={
                toggleState === 1
                  ? "inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400"
                  : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
              onClick={() => toggleTab(1)}
            >
              General Info
            </div>
            <div
              className={
                toggleState === 2
                  ? "inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400"
                  : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
              onClick={() => toggleTab(2)}
            >
              Maintenance
            </div>
            <div
              className={
                toggleState === 3
                  ? "inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400"
                  : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
              onClick={() => toggleTab(3)}
            >
              History
            </div>
            <div
              className={
                toggleState === 4
                  ? "inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400"
                  : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
              onClick={() => toggleTab(4)}
            >
              Dokumen
            </div>
          </div>

          <div className="w-full h-full">
            <div
              className={
                toggleState === 1 ? "flex flex-col xl:flex-row" : "hidden"
              }
            >
              <div className="grid xl:grid-cols-3">
                {generalInfo.map((data) => (
                  renderForm(data.name, data.value)
                ))}
              </div>
            </div>
            <div className={toggleState === 2 ? "" : "hidden"}>
              <h1>Content 2</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Architecto beatae quod perspiciatis excepturi fugit soluta
                natus, sunt odio impedit ipsum culpa deserunt nihil nobis
                tenetur veniam aperiam saepe distinctio exercitationem.
              </p>
            </div>
            <div className={toggleState === 3 ? "" : "hidden"}>
              <h1>Content 3</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Architecto beatae quod perspiciatis excepturi fugit soluta
                natus, sunt odio impedit ipsum culpa deserunt nihil nobis
                tenetur veniam aperiam saepe distinctio exercitationem.
              </p>
            </div>
            <div className={toggleState === 4 ? "" : "hidden"}>
              <h1>Content 4</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Architecto beatae quod perspiciatis excepturi fugit soluta
                natus, sunt odio impedit ipsum culpa deserunt nihil nobis
                tenetur veniam aperiam saepe distinctio exercitationem.
              </p>
            </div>
          </div>
        </div>

        {/* Add your logic for Submit Button and Dropdown Menus */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bold-20 bg-green-300 p-3 w-[30%] m-10 rounded-xl shadow-lg hover:bg-green-400"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddAsset;
