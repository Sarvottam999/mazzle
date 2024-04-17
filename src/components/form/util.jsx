
export function rg_crtn  (TgtGR, MpGR, TgtHt, MpHt, Temp, OT , data_in_use)   {

  // console.log(`  TgtGR --- MpGR : ${TgtGR  } -- ${MpGR}`);

  let x_y = find_cordnt(TgtGR, MpGR);
  // console.log(`finding x_y  completed ....  : ${x_y}`);

  if (x_y.length == 0 ) {  throw new Error(`cannot find x y cordinate`); }


  //  finding initail range 
  let final_disha = getDisha(x_y[0], x_y[1]);
  printError(final_disha, "final_disha!")

  let intial_range = find_tr_range(x_y[0], x_y[1]);
  printError(intial_range, "initail range!")
  // console.log(`finding trg_range completed ....  : ${intial_range}`);

  let find_list_charge = findChargeInRange(data_in_use, intial_range);
    // console.log(`finding find_list_charge completed ....  : ${find_list_charge}`);
    printError(find_list_charge, "charge!")

    // find_value_for_each_chrg(
    //   find_list_charge[0],TgtHt , MpHt, data_in_use, intial_range, Temp
    // )
    let list_of_calculation = [] ; //find_list_charge.length
    for (let index = 0; index < find_list_charge.length; index++) {
      // // console.log("**********************")
  
        // const element = array[index];
  
        list_of_calculation.push (find_value_for_each_chrg(
          find_list_charge[index],TgtHt , MpHt, data_in_use, intial_range, Temp
        )
      )
        
      }

      return {
        final_disha,
        list_of_calculation

      }
  






}





// ==============================================================

function find_value_for_each_chrg(charge0,TgtHt0 ,MpHt0 , data0 , intial_range0, Temp0) {

  let charge = charge0;let TgtHt =TgtHt0; let MpHt =MpHt0;  let data =data0;  let intial_range =intial_range0; let Temp =Temp0; 

  let current_chg = "";
  let current_mv = "";


  // console.log(charge)


  const numbers = charge.match(/\d+/g); // Match all digits in the string
  // console.log(numbers);
  // console.log(`finding charge numbers completed from string ....${numbers}`);
  if (numbers.length == 0) {
    throw new Error("no found numbers in charge string!");
 }


 current_chg = numbers[0].toString();
 current_mv = numbers[1].toString();




 let diff_in_h = TgtHt - MpHt;
//  // console.log("diff_in_h");
// console.log(`found hight diffrence ....${diff_in_h}`);

//  // console.log(diff_in_h);
let ht_crtn;

if ( diff_in_h > 0) {
   // console.log("tg_up_from_mp");
   ht_crtn = getValueForHT_crtn(
    charge,
     data,
     "tg_up_from_mp",
     intial_range,
     diff_in_h
   );
   // console.log("ht_crtn");

   // console.log(ht_crtn);

   intial_range = intial_range + ht_crtn;
 } else if (diff_in_h < 0) {
   // console.log("tg_down_from_mp")
   ht_crtn = getValueForHT_crtn(
     charge,
     data,
     "tg_down_from_mp",
     intial_range,
     diff_in_h
   );
   // console.log("ht_crtn");

   // console.log(ht_crtn);

   intial_range = intial_range - ht_crtn;
 }
 else{

 }
// console.log(`initail range after ht correction ....${intial_range}`);

 printError(intial_range, "intial_range!");


   //  ALT correction
   let ALT_crtn_blocks = Math.floor(MpHt / 300);

  //  // console.log(Math.floor(1134 / 300))

   let gwt_ValueForALT_crtn = getValueForALT_crtn(
     intial_range,
     data,
     charge
   );
   printError(gwt_ValueForALT_crtn, "gwt_ValueForALT_crtn!");


   let ALT_crtn_value = ALT_crtn_blocks * gwt_ValueForALT_crtn;
// console.log(`found value for altitude correction  diffrence ....${ALT_crtn_value}`);




// Temp correction
let temp_sub15 = Temp - 15;
// // console.log(temp_sub15)

let temp_block = Math.floor(temp_sub15 / 5);

let gwt_ValueForTemp_crtn = getValueForTem_crtn(
  intial_range,
  data,
  charge
);
let temp_crtn_value = gwt_ValueForTemp_crtn * temp_block;
// console.log(`found value for Temp correction  diffrence ....${temp_crtn_value}`);



let conbine_effect = roundToNearestTen(temp_crtn_value + ALT_crtn_value);
// // console.log(conbine_effect)
intial_range = intial_range - conbine_effect;
// console.log(`initail range after combine operation ....${intial_range}`);


let final_charge_string_list = findChargeInRange(data, intial_range);
printError(final_charge_string_list, "final_charge_string_list!");
console.log(`${final_charge_string_list} ==== final_charge_string_list*******${intial_range}*****`)

let sub_charge_cal_list  =[] ;

for (let index = 0; index < final_charge_string_list.length; index++) {
console.log(`${index} ==== final_charge_string_list*******${final_charge_string_list[index]}*****`)

    sub_charge_cal_list.push(final_opt_on_charge( final_charge_string_list[index], intial_range, data));
console.log(sub_charge_cal_list)

  
}




 
 // // console.log(data)


return {
  range : intial_range,
  charge,
  sub_charge_cal_list




}


  
}





function find_cordnt(TgtGR, MpGR) {


  let left1 = parseInt(TgtGR.substring(0, 3));
  let left2 = parseInt(MpGR.substring(0, 3));
  let right1 = parseInt(TgtGR.substring(TgtGR.length - 3));
  let right2 = parseInt(MpGR.substring(MpGR.length - 3));
  // console.log(`finding differences started ....  : `);
  // console.log(`finding differences left1 ....  : ${left1}`);
  // console.log(`finding differences left2 ....  : ${left2}`);
  // console.log(`finding differences right1 ....  : ${right1}`);
  // console.log(`finding differences right2 ....  : ${right2}`);


  let leftDiff = left1 - left2;
  let rightDiff = right1 - right2;
  // console.log(`found differences leftDiff ....  : ${leftDiff}`);
  // console.log(`found differences rightDiff ....  : ${rightDiff}`);
  // // console.log(`finding differences completed ....  : ${differences}`);


  return [leftDiff, rightDiff];
}
  function printError(strng, descption) {
  if (strng == null || strng.length == 0 ) {
  // // console.log(`cannot find ${descption}`);
  throw new Error(`cannot find ${descption}`);

      
  }

}

function find_tr_range(a, b) {
  // find target range
  let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

  // console.log(`sq of x  ....  : ${Math.pow(a, 2)}`);
  // // console.log(`finding differences leftDiff ....  : ${leftDiff}`);
  // console.log(`sq of y  ....  : ${Math.pow(b, 2)}`);
  // console.log(`after adding x + y   ....  : ${Math.pow(a, 2) + Math.pow(b, 2)}`);
  // console.log(`root   ....  : ${Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))}`);

 


  // console.log(`finding root ....  : ${c}`);

  let answer = Math.round(c) * 100;
  // console.log(`finding root * 100 ....  : ${answer}`);

  return answer;
}

function findChargeInRange(data, range) {
  // find first most charge from range
  let list_of_keys =[]
  let purify_range = roundToNearestMultiple(range, 50)
  for (const key in data) { 
    if (data.hasOwnProperty(key)) {
      const chargeData = data[key];

      const Crtn_to_rg_alt_temp = chargeData["Crtn_to_rg_alt_temp"];
      // // console.log(key);
      for (let i = 0; i < Crtn_to_rg_alt_temp.length; i++) {
  if (purify_range  == Crtn_to_rg_alt_temp[i][0] ) { 
          list_of_keys.push(key); 

        }
      }
    }


  }
  // console.log( `list of charges---->  ${list_of_keys}`);

  // return final_key;
  return list_of_keys;
}

function roundToNearestMultiple(number, multiple) {
  return Math.ceil(number / multiple) * multiple;
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
  // // console.log(quadrant);
  // console.log(`quadrant -> ${quadrant}`);

  let arc_length = Math.atan2(absX, absY);
  // // console.log(`arc_length -> ${arc_length}`);

  let pi = Math.PI;
  // // console.log(`pi -> ${pi}`);

  let cal = arc_length * (360 / (2 * pi));
  // // console.log(`cal -> ${cal}`);

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
  // console.log(`disha -> ${angleFromYAxis}`);

  return angleFromYAxis;
}

function getValueForHT_crtn(key, data, position_key, trg_range, diff_in_h) {
  //CORRECTION TO RANGE FOR DIFFERENCE IN HEIGHT OF TARGET FROM MORTAR//

  let value = null;
  let ht_crtn;

  try {
    let htSec = data[key];

    value = htSec["Crtn_to_rg_ht"][position_key];
       // console.log(value);

    //    value.fore
    for (let i = 1; i < value.length; i++) {
      const rowData = value[i];
      // console.log(` ===> trg_range ${trg_range}`);
      if ( trg_range <= rowData[0] ) {
        let heightIndex = Math.abs(Math.floor(diff_in_h / 100));
           // console.log(heightIndex);
          //  if (heightIndex < 0) {
          //   heightIndex = 1;
            
          //  }

        if (heightIndex < rowData.length) {
          ht_crtn = rowData[heightIndex];
          //    // console.log(ht_crtn);

          return ht_crtn;
        }
      }
    } 
  } catch (error) {
    // console.log(error);
  }

  return value;
}



function getValueForALT_crtn(trg_range, data, charge) {
  let value = null;

  try {
    // for (const k in data) {
    // // console.log(k)

    const chargeData = data[charge];

    chargeData.Crtn_to_rg_alt_temp.forEach((element) => {
      if (element[0] <= trg_range) {
        value = element[6];
        //    // console.log(value)
      }
    });

    //   };
  } catch (error) {
    // console.log(error);
  }

  return value;
}

function getValueForTem_crtn(trg_range, data, charge) {
  let value = null;

  try {
    // for (const k in data) {
    // // console.log(k)

    const chargeData = data[charge];

    chargeData.Crtn_to_rg_alt_temp.forEach((element) => {
      if (element[0] <= trg_range) {
        value = element[7];
        //    // console.log(value)
      }
    });

    //   };
  } catch (error) {
    // console.log(error);
  }

  return value;
}


function roundToNearestTen(num) {
  return Math.ceil(num / 10) * 10;
}

function get_Angle_of_projection(trg_range, data, charge) {
  // // console.log("--------------trg-range")
  // // console.log(trg_range)
  // // console.log("--------------data")
  // // console.log(data)

  // // console.log("--------------charge")
  // // console.log(charge)


  
  let value = null;

  try {
    // for (const k in data) {

    const chargeData = data[charge];
   
    // // console.log(chargeData)


    // chargeData.Crtn_to_rg_alt_temp.forEach((element) => {
    //   if (trg_range <= element[0] ) {
    //     value = element[3];
    //      // console.log(`${trg_range} <= ${element[0]} ======== ${value} `)
    //   }
    // });

    for (let i = 0; i < chargeData.Crtn_to_rg_alt_temp.length; i++) {
      const element = chargeData.Crtn_to_rg_alt_temp[i];
      if (trg_range <= element[0]) {
        value = element[3];
        break;
        // console.log(`${trg_range} <= ${element[0]} ======== ${value} `)
      }
    }
    

    //   };
  } catch (error) {
    // console.log(error);
  }

  return value;
  
}

function final_opt_on_charge(final_charge_string, intial_range, data) {

  const numbs = final_charge_string.match(/\d+/g); // Match all digits in the string

let final_charge = numbs[0].toString();
// console.log(`final charge  ....${final_charge}`);

// console.log(`${intial_range} ==== INITAIL RANGE 2************`)

let uchai_agl_of_projtn = get_Angle_of_projection(intial_range, data, final_charge_string);
// console.log(`uchai   ....${uchai_agl_of_projtn}`);

console.log(`${uchai_agl_of_projtn} ====uchai_agl_of_projtn************`)

return {
  sub_charge : final_charge_string,
  uchai : uchai_agl_of_projtn

}

  
}

