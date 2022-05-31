import React from "react";
import "./selectbox.css";
/**
 * @author
 * @function SelectBox
 **/

export const SelectBox = (props) => {
  return (
    <div className="selectbox">
      <div className="title">{props.title}</div>
      <select
        value={props.value}
        onChange={props.onChange}
        onMouseUp={props.onChange}
      >
        <option></option>
        {props.list.map((option) => {
          if (props.type === "VehicleSelect") {
            return (
              <option key={option._id} value={option._id}>
                BS:{option.quality} - SG:{option.totalSeat}
              </option>
            );
          } else if (props.type === "VehicleSelect_BS") {
            return (
              <option key={option._id} value={option._id}>
                BS:{option.lisensePlate} - SG:{option.totalSeat}
              </option>
            );
          } else if (props.type === "EnterpriseSelect") {
            return (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            );
          } else if (props.type === "commonID") {
            return (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            );
          } else if (props.type === "SeatSelect") {
            return (
              <option
                key={option.num}
                value={option.num}
                disabled={option.isSel}
              >
                {option.num}
              </option>
            );
          } else if (props.type === "LocationSelect") {
            return (
              <option key={option._id} value={option.name}>
                {option.name} - {props.addShow}
              </option>
            );
          } else if (props.type === "gender") {
            return (
              <option key={option._id} value={option.value}>
                {option.show}
              </option>
            );
          } else {
            return (
              <option key={option._id} value={option.name}>
                {option.name}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};
