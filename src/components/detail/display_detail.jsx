import React from 'react';
import { return_string_to_num_charge } from '../form/util';
import "./detail.css"
function DisplayResults({ results }) {

  const calculationItems = [];
for (let i = 0; i < 1; i++) {
  const calculation = results.list_of_calculation[i];
  const subChargeItems = [];
  for (let j = 0; j < calculation.sub_charge_cal_list.length; j++) {
    const subCharge = calculation.sub_charge_cal_list[j];
    subChargeItems.push(
      <li  className='list-item' key={j}>
        <span className="list-text">
        <span className='result-text-2'>in charge:{return_string_to_num_charge(subCharge.sub_charge)}</span> 

        </span>
        <span className="list-text">

        
         <span className='result-text-2'>Uchai: {subCharge.uchai}</span>
        </span>

      </li>
    );
  }
  calculationItems.push(
    <li key={i}>
      {/* <strong>Range:</strong> {calculation.range}, <strong>Charge:</strong> {calculation.charge} */}
      <ul>
        {subChargeItems}
      </ul>
    </li>
  );
}
  return (
    
    <div>
      {/* <h2>Final Disha: {results.final_disha}</h2>
      <h3>List of Calculations:</h3> */}
      <ul>
        {
             calculationItems

        // results.list_of_calculation.map((calculation, index) => (
        //   <li key={index}>
        //     <strong>Range:</strong> {calculation.range}, <strong>Charge:</strong> {calculation.charge}
        //     <ul>
        //       {calculation.sub_charge_cal_list.map((subCharge, subIndex) => (
        //         <li key={subIndex}>
        //           <strong>Sub Charge:</strong> {subCharge.sub_charge}, <strong>Uchai:</strong> {subCharge.uchai}
        //         </li>
        //       ))}
        //     </ul>
        //   </li>
      //   )
      // )
        
        
        }
      </ul>
    </div>
  );
}

export default DisplayResults;
