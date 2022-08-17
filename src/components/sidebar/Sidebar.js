import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import logoImg from "../../asset/img/logo.png";

import sidebarItem from "../../asset/JsonData/sidebar_routes.json";
import { SidebarItem } from "./SidebarItem";

import "./sidebar.css";
/**
 * @author
 * @function Sidebar
 **/

export const Sidebar = (props) => {
  const activeItem = 1; // sidebarItem.findIndex(item=>item.route = props.location.pathname)
  const urlPath = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logoImg} alt="logo" />
      </div>

      {sidebarItem.map((item, ind) => {
        return (
          <NavLink to={item.route} key={ind}>
            <SidebarItem
              title={item.display_name}
              icon={item.icon}
              active={urlPath.pathname === item.route}
            />
          </NavLink>
        );
      })}
    </div>
  );
};
