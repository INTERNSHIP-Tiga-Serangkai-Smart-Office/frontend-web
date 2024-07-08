import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";
import { getToken } from "../features/authSlice";

const DetailAsset = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [asset, setAsset] = useState([]);
  const { id } = useParams();
  const ref = useRef([]);

  const apiUrl = process.env.REACT_APP_API_URL;

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
    axios.get(`${apiUrl}/fixed/${id}`, getToken()).then((res) => {
      setAsset(res.data);
      console.log(res.data);
    });
    console.log(asset);
  }, [id]);

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  //tab layout
  const mainData = [
    {
      label: "Nama Asset",
      name: "FixedAssetName",
      value: asset?.FixedAssetName,
    },
    { label: "AIN", name: "FixedNo", value: asset?.FixedNo },
    { label: "Status", name: "Status", value: asset?.Status === 1 ? 'Active' : 'Inactive'  },
    { label: "Entity", name: "Entity", value: asset?.EntityRelations?.EntityName },
    { label: "Entitas Bisnis", name: "IDNoEB", value: asset?.EntitasBisni?.EBCode },
    { label: "Group", name: "IDNoGR", value: asset?.FixedGroup?.Name },
    { label: "Tgl Registrasi", name: "RegDate", value: asset?.RegDate },
  ];

  const generalInfo = [
    { label: "Akun Asset", name: "AccNo", value: asset.AccNo },
    { label: "Akun Penyusutan", name: "AccDep", value: asset.AccDep },
    { label: "Tgl Akuisisi", name: "DateAq", value: asset.DateAq },
    { label: "Tgl Penyusutan", name: "DateDisp", value: asset.DateDisp },
    { label: "Cost Center", name: "CostCenterNo", value: asset.CostCenterNo },
    {
      label: "Profit Center",
      name: "ProfitCenterNo",
      value: asset.ProfitCenterNo,
    },
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
    {
      label: "Salvage Value Original",
      name: "SalVageValueORG",
      value: asset.SalVageValueORG,
    },
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

  const renderData = (label, fieldName, value) => {
    return (
      <div key={fieldName} className="flex justify-between my-3 mx-5">
        <p>{label} :</p>
        <h1>{value}</h1>
      </div>
    );
  };

  const barcodes = (value) => (
    <div className="p-5" ref={ref}>
      <QRCode
        value={value}
        size={250}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      />
      <h1 className="overflow-hidden">{value}</h1>
    </div>
  );

  return (
    <div className="bg-white border rounded-xl p-5 min-h-full">
        <div className="w-full items-baseline m-3">
          <button type='button' onClick={() => navigate('/dataaset', {replace: true})} className='mb-3'>&lt; Back</button>
          <h1 className="text-2xl montserrat-bold">Detail Asset</h1>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3">
          {mainData &&
            mainData.map((data) =>
              renderData(data.label, data.name, data.value)
            )}
        </div>

        <div className="w-full mt-3 border-2 p-4 rounded-xl">
          <div className="flex flex-row border-b-2 overflow-auto no-scrollbar">
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
              <div className="md:flex w-full">
                <div className="md:w-[30%] p-5">
                  <div className="justify-center mx-auto">
                    {asset.FixedNo && barcodes(asset.FixedNo)}
                  </div>
                </div>
                <div className="md:w-[70%] grid xl:grid-flow-col xl:grid-rows-12">
                  {generalInfo.map((data) =>
                    renderData(data.label, data.name, data.value)
                  )}
                </div>
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
              <div>
                {asset.FixedDocuments && asset.FixedDocuments.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <td>No</td>
                        <td>No Document</td>
                        <td>Expired Date</td>
                      </tr>
                    </thead>
                    <tbody>
                      {asset.FixedDocuments.map((data, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{data.NoDocument}</td>
                          <td>{data.ExpiredDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div>Document not found</div>
                )}
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
    </div>
  );
};

export default DetailAsset;
