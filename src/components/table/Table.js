import React from "react";
import "./table.css";

/**
 * @author
 * @function Table
 **/

export const Table = (props) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        {props.headData && props.renderHead ? (
          <thead>
            <tr>
              {props.headData.map((item, ind) => props.renderHead(item, ind))}
            </tr>
          </thead>
        ) : (
          ""
        )}
        {props.bodyData && props.renderBody ? (
          <tbody>
            {props.bodyData.map((item, ind) => props.renderBody(item, ind))}
          </tbody>
        ) : (
          ""
        )}
        {props.render2Body ? (
          <tbody className="detail-tab">{props.render2Body()}</tbody>
        ) : (
          ""
        )}
      </table>
    </div>
  );
};
