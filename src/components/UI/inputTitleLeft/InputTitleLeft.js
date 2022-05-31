import React from "react";

import "./inputtitleleft.css";
/**
 * @author
 * @function InputTitleLeft
 **/

export const InputTitleLeft = (props) => {
  return (
    <div>
      <div className="input-title-left">
        <div className="title">{props.title}</div>
        <div className="input">
          <input
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            onKeyUp={props.onChange}
          />
        </div>
      </div>
    </div>
  );
};
