import React, { useState } from 'react';
import axios from 'axios';
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
          var result  = rg_crtn(inputValues.TgtGR, inputValues.MpGR, inputValues.TgtHt, inputValues.MpHt, inputValues.Temp, inputValues.OT

          )
          // const response = await axios.post('http://localhost:3000/rg-crtn', inputValues);
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

result && (
        <div className='result-container'>
          <p>Range: {result.trg_range}</p>
          <p>Charge: {result.final_charge}</p>
          <p>Disha: {result.final_disha}</p>
          <p>uchai: {result.uchai_agl_of_projtn}</p>


        </div>
      )} 

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


function rg_crtn  (TgtGR, MpGR, TgtHt, MpHt, Temp, OT )   {
  // try {
  //   console.log(req.body);
  //   var { TgtGR, MpGR, TgtHt, MpHt, Temp, OT } = req.body;

    var current_chg = "";
    var current_mv = "";
    var final_charge_string = "";
    var final_charge = "";

    var final_disha = "";
    var ht_crtn;

    console.log(`finding TgtGR, MpGR completed ....  : ${TgtGR  } -- ${MpGR}`);


    var differences = find_cordnt(TgtGR, MpGR); 
    printError(differences, "differences!")
    console.log(`finding differences completed ....  : ${differences}`);


    var trg_range = find_tr_range(differences[0], differences[1]);
    printError(trg_range, "trg_range!")
    console.log(`finding trg_range completed ....  : ${trg_range}`);
  

    var find_charge = findChargeInRange(data, trg_range);
    console.log(`finding find_charge completed ....  : ${find_charge}`);
    printError(find_charge, "charge!")



    const numbers = find_charge.match(/\d+/g); // Match all digits in the string
    console.log(numbers);
    console.log(`finding numbers completed ....${numbers}`);

    if (numbers.length == 0) {
      throw new Error("no found numbers!");


      
    }



    current_chg = numbers[0].toString();
    current_mv = numbers[1].toString();

    final_disha = getDisha(differences[0], differences[1]);
    printError(final_disha, "final_disha!")

    var diff_in_h = TgtHt - MpHt;
    console.log("diff_in_h");

    console.log(diff_in_h);

    if ( diff_in_h > 0) {
      // console.log("tg_up_from_mp");
      ht_crtn = getValueForHT_crtn(
        find_charge,
        data,
        "tg_up_from_mp",
        trg_range,
        diff_in_h
      );
      console.log("ht_crtn");

      console.log(ht_crtn);

      printError(ht_crtn, "ht_crtn!");
      trg_range = trg_range + ht_crtn;
    } else if (diff_in_h > 0) {
      // console.log("tg_down_from_mp")
      ht_crtn = getValueForHT_crtn(
        find_charge,
        data,
        "tg_down_from_mp",
        trg_range,
        diff_in_h
      );
      printError(ht_crtn, "ht_crtn!");

      trg_range = trg_range - ht_crtn;
    }
    else{

    }

    //  ALT correction
    var ALT_crtn_blocks = Math.floor(MpHt / 300);

    console.log(Math.floor(1134 / 300))

    var gwt_ValueForALT_crtn = getValueForALT_crtn(
      trg_range,
      data,
      find_charge
    );
    printError(gwt_ValueForALT_crtn, "gwt_ValueForALT_crtn!");


    var ALT_crtn_value = ALT_crtn_blocks * gwt_ValueForALT_crtn;
    // console.log( "ALT correction" +  (ALT_crtn_blocks * gwt_ValueForALT_crtn))

    // trg_range  =   trg_range -(ALT_crtn * gwt_ValueForALT_crtn);

    // temp correction
    var temp_sub15 = Temp - 15;
    // console.log(temp_sub15)

    var temp_block = Math.floor(temp_sub15 / 5);

    var gwt_ValueForTemp_crtn = getValueForTem_crtn(
      trg_range,
      data,
      find_charge
    );
    var temp_crtn_value = gwt_ValueForTemp_crtn * temp_block;

    // console.log("temp correction" + temp_crtn_value)

    // combined effect

    var conbine_effect = roundToNearestTen(temp_crtn_value + ALT_crtn_value);
    // console.log(conbine_effect)
    trg_range = trg_range - conbine_effect;
    //

    final_charge_string = findChargeInRange(data, trg_range);
    const numbs = final_charge_string.match(/\d+/g); // Match all digits in the string
    console.log("-----------------------")
    
    console.log(final_charge_string)
    // console.log(data)

    final_charge = numbs[0].toString();

    var uchai_agl_of_projtn = get_Angle_of_projection(trg_range, data, final_charge_string);

    return {
      trg_range,
      final_charge, 
      final_disha,
      uchai_agl_of_projtn


    }

  //   res.status(201).json({
  //     // differences,
  //     trg_range,
  //     //   find_charge,
  //     //   current_chg,
  //     //   current_mv,
  //     //   diff_in_h,
  //     //   ht_crtn,
  //     //   ALT_crtn_value,

  //     //   temp_crtn_value,
  //     final_charge,
  //     final_disha,
  //   });
  // } catch (error) {
  //   console.log(error);

  //   return {}
  // //   res.status(500).json({ error });

  //   // next(error);
  // }
};


function find_tr_range(a, b) {
  // find target range
  var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  // console.log(Math.pow(a, 2));
  // console.log(Math.pow(b, 2));
  // console.log(Math.pow(a, 2) + Math.pow(b, 2));
  // console.log(Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)));



  console.log(`finding root ....  : ${c}`);

  var answer = Math.round(c) * 100;
  console.log(`finding root answer ....  : ${answer}`);

  return answer;
}

function find_cordnt(str1, str2) {


  var left1 = parseInt(str1.substring(0, 3));
  var left2 = parseInt(str2.substring(0, 3));
  var right1 = parseInt(str1.substring(str1.length - 3));
  var right2 = parseInt(str2.substring(str2.length - 3));
  console.log(`finding differences started ....  : `);
  console.log(`finding differences left1 ....  : ${left1}`);
  console.log(`finding differences left2 ....  : ${left2}`);
  console.log(`finding differences right1 ....  : ${right1}`);
  console.log(`finding differences right2 ....  : ${right2}`);


  var leftDiff = left1 - left2;
  var rightDiff = right1 - right2;
  console.log(`finding differences right2 ....  : ${leftDiff}`);
  console.log(`finding differences rightDiff ....  : ${rightDiff}`);
  // console.log(`finding differences completed ....  : ${differences}`);


  return [leftDiff, rightDiff];
}

function findChargeInRange(data, range) {
  // find first most charge from range

  var final_key = "";
  for (const key in data) {
    if (final_key.length > 0) {
      break;
    }
    if (data.hasOwnProperty(key)) {
      const chargeData = data[key];

      const Crtn_to_rg_alt_temp = chargeData["Crtn_to_rg_alt_temp"];
      // console.log(key);
      for (let i = 0; i < Crtn_to_rg_alt_temp.length; i++) {
        if (range <= Crtn_to_rg_alt_temp[i][0] ) {
          final_key = key;
        }
      }
    }
  }
  // console.log(chrg);
  return final_key;
}

// function isPositive(number) {
//   return number > 0;
// }

function getValueForHT_crtn(key, data, position_key, trg_range, diff_in_h) {
  //CORRECTION TO RANGE FOR DIFFERENCE IN HEIGHT OF TARGET FROM MORTAR//

  let value = null;
  var ht_crtn;

  try {
    var htSec = data[key];
    //    console.log(htSec);

    value = htSec["Crtn_to_rg_ht"][position_key];

    //    value.fore
    for (let i = 1; i < value.length; i++) {
      const rowData = value[i];
      // console.log(value);
      if (rowData[0] >= trg_range) {
        const heightIndex = Math.floor(diff_in_h / 100);
        //    console.log(heightIndex);

        if (heightIndex < rowData.length) {
          ht_crtn = rowData[heightIndex];
          //    console.log(ht_crtn);

          return ht_crtn;
        }
      }
    }

    //     for (const k in data) {
    //         console.log(k)

    //          const chargeData = data[k];
    //         console.log("-##########################chargeData.Crtn_to_rg_ht.tg_up_from_mp")

    //         console.log(chargeData.Crtn_to_rg_ht[position_key])

    //          if (chargeData.hasOwnProperty(key) ) {
    //             value = chargeData.key

    //          }

    //   };
  } catch (error) {
    console.log(error);
  }

  return value;
}



function printError(strng, descption) {
  if (strng == null || strng.length == 0 ) {
  // console.log(`cannot find ${descption}`);
  throw new Error(`cannot find ${descption}`);

      
  }

}
// 
// 
// 
// 
// 

function getValueForALT_crtn(trg_range, data, charge) {
  let value = null;

  try {
    // for (const k in data) {
    // console.log(k)

    const chargeData = data[charge];

    chargeData.Crtn_to_rg_alt_temp.forEach((element) => {
      if (element[0] <= trg_range) {
        value = element[6];
        //    console.log(value)
      }
    });

    //   };
  } catch (error) {
    console.log(error);
  }

  return value;
}

function getValueForTem_crtn(trg_range, data, charge) {
  let value = null;

  try {
    // for (const k in data) {
    // console.log(k)

    const chargeData = data[charge];

    chargeData.Crtn_to_rg_alt_temp.forEach((element) => {
      if (element[0] <= trg_range) {
        value = element[7];
        //    console.log(value)
      }
    });

    //   };
  } catch (error) {
    console.log(error);
  }

  return value;
}

function get_Angle_of_projection(trg_range, data, charge) {

  let value = null;

  try {
    // for (const k in data) {

    const chargeData = data[charge];
    console.log("--------------chargeData")
    console.log(data)
    console.log(charge)

    console.log(chargeData)


    chargeData.Crtn_to_rg_alt_temp.forEach((element) => {
      if (element[0] <= trg_range) {
        value = element[3];
        //    console.log(value)
      }
    });

    //   };
  } catch (error) {
    console.log(error);
  }

  return value;
  
}

function roundToNearestTen(num) {
  return Math.ceil(num / 10) * 10;
}

function getDisha(x, y) {
  let absX = Math.abs(x);
  let absY = Math.abs(y);

  // Determine the quadrant
  let quadrant;
  if (x >= 0 && y >= 0) {
    quadrant = 1;
  } else if (x < 0 && y >= 0) {
    quadrant = 2;
  } else if (x < 0 && y < 0) {
    quadrant = 3;
  } else {
    quadrant = 4;
  }
  console.log(quadrant);
  // console.log(`quadrant -> ${quadrant}`);

  var arc_length = Math.atan2(absX, absY);
  // console.log(`arc_length -> ${arc_length}`);

  var pi = Math.PI;
  // console.log(`pi -> ${pi}`);

  var cal = arc_length * (360 / (2 * pi));
  // console.log(`cal -> ${cal}`);

  let angleFromYAxis;
  switch (quadrant) {
    case 1:
      angleFromYAxis = cal;

      break;
    case 2:
      angleFromYAxis = 360 - cal;

      break;
    case 3:
      angleFromYAxis = 180 + cal;

      break;
    case 4:
      angleFromYAxis = 180 - cal;

      break;
  }
  console.log(`angleFromYAxis -> ${angleFromYAxis}`);

  return angleFromYAxis;
}



const   data = {
  //   --------------------- charge 0
  
    "ch_0_mv_70": {
      "Crtn_to_rg_alt_temp": [
        [100, 109, 1490, "83 5",  14.0, 260, 0, 0],
        [150, 164, 1432, "80 35", 13.8, 250, 0, 0],
        [200, 219, 1373, "77 15", 13.6, 240, 1, 0],
        [250, 273, 1310, "73 4",  13.4, 230, 1, 1],
        [300, 328, 1237, "69 35", 13.0, 215, 1, 1],
        [350, 383, 1152, "64 5",  12.6, 195, 1, 1],
        [400, 437, 1050, "59 05", 11.9, 175, 1, 1],
        [450, 492, 923,  "51 55", 11.0, 150, 1, 1],
        [471, 515, 800,  "45 0",  10.0, 125, 1, 1],
      ],
      "Crtn_to_rg_ht": {
          "tg_up_from_mp" :[
              [0,   100,200,300,400,500,600,700,800,900,1000],
              [100, 0,  50, 0,  0,  0,  0,  0,  0,  0,  0   ],
              [200, 50, 50, 0,  0,  0,  0,  0,  0,  0,  0   ],
              [300, 50,  0, 0,  0,  0,  0,  0,  0,  0,  0   ],
              [400, 0,   0, 0,  0,  0,  0,  0,  0,  0,  0   ],
  
  
          ],
          "tg_down_from_mp" :[
              [0,   100,200,300,400,500,600,700,800,900,1000],
              [100, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0   ],
              [200, 0,  50, 50,  50,  50,   100,  100,  100,  100,  100   ],
              [300, 50, 50, 50,  50,  100,  100,  100,  100,  100,  100   ],
              [400, 50,   50, 100,  100,  100,  150,  150,  150,  150,  150   ],
          ],
  
      },
    },
  
  //   --------------------- charge 1
  "ch_1_mv_111": {
      "Crtn_to_rg_alt_temp": [
      [200, 219, 1510, "84 55", 21.8, 590, 1, 0],
      [250, 273, 1486, "83 35", 21.8, 585, 1, 0],
      [300, 328, 1462, "82 15", 21.7, 580, 1, 0],
      [350, 383, 1439, "80 55", 21.6, 575, 1, 0],
      [400, 437, 1415, "79 35", 21.5, 570, 1, 0],
      [450, 492, 1390, "78 10", 21.4, 565, 2, 1],
      [500, 547, 1363, "76 40", 21.2, 555, 2, 1],
      [550, 601, 1336, "75 10", 21.0, 545, 2, 1],
      [600, 656, 1308, "73 35", 20.8, 535, 2, 1],
      [650, 711, 1278, "71 55", 20.6, 525, 2, 1],
      [700, 766, 1247, "70 10", 20.4, 510, 3, 2],
      [750, 820, 1216, "68 25", 20.2, 495, 3, 2],
      [800, 875, 1182, "66 30", 20.0, 480, 3, 2],
      [850, 930, 1145, "64 25", 19.7, 465, 3, 2],
      [900, 984, 1105, "62 10", 19.3, 445, 3, 2],
      [950, 1039,1059, "59 35", 18.8, 425, 4, 3],
      [1000,1094,1003, "56 25", 17.8, 400, 4, 3],
      [1050,1148,926, "52 05", 16.6, 360, 5, 3],
      [1093,1195,800, "45 00", 15.4, 290, 5, 3],
  ],
      "Crtn_to_rg_ht": {
          "tg_up_from_mp" :[
              [0,   100,200,300,400,500,600,700,800,900,1000],
              [200, 0,   50, 50,   50,   100,  0,  0,  0,  0,  0   ],
              [300, 0,   50, 50,   100,  150,  0,  0,  0,  0,  0,  ],
              [400, 50,  50, 100,  150,  200,  0,  0,  0,  0,  0   ],
              [500, 50,  50, 100,  200,  0,    0,  0,  0,  0,  0   ],
              [600, 50,  100,150,  250,  0,    0,  0,  0,  0,  0   ],
              [700, 50,  100,200,  0,    0,    0,  0,  0,  0,  0   ],
              [800, 50,  100,0,    0,    0,    0,  0,  0,  0,  0   ],
              [900, 50,  0,  0,    0,    0,    0,  0,  0,  0,  0   ],
              [1000, 0,  0,  0,    0,    0,    0,  0,  0,  0,  0   ],
          ],
          "tg_down_from_mp" :[
              [0,   100, 200,300, 400, 500, 600, 700, 800, 900, 1000],
              [700,  0,  0,  0,   0,   0,   0,   0,   0,   0,   0],
              [800,  0,  50, 50,  100, 100, 100, 0,   0,   0,   0],
              [900,  0,  50, 50,  100, 100, 100, 100, 150, 150, 150],
              [1000, 0,  50, 50,  100, 100, 100, 100, 150, 150, 150],
              [1100, 50, 50, 50,  100, 100, 150, 100, 150, 150, 200],
              [1200, 50, 50, 50,  100, 100, 150, 150, 150, 150, 200],
              [1300, 50, 50, 100, 100, 100, 150, 150, 150, 150, 200],
              [1400, 50, 50, 100, 100, 150, 150, 150, 150, 200, 250],
              [1500, 50, 50, 100, 150, 150, 150, 150, 200, 200, 250],
              [1600, 50, 50, 100, 150, 150, 200, 200, 200, 250, 250],
              [1700, 50, 100, 100, 150, 200, 200, 200, 250, 250, 300]
  
  ]
  
      },
    },
  
    //   --------------------- charge 2
  "ch_2_mv_111": {
      "Crtn_to_rg_alt_temp": [
      [700, 766, 1393, "78 20", 27.4, 925, 5, 3],
      [750, 820, 1376, "77 25", 27.3, 915, 5, 3],
      [800, 875, 1360, "76 30", 27.2, 905, 5, 3],
      [850, 930, 1344, "75 35", 27.1, 895, 6, 4],
      [900, 984, 1327, "74 40", 27.0, 885, 6, 4],
      [950, 1039, 1310, "73 40", 26.9, 875, 6, 4],
      [1000, 1094, 1292, "72 40", 26.8, 865, 7, 5],
      [1050, 1148, 1273, "71 35", 26.6, 855, 7, 5],
      [1100, 1203, 1253, "70 30", 26.4, 845, 7, 5],
      [1150, 1258, 1234, "69 25", 26.2, 835, 8, 5],
      [1200, 1312, 1213, "68 15", 26.0, 825, 8, 5],
      [1250, 1367, 1192, "67 05", 25.8, 810, 8, 5],
      [1300, 1422, 1170, "65 50", 25.5, 795, 8, 6],
      [1350, 1476, 1148, "64 35", 25.2, 780, 8, 6],
      [1400, 1531, 1123, "63 10", 24.9, 760, 8, 6],
      [1450, 1586, 1098, "61 45", 24.6, 740, 9, 6],
      [1500, 1640, 1071, "60 15", 24.2, 720, 9, 7],
      [1550, 1695, 1041, "58 35", 23.8, 695, 9, 7],
      [1600, 1750, 1007, "56 40", 23.4, 670, 9, 7],
      [1650, 1804, 967, "54 25", 22.9, 640, 10, 7],
      [1700, 1859, 920, "51 45", 22.1, 605, 10, 7],
      [1750, 1914, 956, "48 10", 20.9, 540, 10, 7],
      [1773, 1939, 800, "45 00", 20.0, 490, 10, 7]
  ],
      "Crtn_to_rg_ht": {
          "tg_up_from_mp" :[ 
              [0,    100,200, 300, 400, 500, 600, 700, 800,900,1000],
              [700,  0,  50,  50,  100, 150, 200, 250, 400,0,  0],
              [800,  0,  50,  50,  100, 150, 200, 350, 0,  0,  0],
              [900,  50, 50,  100, 100, 200, 250, 500, 0,  0,  0],
              [1000, 50, 50,  100, 150, 200, 350, 0,   0,  0,  0],
              [1100, 50, 50,  100, 200, 250, 400, 0,   0,  0,  0],
              [1200, 50, 100, 150, 200, 350, 0,   0,   0,  0,  0],
              [1300, 50, 100, 150, 250, 0,   0,   0,   0,  0,  0],
              [1400, 50, 100, 150, 300, 0,   0,   0,   0,  0,  0],
              [1500, 50, 100, 0,   0,   0,   0,   0,   0,  0,  0],
              [1600, 50, 0,   0,   0,   0,   0,   0,   0,  0,  0],
              [1700, 50, 0,  0,   0,   0,   0,   0,   0,  0,  0]
          ],
          "tg_down_from_mp" :[ 
              [0,    100,200, 300, 400, 500, 600, 700, 800,900,1000],
              [700,  0,  0,   0,   0,   0,   0,   0,   0,   0,   0],
              [800,  0,  50,  50,  100, 100, 100, 0,   0,   0,   0],
              [900,  0,  50,  50,  100, 100, 100, 100, 150, 150, 150],
              [1000, 0,  50,  50,  100, 100, 100, 100, 150, 150, 150],
              [1100, 50, 50,  50,  100, 100, 150, 100, 150, 150, 200],
              [1200, 50, 50,  50,  100, 100, 150, 150, 150, 150, 200],
              [1300, 50, 50,  100, 100, 100, 150, 150, 150, 150, 200],
              [1400, 50, 50,  100, 100, 150, 150, 150, 150, 200, 250],
              [1500, 50, 50,  100, 150, 150, 150, 150, 200, 200, 250],
              [1600, 50, 50,  100, 150, 150, 200, 200, 200, 250, 250],
              [1700, 50,  100, 100, 150, 200, 200, 200, 250, 250, 300]
  
          ]
  
      },
    },
  
     //   --------------------- charge 3
  "ch_3_mv_181": {
      "Crtn_to_rg_alt_temp": [
      [1100, 1203, 1372, "77 10", 32.8, 1320, 9, 5],
      [1150, 1258, 1360, "76 30", 32.8, 1315, 9, 5],
      [1200, 1312, 1348, "75 50", 32.7, 1310, 10, 5],
      [1250, 1367, 1336, "75 10", 32.6, 1305, 10, 5],
      [1300, 1422, 1324, "74 30", 32.5, 1300, 10, 5],
      [1350, 1476, 1312, "73 50", 32.4, 1290, 10, 6],
      [1400, 1531, 1299, "73 05", 32.3, 1280, 10, 6],
      [1450, 1586, 1286, "72 20", 32.2, 1270, 10, 6],
      [1500, 1640, 1273, "71 35", 32.1, 1260, 11, 6],
      [1550, 1695, 1259, "70 50", 32.0, 1250, 11, 6],
      [1600, 1750, 1246, "70 05", 31.9, 1240, 11, 7],
      [1650, 1804, 1232, "69 20", 31.7, 1225, 12, 7],
      [1700, 1859, 1219, "68 35", 31.5, 1210, 12, 7],
      [1750, 1914, 1204, "67 45", 31.3, 1195, 13, 7],
      [1800, 1968, 1190, "66 55", 31.1, 1180, 13, 7],
      [1850, 2023, 1175, "66 05", 30.9, 1165, 14, 8],
      [1900, 2078, 1158, "65 10", 30.7, 1145, 14, 8],
      [1950, 2133, 1142, "64 15", 30.5, 1125, 14, 8],
      [2000, 2187, 1124, "63 15", 30.3, 1105, 15, 8],
      [2050, 2242, 1105, "62 10", 30.0, 1085, 15, 8],
      [2100, 2297, 1086, "61 05", 29.7, 1065, 15, 8],
      [2150, 2351, 1065, "59 55", 29.3, 1045, 16, 9],
      [2200, 2406, 1043, "58 40", 28.9, 1020, 16, 9],
      [2250, 2461, 1019, "57 20", 28.4, 990, 16,  9],
      [2300, 2515, 994, "55 55",  27.8, 955, 17,  9],
      [2350, 2570, 967, "54 25",  27.2, 915, 17,  9],
      [2400, 2625, 935, "52 35",  26.4, 875, 17,  10],
      [2450, 2679, 893, "50 15",  25.5, 830, 18,  10],
      [2500, 2734, 825, "46 25",  24.4, 750, 18,  10],
      [2550, 2750, 800, "45 00",  24.0, 710, 18,  10]
  ],
      "Crtn_to_rg_ht": {
          "tg_up_from_mp" :[ 
              [0,    100,200, 300, 400, 500, 600, 700, 800, 900, 1000],
              [1100, 0,  50,  50,  100, 150, 150, 200, 250, 300, 400],
              [1200, 0,  50,  100, 100, 150, 200, 200, 250, 350, 450],
              [1300, 50, 50,  100, 100, 150, 200, 250, 300, 400, 550],
              [1400, 50, 50,  100, 150, 150, 200, 250, 350, 450, 0],
              [1500, 50, 50,  100, 150, 200, 250, 300, 400, 600, 0],
              [1600, 50, 50,  100, 150, 200, 250, 350, 450, 0,   0],
              [1700, 50, 50,  100, 150, 200, 300, 400, 0,   0,   0],
              [1800, 50, 100, 150, 200, 250, 350, 0,   0,   0,   0],
              [1900, 50, 100, 150, 200, 300, 450, 0,   0,   0,   0],
              [2000, 50, 100, 150, 250, 350, 0,   0,   0,   0,   0],
              [2100, 50, 100, 150, 300, 0,   0,   0,   0,   0,   0],
              [2200, 50, 100, 200, 0,   0,   0,   0,   0,   0,   0],
              [2300, 50, 150, 0,   0,   0,   0,   0,   0,   0,   0],
              [2400, 0,  0,   0,   0,   0,   0,   0,   0,   0,   0],
              [2500, 0,  0,   0,   0,   0,   0,   0,   0,   0,   0]
          ],
          "tg_down_from_mp" :[ 
              [0,    100,200, 300, 400, 500, 600, 700, 800, 900, 1000],
              [1100, 0,  0,   0,   0,   0,   0,   0,   0,   0,   0],
              [1200, 0,  50,  50,  50,  100, 100, 100, 100, 100, 0],
              [1300, 0,  50,  50,  50,  100, 100, 100, 150, 150, 150],
              [1400, 50, 50,  50,  100, 100, 100, 150, 150, 150, 150],
              [1500, 50, 50,  50,  100, 100, 150, 150, 150, 150, 200],
              [1600, 50, 50,  50,  100, 100, 150, 150, 150, 200, 200],
              [1700, 50, 50,  100, 100, 150, 150, 150, 200, 200, 200],
              [1800, 50, 50,  100, 100, 150, 150, 200, 200, 200, 250],
              [1900, 50, 50,  100, 100, 150, 150, 200, 200, 250, 250],
              [2000, 50, 50,  100, 150, 150, 200, 200, 250, 250, 250],
              [2100, 50, 100, 100, 150, 150, 200, 200, 250, 250, 300],
              [2200, 50, 100, 100, 150, 200, 200, 250, 250, 300, 300],
              [2300, 50, 100, 150, 150, 200, 250, 250, 250, 300, 300],
              [2400, 50, 100, 150, 200, 200, 250, 250, 300, 300, 350],
              [2500, 50, 100, 150, 200, 250, 250, 300, 300, 350, 350]
  
  
          ]
  
      },
    },
  
       //   --------------------- charge 4
  "ch_4_mv_210": {
      "Crtn_to_rg_alt_temp": [
       [1600, 1750, 1321, "74 20", 36.3, 1620, 14, 8],
      [1650, 1804, 1312, "73 50", 36.2, 1615, 15, 8],
      [1700, 1859, 1302, "73 15", 36.2, 1605, 15, 8],
      [1750, 1914, 1292, "72 40", 36.1, 1595, 16, 8],
      [1800, 1968, 1281, "72 05", 36.0, 1585, 16, 9],
      [1850, 2023, 1271, "71 30", 35.9, 1575, 17, 9],
      [1900, 2078, 1260, "70 55", 35.8, 1565, 17, 9],
      [1950, 2133, 1250, "70 20", 35.7, 1555, 18, 9],
      [2000, 2187, 1240, "69 45", 35.6, 1545, 18, 10],
      [2050, 2242, 1230, "69 10", 35.5, 1535, 19, 10],
      [2100, 2297, 1218, "68 30", 35.4, 1520, 19, 10],
      [2150, 2351, 1206, "67 50", 35.3, 1505, 20, 10],
      [2200, 2406, 1194, "67 10", 35.1, 1495, 20, 11],
      [2250, 2461, 1182, "66 30", 34.9, 1480, 21, 11],
      [2300, 2515, 1170, "65 50", 34.7, 1465, 21, 11],
      [2350, 2570, 1157, "65 05", 34.5, 1455, 22, 11],
      [2400, 2625, 1144, "64 20", 34.3, 1440, 22, 12],
      [2450, 2679, 1130, "63 35", 34.1, 1425, 23, 12],
      [2500, 2734, 1117, "62 50", 33.9, 1410, 23, 12],
      [2550, 2789, 1102, "62 00", 33.7, 1390, 23, 12],
      [2600, 2843, 1087, "61 10", 33.5, 1370, 24, 13],
      [2650, 2898, 1071, "60 15", 33.2, 1350, 24, 13],
      [2700, 2953, 1055, "59 20", 32.9, 1325, 24, 13],
      [2750, 3008, 1037, "58 20", 32.6, 1300, 25, 13],
      [2800, 3062, 1018, "57 15", 32.2, 1270, 25, 14],
      [2850, 3117, 998, "56 10", 31.8, 1235, 25, 14],
      [2900, 3172, 978, "55 00", 31.3, 1200, 26, 14],
      [2950, 3226, 954, "53 40", 30.8, 1160, 26, 14],
      [3000, 3281, 925, "52 05", 30.1, 1115, 27, 15],
      [3050, 3336, 890, "50 05", 29.2, 1060, 27, 15],
      [3100, 3390, 836, "47 00", 27.8, 975, 27, 15],
      [3120, 3412, 800, "45 00", 27.2, 915, 27, 15]
  ],
      "Crtn_to_rg_ht": {
          "tg_up_from_mp" :[ 
              [0,    100,200, 300, 400, 500, 600, 700, 800, 900, 1000],
              [1600, 0,  50,  50,  100, 150, 150, 200, 250, 300, 350],
              [1700, 50, 50,  50,  100, 150, 200, 200, 250, 300, 400],
              [1800, 50, 50,  100, 100, 150, 200, 250, 300, 350, 450],
              [1900, 50, 50,  100, 150, 150, 200, 250, 300, 400, 500],
              [2000, 50, 50,  100, 150, 150, 200, 300, 300, 450, 550],
              [2100, 50, 50,  100, 150, 200, 250, 300, 350, 500, 600],
              [2200, 50, 100, 100, 150, 200, 250, 350, 400, 550, 0  ],
              [2300, 50, 100, 100, 150, 200, 300, 350, 500, 0,   0  ],
              [2400, 50, 100, 150, 200, 250, 300, 400, 0,   0,   0  ],
              [2500, 50, 100, 150, 200, 250, 350, 0,   0,   0,   0  ],
              [2600, 50, 100, 150, 200, 300, 0,   0,   0,   0,   0  ],
              [2700, 50, 100, 150, 250, 0,   0,   0,   0,   0,   0  ],
              [2800, 50, 100, 200, 0,   0,   0,   0,   0,   0,   0  ],
              [2900, 50, 150, 0,   0,   0,   0,   0,   0,   0,   0  ],
              [3000, 50, 0,   0,   0,   0,   0,   0,   0,   0,   0  ],
              [3100, 50, 0,   0,   0,   0,   0,   0,   0,   0,   0  ]
          ],
          "tg_down_from_mp" :[ 
              [0,    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
              [1600, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
              [1700, 0,   50,  50,  100, 100, 100, 0,   0,   0,   0],
              [1800, 50,  50,  50,  100, 100, 150, 150, 150, 150, 200],
              [1900, 50,  50,  50,  100, 100, 150, 150, 150, 200, 200],
              [2000, 50,  50,  100, 100, 100, 150, 150, 200, 200, 200],
              [2100, 50,  50,  100, 100, 150, 150, 150, 200, 200, 200],
              [2200, 50,  50,  100, 100, 150, 150, 200, 200, 200, 250],
              [2300, 50,  50,  100, 150, 150, 150, 200, 200, 250, 250],
              [2400, 50,  50,  100, 150, 150, 200, 200, 200, 250, 250],
              [2500, 50,  50,  100, 150, 150, 200, 200, 250, 250, 300],
              [2600, 50,  100, 100, 150, 200, 200, 250, 250, 250, 300],
              [2700, 50,  100, 100, 150, 200, 200, 250, 250, 300, 300],
              [2800, 50,  100, 100, 150, 200, 200, 250, 250, 300, 350],
              [2900, 50,  100, 150, 150, 200, 250, 250, 300, 300, 350],
              [3000, 50,  100, 150, 200, 200, 250, 300, 300, 350, 350],
              [3100, 50,  100, 150, 200, 200, 250, 300, 300, 350, 350]
  
          ]
  
      },
    },
  
      //   --------------------- charge 5
  "ch_5_mv_236": {
      "Crtn_to_rg_alt_temp": [
          [2000, 2187, 1301, "73  10", 39.5, 1925, 22, 11],
      [2050, 2242, 1292, "72  40", 39.4, 1915, 23, 11],
      [2100, 2297, 1283, "72  10", 39.3, 1905, 23, 12],
      [2150, 2351, 1274, "71  40", 39.2, 1895, 24, 12],
      [2200, 2406, 1265, "71  10", 39.1, 1885, 24, 12],
      [2250, 2461, 1256, "70  40", 39.0, 1875, 24, 13],
      [2300, 2515, 1247, "70  10", 38.9, 1865, 25, 13],
      [2350, 2570, 1238, "69  40", 38.8, 1855, 25, 13],
      [2400, 2625, 1228, "69  05", 38.7, 1845, 25, 14],
      [2450, 2679, 1218, "68  30", 38.6, 1835, 26, 14],
      [2500, 2734, 1207, "67  55", 38.5, 1825, 26, 14],
      [2550, 2789, 1197, "67  20", 38.3, 1815, 27, 15],
      [2600, 2843, 1187, "66  45", 38.1, 1800, 27, 15],
      [2650, 2898, 1176, "66  10", 37.9, 1785, 28, 15],
      [2700, 2953, 1166, "65  35", 37.7, 1770, 29, 16],
      [2750, 3008, 1156, "65  00", 37.5, 1755, 29, 16],
      [2800, 3062, 1144, "64  20", 37.3, 1740, 30, 16],
      [2850, 3117, 1132, "63  40", 37.1, 1725, 30, 17],
      [2900, 3172, 1120, "63  00", 36.9, 1705, 31, 17],
      [2950, 3226, 1108, "62  20", 36.7, 1685, 31, 17],
      [3000, 3281, 1095, "61  35", 36.5, 1665, 32, 17],
      [3050, 3336, 1081, "60  50", 36.3, 1645, 32, 17],
      [3100, 3390, 1068, "60  05", 36.1, 1625, 33, 18],
      [3150, 3445, 1053, "59  15", 35.8, 1600, 33, 18],
      [3200, 3500, 1038, "58  25", 35.5, 1575, 34, 18],
      [3250, 3554, 1024, "57  35", 35.2, 1550, 35, 18],
      [3300, 3609, 1007, "56  40", 34.8, 1520, 35, 18],
      [3350, 3664, 991, "55  45", 34.4, 1485, 36, 18],
      [3400, 3718, 973, "54  45", 34.0, 1450, 36, 19],
      [3450, 3773, 956, "53  45", 33.6, 1410, 37, 19],
      [3500, 3828, 934, "52 35", 33.2, 1365, 37, 19],
      [3550, 3882, 911, "51 15", 32.7, 1320, 37, 19],
      [3600, 3937, 884, "49  45", 32.1, 1265, 37, 19],
      [3650, 3992, 854, "48  05", 31.4, 1210, 37, 19],
      [3700, 4046, 819, "46  05", 30.6, 1145, 37, 19],
      [3727, 4076, 800, "45  00", 30.0, 1105, 37, 20]
  
      ],
      "Crtn_to_rg_ht": {
          "tg_up_from_mp" :[ 
              [0,    100,200, 300, 400, 500, 600, 700, 800, 900, 1000],
              [2000, 0,  50,  50,  100, 150, 150, 200, 250, 250, 350],
              [2100, 0,  50,  100, 100, 150, 150, 200, 250, 300, 350],
              [2200, 50, 50,  100, 100, 150, 200, 200, 250, 300, 400],
              [2300, 50, 50,  100, 100, 150, 200, 250, 300, 350, 400],
              [2400, 50, 50,  100, 150, 150, 200, 250, 300, 350, 450],
              [2500, 50, 50,  100, 150, 200, 250, 300, 350, 400, 500],
              [2600, 50, 50,  100, 150, 200, 250, 300, 350, 450, 550],
              [2700, 50, 50,  100, 150, 200, 250, 300, 400, 500, 650],
              [2800, 50, 100, 100, 150, 200, 300, 350, 450, 550, 0],
              [2900, 50, 100, 150, 200, 250, 300, 400, 500, 0,   0],
              [3000, 50, 100, 150, 200, 250, 350, 450, 600, 0,   0],
              [3100, 50, 100, 150, 200, 300, 400, 550, 0,   0,   0],
              [3200, 50, 100, 150, 250, 300, 500, 0,   0,   0,   0],
              [3300, 50, 100, 150, 250, 400, 0,   0,   0,   0,   0],
              [3400, 50, 100, 200, 300, 0,   0,   0,   0,   0,   0],
              [3500, 50, 150, 200, 0,   0,   0,   0,   0,   0,   0],
              [3600, 50, 150, 0,   0,   0,   0,   0,   0,   0,   0],
              [3700, 0,  0,   0,   0,   0,   0,   0,   0,   0,   0]
          ],
          "tg_down_from_mp" :[ 
              [0,    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
              [2000, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
              [2100, 0,   50,  50,  100, 100, 0,   0,   0,   0,   0],
              [2200, 0,   50,  50,  100, 100, 150, 150, 150, 200, 200],
              [2300, 50,  50,  50,  100, 100, 150, 150, 150, 200, 200],
              [2400, 50,  50,  100, 100, 100, 150, 150, 200, 200, 200],
              [2500, 50,  50,  100, 100, 150, 150, 150, 200, 200, 200],
              [2600, 50,  50,  100, 100, 150, 150, 150, 200, 200, 250],
              [2700, 50,  50,  100, 100, 150, 150, 200, 200, 250, 250],
              [2800, 50,  50,  100, 100, 150, 150, 200, 200, 250, 250],
              [2900, 50,  50,  100, 150, 150, 200, 200, 250, 250, 250],
              [3000, 50,  50,  100, 150, 150, 200, 200, 250, 250, 300],
              [3100, 50,  100, 100, 150, 150, 200, 200, 250, 300, 300],
              [3200, 50,  100, 100, 150, 200, 200, 200, 250, 300, 300],
              [3300, 50,  100, 150, 150, 200, 200, 250, 300, 300, 300],
              [3400, 50,  100, 150, 150, 200, 250, 250, 300, 300, 350],
              [3500, 50,  100, 150, 200, 200, 250, 250, 300, 350, 350],
              [3600, 50,  100, 150, 200, 200, 250, 300, 300, 350, 350],
              [3700, 50,  100, 150, 200, 200, 300, 300, 350, 350, 400]
  
          ]
  
      },
    },
  
     //   --------------------- charge 6
  "ch_6_mv_236": {
      "Crtn_to_rg_alt_temp": [
          [2500, 2734, 1274, "71  40", 42.5, 2210, 29, 15],
      [2550, 2789, 1266, "71  15", 42.4, 2195, 29, 15],
      [2600, 2843, 1258, "70  45", 42.3, 2180, 30, 16],
      [2650, 2898, 1249, "70  15", 42.2, 2165, 30, 16],
      [2700, 2953, 1240, "69  45", 42.1, 2150, 31, 16],
      [2750, 3008, 1231, "69  15", 42.0, 2135, 32, 17],
      [2800, 3062, 1222, "68  45", 41.8, 2120, 33, 17],
      [2850, 3117, 1213, "68  15", 41.6, 2105, 33, 17],
      [2900, 3172, 1204, "67  45", 41.4, 2090, 34, 18],
      [2950, 3226, 1195, "67  15", 41.2, 2075, 35, 18],
      [3000, 3281, 1187, "66  45", 41.0, 2060, 35, 18],
      [3050, 3336, 1176, "66  10", 40.8, 2045, 36, 19],
      [3100, 3390, 1165, "65  35", 40.6, 2030, 36, 19],
      [3150, 3445, 1155, "65  00", 40.4, 2015, 37, 19],
      [3200, 3500, 1145, "64  25", 40.2, 2000, 37, 20],
      [3250, 3554, 1135, "63  50", 40.0, 1985, 38, 20],
      [3300, 3609, 1124, "63  15", 39.8, 1970, 38, 20],
      [3350, 3664, 1114, "62  40", 39.6, 1950, 39, 20],
      [3400, 3718, 1102, "62  00", 39.4, 1930, 39, 21],
      [3450, 3773, 1090, "61  20", 39.2, 1910, 40, 21],
      [3500, 3828, 1078, "60  40", 39.0, 1885, 40, 21],
      [3550, 3882, 1067, "60  00", 38.8, 1860, 41, 21],
      [3600, 3937, 1053, "59  15", 38.6, 1835, 42, 21],
      [3650, 3992, 1040, "58  30", 38.3, 1805, 42, 22],
      [3700, 4046, 1025, "57  40", 38.0, 1775, 43, 22],
      [3750, 4101, 1009, "56  45", 37.6, 1740, 44, 22],
      [3800, 4156, 992, "55  50", 37.2, 1705, 44, 22],
      [3850, 4211, 975, "54  50", 36.8, 1665, 45, 23],
      [3900, 4265, 957, "53  50", 36.3, 1625, 45, 23],
      [3950, 4320, 938, "52  45", 35.8, 1575, 46, 23],
      [4000, 4375, 917, "51  35", 35.3, 1525, 46, 23],
      [4050, 4429, 893, "50  15", 34.7, 1470, 46, 23],
      [4100, 4484, 866, "48  45", 34.0, 1405, 46, 24],
      [4150, 4539, 834, "46  55", 33.2, 1330, 46, 24],
      [4188, 4580, 800, "45  00", 32.1, 1270, 46, 24]
  
      ],
      "Crtn_to_rg_ht": {
          "tg_up_from_mp" :[ 
              [2500, 50, 50,  100, 100, 150, 150, 200, 250, 300, 350],
              [2600, 50, 50,  100, 100, 150, 200, 250, 250, 300, 350],
              [2700, 50, 50,  100, 100, 150, 200, 250, 300, 350, 350],
              [2800, 50, 50,  100, 150, 150, 200, 250, 300, 350, 400],
              [2900, 50, 50,  100, 150, 150, 200, 250, 300, 350, 450],
              [3000, 50, 50,  100, 150, 200, 250, 300, 350, 400, 500],
              [3100, 50, 50,  100, 150, 200, 250, 300, 350, 400, 550],
              [3200, 50, 50,  100, 150, 200, 250, 300, 400, 450, 600],
              [3300, 50, 100, 100, 150, 200, 250, 350, 400, 550, 750],
              [3400, 50, 100, 100, 150, 200, 300, 350, 450, 650, 0],
              [3500, 50, 100, 150, 200, 250, 300, 400, 550, 0,   0],
              [3600, 50, 100, 150, 200, 250, 350, 500, 0,   0,   0],
              [3700, 50, 100, 150, 200, 300, 400, 0,   0,   0,   0],
              [3800, 50, 100, 150, 250, 350, 0,   0,   0,   0,   0],
              [3900, 50, 100, 200, 0,   0,   0,   0,   0,   0,   0],
              [4000, 50, 150, 0,   0,   0,   0,   0,   0,   0,   0],
              [4100, 50, 0,   0,   0,   0,   0,   0,   0,   0,   0]
          ],
          "tg_down_from_mp" :[ 
              [2500, 0,  0,   0,  0,    0,   0,   0,   0,   0,   0],
              [2600, 0,  50,  50, 100,  100, 100, 0,   0,   0,   0],
              [2700, 50, 50,  50, 100,  100, 150, 150, 150, 200, 200],
              [2800, 50, 50,  100, 100, 150, 150, 150, 200, 200, 200],
              [2900, 50, 50,  100, 100, 150, 150, 150, 200, 200, 200],
              [3000, 50, 50,  100, 100, 150, 150, 150, 200, 200, 250],
              [3100, 50, 50,  100, 100, 150, 150, 200, 200, 200, 250],
              [3200, 50, 50,  100, 100, 150, 150, 200, 200, 250, 250],
              [3300, 50, 50,  100, 100, 150, 150, 200, 200, 250, 250],
              [3400, 50, 50,  100, 150, 150, 200, 200, 250, 250, 250],
              [3500, 50, 50,  100, 150, 150, 200, 200, 250, 250, 300],
              [3600, 50, 100, 100, 150, 150, 200, 250, 250, 250, 300],
              [3700, 50, 100, 100, 150, 200, 200, 250, 250, 300, 300],
              [3800, 50, 100, 100, 150, 200, 200, 250, 300, 300, 350],
              [3900, 50, 100, 150, 150, 200, 250, 250, 300, 300, 350],
              [4000, 50, 100, 150, 200, 200, 250, 300, 300, 350, 350],
              [4100, 50, 100, 150, 200, 200, 250, 300, 300, 350, 350]
  
          ]
  
      },
    },
  
    //   --------------------- charge 7
  
    "ch_7_mv_236": {
      "Crtn_to_rg_alt_temp": [
        [3000, 3281, 1236, "69  30", 44.3, 2405, 39, 18],
      [3050, 3336, 1228, "69  05", 44.2, 2390, 39, 18],
      [3100, 3390, 1221, "68  40", 44.1, 2375, 39, 19],
      [3150, 3445, 1213, "68  15", 44.0, 2360, 40, 19],
      [3200, 3500, 1204, "67  45", 43.9, 2345, 40, 19],
      [3250, 3554, 1196, "67  15", 43.7, 2330, 41, 20],
      [3300, 3609, 1187, "66  45", 43.5, 2315, 41, 20],
      [3350, 3664, 1178, "66  15", 43.3, 2300, 42, 21],
      [3400, 3718, 1169, "65  45", 43.1, 2285, 42, 21],
      [3450, 3773, 1160, "65  15", 42.9, 2270, 43, 21],
      [3500, 3828, 1151, "64  45", 42.7, 2255, 43, 22],
      [3550, 3882, 1142, "64  15", 42.5, 2235, 44, 22],
      [3600, 3937, 1132, "63  40", 42.3, 2215, 45, 23],
      [3650, 3992, 1121, "63  05", 42.1, 2195, 45, 23],
      [3700, 4046, 1111, "62  30", 41.9, 2175, 46, 24],
      [3750, 4101, 1101, "61  55", 41.7, 2155, 47, 24],
      [3800, 4156, 1090, "61  20", 41.5, 2135, 47, 24],
      [3850, 4211, 1078, "60  40", 41.3, 2110, 48, 25],
      [3900, 4265, 1067, "60  00", 41.1, 2085, 49, 25],
      [3950, 4320, 1055, "59  20", 40.9, 2060, 49, 25],
      [4000, 4375, 1043, "58  40", 40.6, 2030, 50, 26],
      [4050, 4429, 1031, "58  00", 40.3, 2000, 51, 26],
      [4100, 4484, 1018, "57  15", 40.0, 1970, 51, 26],
      [4150, 4539, 1004, "56  30", 39.6, 1935, 52, 26],
      [4200, 4593, 990, "55  40", 39.2, 1875, 52, 27],
      [4250, 4648, 973, "54  45", 38.8, 1850, 53, 27],
      [4300, 4703, 957, "53  50", 38.4, 1805, 53, 27],
      [4350, 4757, 939, "52  50", 37.9, 1755, 54, 27],
      [4400, 4812, 920, "51  45", 37.3, 1700, 54, 28],
      [4450, 4867, 898, "50  30", 36.6, 1635, 55, 28],
      [4500, 4921, 871, "49  00", 35.8, 1560, 55, 28],
      [4550, 4976, 835, "47  00", 35.0, 1455, 55, 29],
      [4589, 5019, 800, "45  00", 33.9, 1420, 55, 29]
      ],
      "Crtn_to_rg_ht": {
          "tg_up_from_mp" :[
              [0,   100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
              [3000, 50, 50,  100, 100, 150, 200, 200, 250, 300, 350],
              [3100, 50, 50,  100, 100, 150, 200, 250, 300, 300, 350],
              [3200, 50, 50,  100, 100, 150, 200, 250, 300, 350, 400],
              [3300, 50, 50,  100, 150, 150, 200, 250, 300, 350, 400],
              [3400, 50, 50,  100, 150, 200, 250, 250, 300, 400, 450],
              [3500, 50, 50,  100, 150, 200, 250, 300, 350, 400, 450],
              [3600, 50, 50,  100, 150, 200, 250, 300, 350, 450, 500],
              [3700, 50, 50,  100, 150, 200, 250, 350, 400, 500, 600],
              [3800, 50, 100, 150, 200, 250, 300, 350, 450, 550, 0],
              [3900, 50, 100, 150, 200, 250, 300, 400, 500, 0,   0],
              [4000, 50, 100, 150, 200, 250, 350, 450, 0,   0,   0],
              [4100, 50, 100, 150, 200, 300, 400, 0,   0,   0,   0],
              [4200, 50, 100, 150, 250, 350, 0,   0,   0,   0,   0],
              [4300, 50, 100, 150, 250, 0,   0,   0,   0,   0,   0],
              [4400, 50, 100, 0,   0,   0,   0,   0,   0,   0,   0],
              [4500, 50, 0,   0,   0,   0,   0,   0,   0,   0,   0]
  
  
          ],
          "tg_down_from_mp" :[
              [0,   100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
              [3000, 0,  0,   0,   0,   0,   0,   0,   0,   0,   0],
              [3100, 50, 50,  50,  100, 100, 0,   0,   0,   0,   0],
              [3200, 50, 50,  100, 100, 100, 150, 150, 200, 200, 200],
              [3300, 50, 50,  100, 100, 100, 150, 150, 200, 200, 250],
              [3400, 50, 50,  100, 100, 150, 150, 150, 200, 200, 250],
              [3500, 50, 50,  100, 100, 150, 150, 200, 200, 250, 250],
              [3600, 50, 50,  100, 100, 150, 150, 200, 200, 250, 250],
              [3700, 50, 50,  100, 100, 150, 150, 200, 200, 250, 250],
              [3800, 50, 50,  100, 150, 150, 200, 200, 250, 250, 300],
              [3900, 50, 50,  100, 150, 150, 200, 200, 250, 250, 300],
              [4000, 50, 100, 100, 150, 150, 200, 200, 250, 250, 300],
              [4100, 50, 100, 100, 150, 200, 200, 250, 250, 300, 300],
              [4200, 50, 100, 100, 150, 200, 200, 250, 250, 300, 350],
              [4300, 50, 100, 100, 150, 200, 250, 250, 300, 300, 350],
              [4400, 50, 100, 150, 200, 200, 250, 250, 300, 350, 350],
              [4500, 50, 100, 150, 200, 200, 250, 300, 300, 350, 350]
          ],
  
      },
    },
  
  //   --------------------- charge 8
  
    "ch_8_mv_236": {
      "Crtn_to_rg_alt_temp": [
      [3400, 3718, 1222, "68  45", 46.8, 2705, 46, 23],
      [3450, 3773, 1214, "68  20", 46.7, 2690, 46, 23],
      [3500, 3828, 1207, "67  55", 46.6, 2675, 47, 23],
      [3550, 3882, 1200, "67  30", 46.5, 2660, 48, 24],
      [3600, 3937, 1193, "67  05", 46.4, 2645, 48, 24],
      [3650, 3992, 1185, "66  40", 46.3, 2630, 49, 25],
      [3700, 4046, 1178, "66  16", 46.2, 2615, 50, 25],
      [3750, 4101, 1170, "65  50", 46.1, 2600, 50, 26],
      [3800, 4156, 1163, "65  25", 45.9, 2585, 51, 26],
      [3850, 4211, 1154, "64  55", 45.7, 2570, 52, 27],
      [3900, 4265, 1145, "64  25", 45.5, 2550, 53, 27],
      [3950, 4320, 1136, "63  55", 45.3, 2530, 54, 28],
      [4000, 4375, 1127, "63  25", 45.1, 2510, 55, 28],
      [4050, 4429, 1118, "62  55", 44.9, 2490, 55, 29],
      [4100, 4484, 1110, "62  25", 44.7, 2470, 56, 29],
      [4150, 4539, 1099, "61  50", 44.5, 2450, 57, 29],
      [4200, 4593, 1089, "61  15", 44.3, 2430, 57, 30],
      [4250, 4648, 1078, "60  40", 44.1, 2405, 58, 30],
      [4300, 4703, 1068, "60  05", 43.9, 2380, 59, 30],
      [4350, 4757, 1058, "59  30", 43.7, 2355, 59, 31],
      [4400, 4812, 1047, "58  55", 43.5, 2330, 60, 31],
      [4450, 4867, 1037, "58  20", 43.1, 2300, 61, 31],
      [4500, 4921, 1027, "57  45", 42.9, 2270, 61, 32],
      [4550, 4976, 1015, "57  05", 42.6, 2240, 62, 32],
      [4600, 5031, 1003, "56  25", 42.3, 2205, 62, 33],
      [4650, 5085, 991, "55  45", 42.0, 2170, 63, 33],
      [4700, 5140, 979, "55  05", 41.7, 2130, 63, 33],
      [4750, 5195, 966, "54  20", 41.4, 2100, 63, 33],
      [4800, 5250, 952, "53  35", 41.0, 2060, 64, 33],
      [4850, 5304, 939, "52  50", 40.6, 2020, 64, 34],
      [4900, 5359, 924, "52  00", 40.2, 1975, 64, 34],
      [4950, 5414, 908, "51  05", 39.7, 1935, 64, 34],
      [5000, 5468, 890, "50  05", 39.2, 1885, 65, 34],
      [5050, 5523, 871, "49  00", 38.6, 1830, 65, 34],
      [5100, 5578, 850, "47  50", 38.0, 1775, 65, 34],
      [5150, 5632, 826, "46  30", 37.3, 1715, 65, 34],
      [5200, 5687, 800, "45  00", 36.5, 1660, 65, 34]
      ],
      "Crtn_to_rg_ht": {
          "tg_up_from_mp" :[
              [0,   100,200,300,400,500,600,700,800,900,1000],
              [3400, 50, 50, 50, 100, 100, 150, 200, 250, 300],
              [3500, 50, 50, 100, 100, 150, 150, 200, 250, 300],
              [3600, 50, 50, 100, 100, 150, 200, 250, 250, 300],
              [3700, 50, 50, 100, 150, 150, 200, 250, 250, 300],
              [3800, 50, 50, 100, 150, 150, 200, 250, 300, 350],
              [3900, 50, 50, 100, 150, 200, 200, 250, 300, 350],
              [4000, 50, 50, 100, 150, 200, 200, 250, 300, 350],
              [4100, 50, 50, 100, 150, 200, 250, 300, 350, 400],
              [4200, 50, 50, 100, 150, 200, 250, 300, 350, 450],
              [4300, 50, 100, 100, 150, 200, 250, 350, 400, 500],
              [4400, 50, 100, 100, 150, 200, 300, 350, 450, 550],
              [4500, 50, 100, 150, 200, 250, 300, 400, 500, 0],
              [4600, 50, 100, 150, 200, 250, 350, 450, 600, 0],
              [4700, 50, 100, 150, 200, 300, 400, 0,   0,   0],
              [4800, 50, 100, 150, 250, 350, 0,   0,   0,   0],
              [4900, 50, 100, 150, 250, 0,   0,   0,   0,   0],
              [5000, 50, 100, 150, 0,   0,   0,   0,   0,   0],
              [5100, 50, 100, 150, 0,   0,   0,   0,   0,   0],
              [5200, 0,  0,   0,   0,   0,   0,   0,   0,   0]
  
  
          ],
          "tg_down_from_mp" :[
              [0,   100, 200,300, 400, 500, 600, 700, 800, 900,1000],
              [3400, 0,  0,  0,   0,   0,   0,   0,   0,   0,   0 ],
              [3500, 50, 50, 50,  100, 100, 0,   0,   0,   0,   0 ],
              [3600, 50, 50, 100, 100, 150, 150, 150, 200, 200, 200],
              [3700, 50, 50, 100, 100, 150, 150, 150, 200, 200, 250],
              [3800, 50, 50, 100, 100, 150, 150, 200, 200, 200, 250],
              [3900, 50, 50, 100, 100, 150, 150, 200, 200, 200, 250],
              [4000, 50, 50, 100, 100, 150, 150, 200, 200, 250, 250],
              [4100, 50, 50, 100, 150, 150, 200, 200, 200, 250, 250],
              [4200, 50, 50, 100, 150, 150, 200, 200, 250, 250, 250],
              [4300, 50, 50, 100, 150, 150, 200, 200, 250, 250, 300],
              [4400, 50, 50, 100, 150, 150, 200, 200, 250, 250, 300],
              [4500, 50, 50, 100, 150, 200, 200, 250, 250, 300, 0],
              [4600, 50, 100, 100, 150, 200, 200, 250, 250, 300, 300],
              [4700, 50, 100, 100, 150, 200, 200, 250, 300, 300, 350],
              [4800, 50, 100, 100, 150, 200, 250, 250, 300, 300, 350],
              [4900, 50, 100, 150, 200, 200, 250, 250, 300, 300, 350],
              [5000, 50, 100, 150, 200, 200, 250, 300, 300, 350, 350],
              [5100, 50, 100, 150, 200, 200, 250, 300, 350, 350, 400],
              [5200, 50, 100, 150, 200, 250, 250, 300, 350, 350, 400]
          ],
  
      },
    },
  
  
  };
  
  // export default data;
  