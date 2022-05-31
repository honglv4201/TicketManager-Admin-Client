import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AuthAction from "../../actions/auth.actions";
import "./dropdown.css";

/**
 * @author
 * @function DropDown
 **/
const clickToggle = (contentRef, toggleRef) => {
  document.addEventListener("mousedown", (e) => {
    if (toggleRef.current && toggleRef.current.contains(e.target)) {
      contentRef.current.classList.add("active");
    } else if (contentRef.current && !contentRef.current.contains(e.target)) {
      contentRef.current.classList.remove("active");
    }
  });
};

export const DropDown = (props) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(AuthAction.signout());
  };
  const renderNotifyItem = (item, ind) => {
    return (
      <div className="notify-item" key={ind} onClick={logout}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    );
  };

  const dropToggle_el = useRef(null);
  const dropContent_el = useRef(null);
  clickToggle(dropContent_el, dropToggle_el);

  return (
    <div className="dropdown">
      <button ref={dropToggle_el} className="dropdown__toggle">
        {props.icon ? <i className={props.icon}></i> : ""}
        {props.badge ? (
          <span className="dropdown__toggle-badge">{props.badge}</span>
        ) : (
          ""
        )}
        {props.customToggle ? props.customToggle() : ""}
      </button>

      <div ref={dropContent_el} className="dropdown__content">
        {props.contentData && props.renderItems
          ? props.contentData.map((item, ind) => renderNotifyItem(item, ind))
          : ""}
        {props.renderFooter ? (
          <div className="dropdown__footer">
            <Link to="/">Xem tất cả </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
