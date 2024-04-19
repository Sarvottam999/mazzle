import React, { useState } from "react";
import axios from "axios";
import { return_string_to_num_charge, rg_crtn } from "./util";
import { data } from "../../data/data";
import DisplayResults from "../detail/display_detail";
import "./form.css";

export const Form = () => {
  const [inputValues, setInputValues] = useState({
    TgtGR: "",
    MpGR: "",
    TgtHt: "",
    MpHt: "",
    Temp: "",
    OT: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // console.log(inputValues)
    try {
      var result = rg_crtn(
        inputValues.TgtGR,
        inputValues.MpGR,
        inputValues.TgtHt,
        inputValues.MpHt,
        inputValues.Temp,
        inputValues.OT,
        data
      );
      console.log(result);
      setResult(result);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  // return (
  <div className=""></div>;

  // )
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="heading-text">Enter Values</div>
        <div className="row mb-4">
          <div className="col-25 label">
            <label className="form-label" htmlFor="TgtGR">
              TgtGR
            </label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="TgtGR"
              name="TgtGR"
              className="form-control   "
              value={inputValues.TgtGR}
              // value="230020"
              onChange={handleChange}
            />
          </div>

          <div className="col-25">
            <label className="form-label" htmlFor="TgtHt">
              Tgt Ht
            </label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="TgtHt"
              name="TgtHt"
              className="form-control"
              value={inputValues.TgtHt}
              // value="4160"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* -------------------- */}
        <div className="row mb-4">
          <div className="col-25 label">
            <label className="form-label" htmlFor="MpGR">
              MP GR
            </label>
          </div>

          <div className="col-75">
            <input
              type="text"
              id="MpGR"
              name="MpGR"
              className="form-control"
              value={inputValues.MpGR}
              // value="258013"
              onChange={handleChange}
            />
          </div>
          <div className="col-25 label">
            <label className="form-label" htmlFor="MpHt">
              MP Ht
            </label>
          </div>

          <div className="col-75">
            <input
              type="text"
              name="MpHt"
              id="MpHt"
              className="form-control"
              value={inputValues.MpHt}
              // value="4200"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* -------------------- */}
        <div className="row mb-4">
          <div className="col-25 label">
            <label className="form-label" htmlFor="Temp">
              Temp{" "}
            </label>
          </div>

          <div className="col-75">
            <input
              type="text"
              name="Temp"
              id="Temp"
              className="form-control"
              value={inputValues.Temp}
              // value="12"
              onChange={handleChange}
            />
          </div>

          <div className="col-25 label">
            <label className="form-label" htmlFor="OT">
              OT
            </label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="OT"
              id="OT"
              className="form-control"
              value={inputValues.OT}
              // value="285"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="center-div">
          <button type="submit" className="btn btn-primary custom-btn">
            Submit
          </button>
        </div>
      </form>

      {error ? (
        <div className="error-container error-text ">
          Error: {error}
        </div>
      ) : result ? (
        <div className="m1 result-container">
          <div className="heading-text">Result</div>
          <div className="result-detail">


          <div className="row">
            <h2 className="result-text-1 col-25">Disha: </h2>{" "}
            <div className="col-25">{result.final_disha}</div>
          </div>
          <div className="row">
            <h2 className="result-text-1  col-25">Initial range:</h2>{" "}
            <div className="col-25">{result.initial_range}</div>
          </div>

          <div className="row">
            <div className="col-25 col-25-form">After correction:</div>
            <div className="col-75-form">
              <div className="text-container-after-corret">
                <span className="result-text-2   ">
                  Range: {result.list_of_calculation[0].range}<span className="sp1"> | </span>
                  charge: 
                  {return_string_to_num_charge(
                    result.list_of_calculation[0].charge
                  )}
                </span>
                {/* <span className=" "> */}

                {/* </span>  */}

                {/* <span className=" "> */}

                {/* </span> */}

                {/* <h2 className="result-text-2  col-25">charge:  </h2> <div className="col-25">{result.list_of_calculation[0].charge}</div>
          <h2 className="result-text-2  col-25">final range:  </h2> <div className="col-25">{result.list_of_calculation[0].range}</div> */}
              </div>

              {/* <h3>List of Calculations:</h3> */}
              {/* <ul> */}
              <div className="col-75-form">
                <DisplayResults results={result} />
                {/* </ul> */}
              </div>
            </div>
          </div>
          </div>

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
  );
};
