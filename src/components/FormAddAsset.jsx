import React, {useState} from 'react';
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

    // Form component logic for each field (replace with your actual components)
    const renderField = (fieldName) => {
        const inputType = typeof asset[fieldName] === 'number' ? 'number' : 'text';
        const isOptional = fieldName.includes('Pick') || fieldName.includes('SalVageValueORG') || fieldName.includes('AccDep') || fieldName.includes('SUnit') || fieldName.includes('SQM') || fieldName.includes('Weight') || fieldName.includes('HolderName') || fieldName.includes('Classification') || fieldName.includes('Brand') || fieldName.includes('ChassisNo') || fieldName.includes('EngineNo') || fieldName.includes('RegNo') || fieldName.includes('RegDate') || fieldName.includes('GuaranteeDate') || fieldName.includes('EmpID');

        if(fieldName === "Entity"){
            return (
                <div key={fieldName}>
                  <label htmlFor={fieldName}>{fieldName}</label>
                  <select id={fieldName} name={fieldName} value={asset[fieldName]} onChange={handleChange}>
                    <option value="">Select Entity</option>
                    {EntityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
        }else{
            return (
                <div key={fieldName}>
                    <label htmlFor={fieldName} className='label' >{fieldName}</label>
                    {isOptional ? (
                    <input
                        type={inputType}
                        id={fieldName}
                        name={fieldName}
                        value={asset[fieldName]}
                        onChange={handleChange}
                        className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
                    />
                    ) : (
                    <input
                        type={inputType}
                        id={fieldName}
                        name={fieldName}
                        required
                        value={asset[fieldName]}
                        onChange={handleChange}
                        className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2"
                    />
                    )}
                </div>
            );
        }
        
    };

    return (
        <div>
            {/* <h1 className='title'>FormAddAsset</h1>
            <form>
                <div className='field'>
                    <label className='label'>Asset Name</label>
                    <div className='control'>
                        <input type="text" className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2" placeholder='Asset Name' />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Asset Number</label>
                    <div className='control'>
                        <input type="text" className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2" placeholder='Asset Number' />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Asset Name</label>
                    <div className='control'>
                        <input type="text" className="input p-3 shadow appearance-none border rounded w-full focus:outline-none focus:shadow-outline my-2" placeholder='Name' />
                    </div>
                </div>
            </form> */}

        <form onSubmit={handleSubmit}>
            <h2>Asset Information</h2>
            {Object.keys(asset)
                .filter((field) => field !== 'UserID') // Exclude UserID
                .map(renderField)}

            {/* Add your logic for Submit Button and Dropdown Menus */}
            <button type="submit" className="bold-32 bg-green-300 p-3 w-full rounded-xl shadow-lg hover:bg-green-400">Submit</button>
        </form>
        </div>
    )
}

export default FormAddAsset