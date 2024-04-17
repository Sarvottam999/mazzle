import React from 'react';

function DisplayResults({ results }) {
  return (
    <div>
      <h2>Final Disha: {results.final_disha}</h2>
      <h3>List of Calculations:</h3>
      <ul>
        {results.list_of_calculation.map((calculation, index) => (
          <li key={index}>
            <strong>Range:</strong> {calculation.range}, <strong>Charge:</strong> {calculation.charge}
            <ul>
              {calculation.sub_charge_cal_list.map((subCharge, subIndex) => (
                <li key={subIndex}>
                  <strong>Sub Charge:</strong> {subCharge.sub_charge}, <strong>Uchai:</strong> {subCharge.uchai}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayResults;
