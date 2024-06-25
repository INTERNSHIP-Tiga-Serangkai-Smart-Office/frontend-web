import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormEditAsset = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [asset, setAsset] = useState([]);
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  // const [docData, setDocData] = useState({ NoDocument: '', ExpiredDate: ''});
  // const [docsArray, setDocsArray] = useState([]);

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

  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/fixed/${id}`, {
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
    { name: "FixedAssetName", value: asset.FixedAssetName },
    { name: "FixedNo", value: asset.FixedNo },
    { name: "Status", value: asset.Status },
    { name: "Entity", value: asset.Entity },
    { name: "IDNoEB", value: asset.IDNoEB },
    { name: "IDNoGR", value: asset.IDNoGR },
    { name: "RegDate", value: asset.RegDate },
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
    // { name: "RegDate", value: asset.RegDate },
    { name: "GuaranteeDate", value: asset.GuaranteeDate },
    { name: "HolderName", value: asset.HolderName },
    { name: "EmpId", value: asset.EmpID },
    { name: "UserId", value: asset.UserID },
  ];

  // const documentTab = [
  //   { name: "NoDocument", value: asset.FixedDocuments.NoDocument },
  //   { name: "ExpiredDate", value: asset.FixedDocuments.ExpiredDate },
  // ];

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

  const renderForm = (fieldName, value) => {
    const inputType = typeof value === "number" ? "number" : "text";

    return (
      <div key={fieldName} className="flex flex-row items-center mx-3">
        <label htmlFor={fieldName} className="label w-[45%]">
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
          className="w-[55%] input p-1 shadow appearance-none border rounded focus:outline-none focus:shadow-outline my-2"
          disabled={!isEdit}
        />
        {/* )} */}
      </div>
    );
  };

  return (
    <div className="flex w-full h-full flex-col">
      <div className="w-full flex items-baseline justify-between m-3">
        <h1 className="text-2xl montserrat-bold">Detail Asset</h1>
        <div>
          <button
            className="mx-2 p-3 bg-green-300 rounded-lg"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? "Readonly" : "Edit"}
          </button>
        </div>
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
            renderForm(data.name, data.value)
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
                  renderForm(data.name, data.value)
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
            className={`bold-20 bg-green-300 p-3 w-[30%] m-10 rounded-xl shadow-lg hover:bg-green-400 ${
              isEdit ? "" : "hidden"
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditAsset;
