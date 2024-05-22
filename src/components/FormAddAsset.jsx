import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAddAsset = () => {
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const [asset, setAsset] = useState({
        FixedNo: '',
        FixedAssetName: '',
        Entity: '',
        AccNo: '',
        Currency: '',
        DateAq: '',
        DateDisp: '',
        CostCenterNo: '',
        ProfitCenterNo: '',
        LocId: '',
        IDNoEN:'',
        IDNoEB:'',
        IDNoPO: '',
        IDNoPR: '',
        IDNoGR: '',
        IDNoPC: '',
        LineNoBD: '',
        OrderNo: '',
        InvNo: '',
        PickBill: '',
        SupplierId: '',
        Qty: '',
        Pick: '',
        PickGR: '',
        Unit: '',
        SUnit: '',
        Cost: '',
        SalVageValue: '',
        SalVageValueORG: '',
        AccDep: '',
        Pict: '',
        Remark: '',
        Status: '',
        IDNo: '',
        SQM: '',
        Weight: '',
        HolderName: '',
        Classification: '',
        Brand: '',
        ChassisNo: '',
        EngineNo: '',
        RegNo: '',
        RegDate: '',
        GuaranteeDate: '',
        EmpID: '',
        UserID: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAsset((prev) => {
            return {...prev, [name]: value};
        });
        console.log(e.target);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/fixed', {asset});
            navigate('/dataaset')
        } catch (error) {
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

    const EntityOptions = [ // Replace with your actual entity options
        { value: 'entity1', label: 'Entity 1' },
        { value: 'entity2', label: 'Entity 2' },
        { value: 'entity3', label: 'Entity 3' },
    ];

    //fixed group dropdown
    const [group, setGroup] = useState([]);
    const [entitasBisnis, setEntitasBisnis] = useState([]);
    useEffect(() => {
        const fetchGroup = async () => {
            const res = await axios.get("http://localhost:5000/fixed-group");
            setGroup(res.data);
        };
        const fetchEB = async () => {
            const res = await axios.get("http://localhost:5000/entitas-bisnis");
            setEntitasBisnis(res.data);
        };
        fetchEB();
        fetchGroup();
    },[setGroup, setEntitasBisnis]);
    // const GroupOptions = [
    //     group.map(() => (
    //         {value: group.IDNo, label: group.Name}
    //     ))
    // ];
    // const EBOptions = [
    //     entitasBisnis.map((entitasBisnis) => (
    //         {value: entitasBisnis.IDNo, label: entitasBisnis.EBName}
    //     ))
    // ];

    // Form component logic for each field (replace with your actual components)
    const renderField = (fieldName) => {
        const inputType = typeof asset[fieldName] === 'number' ? 'number' : 'text';
        // const isOptional = fieldName.includes('AccNo');

        const options = (() => {
            switch (fieldName) {
                case 'Entity':
                  return EntityOptions;
                case 'IDNoGR':
                  return group;
                case 'IDNoEB':
                  return entitasBisnis;
                default:
                    return null;
              }
        })();

        if(options){
            return (
                <div key={fieldName} className='flex flex-col mx-3 w-[45%]'>
                  <label htmlFor={fieldName}>{fieldName}</label>
                  <select id={fieldName} name={fieldName} value={asset[fieldName]} onChange={handleChange} className='p-3 shadow border rounded my-2'>
                    <option value="">Select {fieldName}</option>
                    {options.map((option) => (
                      <option key={option.IDNo} value={option.IDNo || option.IDNo}>
                        {option.EBName || option.Name}
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
        <div className='flex place-content-center'>
            <form onSubmit={handleSubmit}>
                <h2 className='bold-32 my-5'>Asset Information</h2>
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