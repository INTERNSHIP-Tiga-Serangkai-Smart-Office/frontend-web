import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormAddAsset = () => {
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const [asset, setAsset] = useState({
        FixedNo: null,
        FixedAssetName: null,
        Entity: null,
        AccNo: null,
        Currency: null,
        DateAq: null,
        DateDisp: null,
        CostCenterNo: null,
        ProfitCenterNo: null,
        LocId: null,
        IDNoEN: null,
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
        Status: null,
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
        const {name, value} = e.target;
        setAsset((prev) => {
            return {...prev, [name]: value};
        });
        console.log(e.target);
    };

    const handleDateChange = (date, fieldName) => {
        setAsset({...asset, [fieldName]: date});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/fixed', {
                FixedNo: asset.FixedNo,
                FixedAssetName: asset.FixedAssetName,
                Entity: asset.Entity,
                AccNo: asset.AccNo,
                Currency: asset.Currency,
                DateAq: asset.DateAq,
                DateDisp: asset.DateDisp,
                CostCenterNo: asset.CostCenterNo,
                ProfitCenterNo: asset.ProfitCenterNo,
                LocId: asset.LocId,
                IDNoEN: asset.IDNoEN,
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
                RegDate: asset.RegDate,
                GuaranteeDate: asset.GuaranteeDate,
                EmpID: asset.EmpID,
                UserID: asset.UserID,
            });
            navigate('/dataaset');
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
                console.log(msg);
            }
        }
    }

    //fixed group dropdown
    const [entity, setEntity] = useState([]);
    const [group, setGroup] = useState([]);
    const [entitasBisnis, setEntitasBisnis] = useState([]);
    useEffect(() => {
        const fetchEntity = async () => {
            const res = await axios.get("http://localhost:5000/entity");
            setEntity(res.data);
        }
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
    },[setEntity, setGroup, setEntitasBisnis]);

    // Form component logic for each field (replace with your actual components)
    const renderField = (fieldName) => {
        const inputType = typeof asset[fieldName] === 'number' ? 'number' : 'text';
        // const isOptional = fieldName.includes('AccNo');

        const options = (() => {
            switch (fieldName) {
                case 'Entity':
                  return entity;
                case 'IDNoGR':
                  return group;
                case 'IDNoEB':
                  return entitasBisnis;
                default:
                    return null;
              }
        })();
        
        if(fieldName === 'DateAq' || fieldName === 'DateDisp' || fieldName === 'RegDate' || fieldName ==='GuaranteeDate'){
            return (
                <div key={fieldName} className='flex flex-col mx-2 w-[22%]'>
                    <label htmlFor={fieldName}>{fieldName}</label>
                    <DatePicker
                        selected={asset[fieldName]}
                        onChange={(date) => handleDateChange(date, fieldName)}
                        className='p-3 shadow border rounded my-2'
                    />
                </div>
            );
        }else if(options){
            return (
                <div key={fieldName} className='flex flex-col mx-3 w-[45%]'>
                  <label htmlFor={fieldName}>{fieldName}</label>
                  <select id={fieldName} name={fieldName} value={asset[fieldName]} onChange={handleChange} className='flex p-3 shadow border rounded my-2'>
                    <option value="">Select {fieldName}</option>
                    {options.map((option) => (
                      <option key={option.IDNo || option.Entity} value={option.Entity || option.IDNo || option.IDNo} style={{display: 'flex'}}>
                        <span style={{width: '50px'}}>
                            {option.Entity || option.IDNo || option.IDNo}
                        </span>
                        <span style={{marginLeft: '20px'}}>
                            {option.EntityName || option.EBName || option.Name}
                        </span>
                      </option>
                    ))}
                  </select>
                </div>
              );
        }else{
            return (
                <div key={fieldName} className='mx-3 w-[45%]'>
                    <label htmlFor={fieldName} className='label' >{fieldName}</label>
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

    return (
        <div className='flex flex-col place-content-center'>
            <h2 className='bold-32 my-5'>Asset Information</h2>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-wrap justify-center'>
                    {Object.keys(asset)
                        .filter((field) => field !== 'UserID') // Exclude UserID
                        .map(renderField)}
                </div>
                

                {/* Add your logic for Submit Button and Dropdown Menus */}
                <div className='flex justify-end'>
                    <button type="submit" className="bold-20 bg-green-300 p-3 w-[30%] m-10 rounded-xl shadow-lg hover:bg-green-400">Add</button>
                </div>
                
            </form>
        </div>
    )
}

export default FormAddAsset