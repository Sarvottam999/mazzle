import React, { useState } from "react";
import axios from "axios";
// import { Form } from "./";
import Navbar from "./components/navbar/navbar";
import { Form } from "./components/form/form";
 import "./App.css"
function App() {
  return (
    <div className="main-page">
      <Navbar/>
      <Form />
    </div>
  );
}

export default App;
