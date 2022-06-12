import React, { Fragment } from "react";
import "./selectbox.css";
/**
 * @author
 * @function SelectBox
 **/

export const SelectBox = (props) => {
  const countTotalSeat = (idVehicle) => {
    let total = 0;

    for (let v of props.list) {
      if (idVehicle === v._id) {
        v.wagons.map((i) => {
          if (i == "nmdh" || i == "ncdh") {
            total += 64;
          } else if (i == "nk4dh") total += 28;
          else if (i == "nk6dh") total += 42;
        });
      }
    }
    return total;
  };

  return (
    <div className="selectbox">
      <div className="title">{props.title}</div>
      <select
        value={props.value}
        onChange={props.onChange}
        onMouseUp={props.onChange}
      >
        <option></option>

        {props.type !== "speed" &&
          props.type !== "idTrain" &&
          props.list.map((option) => {
            if (props.type === "VehicleSelect") {
              return (
                <option key={option._id} value={option._id}>
                  SH: {option.idTrain} - BS: {option.numPlate} - SG:{" "}
                  {countTotalSeat(option._id)}
                </option>
              );
            } else if (props.type === "VehicleSelect_BS") {
              return (
                <option key={option._id} value={option._id}>
                  SH: {option.idTrain} - BS: {option.numPlate} - SG:{" "}
                  {countTotalSeat(option._id)}
                </option>
              );
            } else if (props.type === "SteersmanSelect") {
              return (
                <option key={option._id} value={option._id}>
                  {option.idUser.firstName} {option.idUser.lastName}
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
                  {option.name}
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
                <option key={option._id} value={option.indexCity}>
                  {option.name}
                </option>
              );
            }
          })}

        {props.type === "speed" && (
          <Fragment>
            <option value="Fast">Fast</option>
            <option value="Slow">Slow</option>
          </Fragment>
        )}
        {props.type === "idTrain" && (
          <Fragment>
            <option value="SE01">SE01</option>
            <option value="SE02">SE02</option>
            <option value="SE03">SE03</option>
            <option value="SE04">SE04</option>
            <option value="SE05">SE05</option>
            <option value="SE06">SE06</option>
            <option value="SE07">SE07</option>
            <option value="SE08">SE08</option>
          </Fragment>
        )}
      </select>
    </div>
  );
};
