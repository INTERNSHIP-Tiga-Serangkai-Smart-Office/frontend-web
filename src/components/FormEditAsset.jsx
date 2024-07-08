import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getToken } from "../features/authSlice";
import DatePicker from "react-datepicker";

const FormEditAsset = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [asset, setAsset] = useState([]);
  const { id } = useParams();

  const apiUrl = process.env.REACT_APP_API_URL;

  // const [docData, setDocData] = useState({ NoDocument: '', ExpiredDate: ''});
  // const [docsArray, setDocsArray] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/fixed/${id}`, getToken()).then((res) => {
      setAsset(res.data);
    });
    console.log(asset);
  }, [id]);

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/fixed/${id}`, {
        // fixedData: {
        Entity: asset.Entity,
        FixedAssetName: asset.FixedAssetName,
        AccNo: asset.AccNo,
        IDNoEB: asset.IDNoEB,
        IDNoGR: asset.IDNoGR,
        Qty: asset.Qty,
        SalVageValue: asset.SalVageValue,
        Status: asset.Status,
        // RegDate: currDate,
        // },
        // DateAq: asset.DateAq,
        // DateDisp: asset.DateDisp,
        CostCenterNo: asset.CostCenterNo,
        ProfitCenterNo: asset.ProfitCenterNo,
        LocId: asset.LocId,
        IDNoPO: asset.IDNoPO,
        IDNoPR: asset.IDNoPR,
        IDNoPC: asset.IDNoPC,
        LineNoBD: asset.LineNoBD,
        OrderNo: asset.OrderNo,
        InvNo: asset.InvNo,
        PickBill: asset.PickBill,
        SupplierId: asset.SupplierId,
        Pick: asset.Pick,
        PickGR: asset.PickGR,
        Unit: asset.Unit,
        SUnit: asset.SUnit,
        Cost: asset.Cost,
        SalVageValueORG: asset.SalVageValueORG,
        AccDep: asset.AccDep,
        Pict: asset.Pict,
        Remark: asset.Remark,
        IDNo: asset.IDNo,
        SQM: asset.SQM,
        Weight: asset.Weight,
        HolderName: asset.HolderName,
        Classification: asset.Classification,
        Brand: asset.Brand,
        ChassisNo: asset.ChassisNo,
        EngineNo: asset.EngineNo,
        RegNo: asset.RegNo,
        GuaranteeDate: asset.GuaranteeDate,
        EmpID: asset.EmpID,
        UserID: asset.UserID,
      }, getToken());
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
    { label: "Nama Asset", name: "FixedAssetName", value: asset.FixedAssetName },
    { label: "AIN", name: "FixedNo", value: asset.FixedNo },
    { label: "Status", name: "Status", value: asset.Status },
    { label: "Entity", name: "Entity", value: asset.Entity },
    { label: "Entitas Bisnis", name: "IDNoEB", value: asset.IDNoEB },
    { label: "Group", name: "IDNoGR", value: asset.IDNoGR },
    { label: "Tgl Registrasi", name: "RegDate", value: asset.RegDate },
  ];

  const generalInfo = [
    { label: "Akun Asset", name: "AccNo", value: asset.AccNo },
    { label: "Akun Penyusutan", name: "AccDep", value: asset.AccDep },
    { label: "Tgl Akuisisi", name: "DateAq", value: asset.DateAq },
    { label: "Tgl Penyusutan", name: "DateDisp", value: asset.DateDisp },
    { label: "Cost Center", name: "CostCenterNo", value: asset.CostCenterNo },
    { label: "Profit Center", name: "ProfitCenterNo", value: asset.ProfitCenterNo },
    { label: "Lokasi", name: "LocId", value: asset.LocId },
    { label: "PO", name: "IDNoPO", value: asset.IDNoPO },
    { label: "PR", name: "IDNoPR", value: asset.IDNoPR },
    { label: "PC", name: "IDNoPC", value: asset.IDNoPC },
    { label: "Line No BD", name: "LineNoBD", value: asset.LineNoBD },
    { label: "Order No", name: "OrderNo", value: asset.OrderNo },
    { label: "Inv No", name: "InvNo", value: asset.InvNo },
    { label: "Pick Bill", name: "PickBill", value: asset.PickBill },
    { label: "Supplier", name: "SupplierId", value: asset.SupplierId },
    { label: "Jumlah", name: "Qty", value: asset.Qty },
    { label: "Pick", name: "Pick", value: asset.Pick },
    { label: "Pick Group", name: "PickGR", value: asset.PickGR },
    { label: "Nomer Group", name: "GRNo", value: asset.GRNo },
    { label: "Unit", name: "Unit", value: asset.Unit },
    { label: "Cost", name: "Cost", value: asset.Cost },
    { label: "S Unit", name: "SUnit", value: asset.SUnit },
    { label: "Salvage Value", name: "SalVageValue", value: asset.SalVageValue },
    { label: "Salvage Value Original", name: "SalVageValueORG", value: asset.SalVageValueORG },
    { label: "Remark", name: "Remark", value: asset.Remark },
    // { name: "Sqm", value: asset.Sqm },
    { label: "Kelompok", name: "Classification", value: asset.Classification },
    { label: "Brand", name: "Brand", value: asset.Brand },
    { label: "Chassis No", name: "ChassisNo", value: asset.ChassisNo },
    { label: "Engine NO", name: "EngineNo", value: asset.EngineNo },
    { label: "Weight", name: "Weight", value: asset.Weight },
    { label: "No Registrasi", name: "RegNo", value: asset.RegNo },
    // { name: "RegDate", value: asset.RegDate },
    { label: "Tgl Garansi", name: "GuaranteeDate", value: asset.GuaranteeDate },
    { label: "Nama Pengguna", name: "HolderName", value: asset.HolderName },
    { label: "Emp Id", name: "EmpId", value: asset.EmpID },
    { label: "User Id", name: "UserId", value: asset.UserID },
  ];

  // const documentTab = [
  //   { name: "NoDocument", value: asset.FixedDocuments.NoDocument },
  //   { name: "ExpiredDate", value: asset.FixedDocuments.ExpiredDate },
  // ];

  const handleDateChange = (date, fieldName) => {
    setAsset({ ...asset, [fieldName]: date });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(e.target);
  };

  // const handleAddDocs = (e) => {
  //   e.preventDefault();
  //   setDocsArray((prevArray) => [...prevArray, docData]);
  //   setDocData({ NoDocument: '', ExpiredDate: '' }); // Reset form
  // };

  //tab layout
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  //fixed group dropdown
  const [entity, setEntity] = useState([]);
  const [group, setGroup] = useState([]);
  const [entitasBisnis, setEntitasBisnis] = useState([]);
  const [location, setLocation] = useState([]);
  const [unit, setUnit] = useState([]);
  useEffect(() => {
    const fetchEntity = async () => {
      const res = await axios.get(`${apiUrl}/entity`, getToken());
      setEntity(res.data);
    };
    const fetchGroup = async () => {
      const res = await axios.get(`${apiUrl}/fixed-group`, getToken());
      setGroup(res.data);
    };
    const fetchEB = async () => {
      const res = await axios.get(`${apiUrl}/entitas-bisnis`, getToken());
      setEntitasBisnis(res.data);
    };
    const fetchLoc = async () => {
      const res = await axios.get(`${apiUrl}/location`, getToken());
      setLocation(res.data);
    };
    const fetchUnit = async () => {
      const res = await axios.get(`${apiUrl}/unit`, getToken());
      setUnit(res.data);
    }
    fetchEntity();
    fetchEB();
    fetchGroup();
    fetchLoc();
    fetchUnit();
  }, [setEntity, setGroup, setEntitasBisnis, setLocation, setUnit]);

  const statusOption = [
    { Name: "Inactive", value: 0 },
    { Name: "Active", value: 1 },
  ];

  const renderForm = (label, fieldName, value) => {
    const inputType = typeof value === "number" ? "number" : "text";
    const readonlyFields = ['FixedNo', 'LocId', 'EmpId', 'InvNo'];

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
        case "LocId":
          return location;
        case "Unit":
          return unit;
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
          <label htmlFor={fieldName} className="label w-[45%]">
            {label}
          </label>
          <DatePicker
            selected={value}
            onChange={(date) => handleDateChange(date, fieldName)}
            className="w-[55%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
          />
        </div>
      );
    } else if (options) {
      return (
        <div key={fieldName} className="flex flex-row items-center mx-3">
          <label htmlFor={fieldName} className="label w-[45%]">
            {label}
          </label>
          <select
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={handleChange}
            className="w-[55%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
            disabled={readonlyFields.includes(fieldName)}
          >
            <option value="">Select {fieldName}</option>
            {options.map((option) => (
              <option
                key={option.LocID || option.IDNo || option.Entity || option.value}
                value={
                   option.Entity || option.IDNo || option.IDNo || option.value
                }
                style={{ display: "flex" }}
              >
                <span style={{ width: "50px" }}>
                  {option.LocID || option.Entity || option.IDNo || option.IDNo}
                </span>
                <span style={{ marginLeft: "20px" }}>
                  {option.EntityName || option.EBName || option.Name || option.LocationName || option.Unit}
                </span>
              </option>
            ))}
          </select>
        </div>
      );
    } else {
      return (
        <div key={fieldName} className="flex flex-row items-center mx-3">
          <label htmlFor={fieldName} className="label w-[45%]">
            {label}
          </label>
          <input
            type={inputType}
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={handleChange}
            className="w-[55%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
            disabled={readonlyFields.includes(fieldName)}
          />
        </div>
      );
    }
  };

  return (
    <div className="bg-white border rounded-xl p-5 min-h-full">
      <div className="w-full items-baseline m-3">
        <button type='button' onClick={() => navigate('/dataaset', {replace: true})} className='mb-3'>&lt; Back</button>
        <h1 className="text-2xl montserrat-bold">Edit Asset</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 xl:grid-cols-3">
          {mainData.map((data) =>
            // <div key={data.index} className="flex flex-row items-center mx-3">
            //   <label htmlFor={data.name} className="label w-[40%]">
            //     {data.name}
            //   </label>
            //   <input
            //     type={"text"}
            //     id={data.name}
            //     name={data.name}
            //     value={data.value}
            //     onChange={handleChange}
            //     className="w-[60%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
            //     disabled={!isEdit}
            //   />
            // </div>
            renderForm(data.label, data.name, data.value)
          )}
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
              Specification
            </div>
            <div
              className={
                toggleState === 3
                  ? "inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400"
                  : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
              onClick={() => toggleTab(3)}
            >
              Document
            </div>
            <div
              className={
                toggleState === 4
                  ? "inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400"
                  : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
              onClick={() => toggleTab(4)}
            >
              Maintenance
            </div>
            <div
              className={
                toggleState === 5
                  ? "inline-block px-4 pb-2 border-b-2 rounded-t-lg text-blue-400 border-blue-400"
                  : "inline-block px-4 pb-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
              onClick={() => toggleTab(5)}
            >
              History
            </div>
          </div>

          <div className="w-full h-full">
            <div
              className={
                toggleState === 1 ? "flex flex-col xl:flex-row" : "hidden"
              }
            >
              <div className="grid xl:grid-cols-3 w-full">
                {generalInfo.map((data, index) =>
                  // <div
                  //   key={index}
                  //   className="flex flex-row items-center mx-3"
                  // >
                  //   <label htmlFor={data.name} className="label w-[45%]">
                  //     {data.name}
                  //   </label>
                  //   <input
                  //     type={"text"}
                  //     id={data.name}
                  //     name={data.name}
                  //     value={data.value}
                  //     onChange={handleChange}
                  //     className="w-[55%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
                  //     disabled={!isEdit}
                  //   />
                  // </div>
                  renderForm(data.label, data.name, data.value)
                )}
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

            {/* document */}
            <div className={toggleState === 3 ? "" : "hidden"}>
              {/* {docsArray && (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>No Document</th>
                        <th>Expired Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docsArray.map((doc, i) => 
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{doc.NoDocument}</td>
                          <td>{doc.ExpiredDate}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )} */}
              <div className="m-3 p-3 border rounded-xl">
                <form >
                  <div className="flex w-full">
                    <div className="flex flex-row items-center justify-between w-[45%]">
                      <label htmlFor="">No Document</label>
                      <input
                        name="NoDocument"
                        // value={docData.NoDocument}
                        type="text"
                        onChange={handleChange}
                        className="input p-1 mx-3 w-[65%] shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
                      />
                    </div>
                    <div className="flex flex-row items-center justify-between w-[45%]">
                      <label htmlFor="">Expired Date</label>
                      <input
                        name="ExpiredDate"
                        // value={docData.ExpiredDate}
                        type="text"
                        onChange={handleChange}
                        className="input p-1 mx-3 w-[65%] shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
                      />
                    </div>
                    <button
                      type="submit"
                      className={`justify-end bold-16 bg-green-300 p-3 m-2 w-[10%] rounded-xl shadow-lg hover:bg-green-400`}
                    >
                      Add
                    </button>
                  </div>
                  {/* <div className="flex w-full justify-end ">
                </div> */}
                </form>
              </div>
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
            <div className={toggleState === 5 ? "" : "hidden"}>
              <h1>Content 5</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Architecto beatae quod perspiciatis excepturi fugit soluta
                natus, sunt odio impedit ipsum culpa deserunt nihil nobis
                tenetur veniam aperiam saepe distinctio exercitationem.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bold-20 bg-green-300 py-3 px-10 my-5 rounded-xl shadow-lg hover:bg-green-400`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditAsset;
