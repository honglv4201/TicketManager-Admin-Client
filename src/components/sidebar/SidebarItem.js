import React from "react";

/**
 * @author
 * @function SidebarItem
 **/

export const SidebarItem = (props) => {
  const active = props.active ? "active" : "";
  return (
    <div>
      <div className="sidebar__item">
        <div className={`sidebar__item-inner ${active}`}>
          <i className={props.icon}></i>
          <span>{props.title}</span>
        </div>
      </div>
    </div>
  );
};
