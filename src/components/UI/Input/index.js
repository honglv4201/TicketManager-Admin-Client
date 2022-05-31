import React from "react";

/**
 * @author
 * @function Input
 **/

export const Input = (props) => {
  return (
    <div class={props.div_class}>
      <label for={props.for} class="form-label">
        {props.label}
      </label>
      <input
        value={props.value}
        onChange={props.onChange}
        type={props.type}
        class="form-control"
        placeholder={props.placeholder}
      />
    </div>
  );
};
