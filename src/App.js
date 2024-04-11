import React, { useState } from "react";
import axios from "axios";
import { Form } from "./form";
import Navbar from "./components/navbar";
 
function App() {
  return (
    <div>
      <Navbar/>
      <Form />
    </div>
  );
}

export default App;
