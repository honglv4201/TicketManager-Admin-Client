import React from "react";
import "./custominput.css";

const CustomInput = ({ title, value, onChange }) => {
  return (
    <div className="ticket__custominput">
      <p>{title}</p>
      <input onChange={onChange} value={value} type="text" name="" id="" />
    </div>
  );
};

export default CustomInput;
