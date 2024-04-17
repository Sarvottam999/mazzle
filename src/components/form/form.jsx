import React, { useState } from 'react';
import axios from 'axios';
import { rg_crtn } from './util';
import { data } from '../../data/data';
import DisplayResults from '../display_detail';



export const Form = () => {

    const [inputValues, setInputValues] = useState({
        TgtGR: '',
        MpGR: '',
        TgtHt: '',
        MpHt: '',
        Temp: '',
        OT: ''
      });
      const [result, setResult] = useState(null);
      const [error, setError] = useState(null);

    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
      };
    
      const handleSubmit = async (e) => {

        e.preventDefault();
        setError(null)

        // console.log(inputValues)
        try {
          var result  = rg_crtn(
            inputValues.TgtGR, 
            inputValues.MpGR, 
            inputValues.TgtHt, 
            inputValues.MpHt, 
            inputValues.Temp, 
            inputValues.OT,
            data

          )
          console.log(result)
          setResult(result);
        } catch (error) {
          console.log( error);
          setError(error.message)
        }
      };
  return (
    <div className='container mt-5'>

<form onSubmit={handleSubmit} >
  <div className="row mb-4">
    <div className="col">
      <div data-mdb-input-init className="form-outline">
        <input type="text" id="TgtGR"  name="TgtGR" className="form-control   " value={inputValues.TgtGR} onChange={handleChange} />
        <label className="form-label" htmlFor="TgtGR">TgtGR</label>
      </div>
    </div>
    <div className="col">
      <div data-mdb-input-init className="form-outline">
        <input type="text" id="TgtHt" name='TgtHt' className="form-control" value={inputValues.TgtHt} onChange={handleChange}  />
        <label className="form-label" htmlFor="TgtHt">Tgt Ht</label>
      </div>
    </div>
  </div>

  {/* -------------------- */}
  <div className="row mb-4">
    <div className="col">
      <div data-mdb-input-init className="form-outline">
        <input type="text" id="MpGR" name="MpGR" className="form-control"  value={inputValues.MpGR} onChange={handleChange} />
        <label className="form-label" htmlFor="MpGR">MP GR</label>
      </div>
    </div>
    <div className="col">
      <div data-mdb-input-init className="form-outline">
        <input type="text" name="MpHt"  id="MpHt" className="form-control"  value={inputValues.MpHt} onChange={handleChange}/>
        <label className="form-label" htmlFor="MpHt">MP Ht</label>
      </div>
    </div>
  </div>

    {/* -------------------- */}
    <div className="row mb-4">
    <div className="col">
      <div data-mdb-input-init className="form-outline">
        <input type="text" name="Temp" id="Temp" className="form-control"  value={inputValues.Temp} onChange={handleChange}/>
        <label className="form-label" htmlFor= "Temp">Temp in degree Celsius</label>
      </div>
    </div>
    <div className="col">
      <div data-mdb-input-init className="form-outline">
        <input type="text" name="OT" id="OT" className="form-control" value={inputValues.OT} onChange={handleChange} />
        <label className="form-label" htmlFor="OT">OT</label>
      </div>
    </div>
  </div>   
 

  

 

  <button   type="submit" className="btn btn-primary custom-btn">Submit</button>
</form>

{error ? (
        <div className='error-container'>
          <p>Error: {error}</p>
        </div>
      ) :

result ? (
  <div>
  <h2>Final Disha: {result.final_disha}</h2>
  <h2>initail range: {result.initial_range}</h2>

  <h3>List of Calculations:</h3>
  <ul>
   
<DisplayResults results={result} /> 
  </ul>
</div>
      ) : null} 

      {/* {result && (
        <div>
          <p>Range: {result.trg_range}</p>
          <p>Charge: {result.final_charge}</p>
          <p>Disha: {result.final_disha}</p>

        </div>
      )} */}


    </div>
  )
}


 

