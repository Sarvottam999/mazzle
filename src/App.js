import React, { useState } from "react";
import axios from "axios";
// import { Form } from "./";
import Navbar from "./components/navbar";
import { Form } from "./components/form/form";
 
function App() {
  return (
    <div>
      <Navbar/>
      <Form />
    </div>
  );
}

export default App;
