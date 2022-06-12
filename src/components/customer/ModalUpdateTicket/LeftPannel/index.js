import React from "react";

/**
 * @author
 * @function LeftPannel
 **/

export const LeftPannel = (props) => {
  const math = (startTime, totalTime) => {
    let s = startTime + totalTime;
    if (s - Math.floor(s) > 0.59 || s - Math.floor(s) == 0) {
      s += +1 - 0.6;
    }
    return s >= 24
      ? (s - 24).toFixed(2).toString().replace(".", ":")
      : s.toFixed(2).toString().replace(".", ":");
  };
  return (
    <div className="customer__left-panel">
      <div className="login-popup">
        <div className="left-pic">
          <img src={props.loginImg} alt="" />
        </div>
        <div className="login-popup__info">
          <div className="title">{props.title}</div>
          <div className="desc">{props.desc}</div>
          {props.isLogin === "true" ? <a href="#">{props.linkText}</a> : null}
        </div>
      </div>
      <div className="left-pannel-info">
        <div className="header">
          <i class="cus-bus fas fa-bus"></i>
          <span className="depart">{props.info.route.startLocation}</span>
          <i class="cus-right fas fa-arrow-right"></i>
          <span className="destination">{props.info.route.endLocation}</span>
          <a href="">Chi tiết</a>
        </div>
        <div className="main">
          <div className="date">
            <i class="far fa-clock"></i>
            <span> Ngày khởi hành</span>
            <p>
              {" "}
              {new Date(props.info.trip.startDate).toLocaleDateString("vi-VN")}
            </p>
          </div>
          <div className="bus-branch">
            <span> Tàu</span>{" "}
            <spanc className="branch-name">{props.info.enterprise.name}</spanc>
          </div>

          <div className="time-estimate">
            <div className="time-site time-site-start">
              <span className="time">
                {props.info.route.startTime
                  .toFixed(2)
                  .toString()
                  .replace(".", ":")}
              </span>
              <span className="site">{props.info.route.startLocation}</span>
            </div>
            <i class="fas fa-caret-right"></i>
            <div className="time-site time-site-end">
              <span className="time">
                {math(props.info.route.startTime, props.info.route.totalTime)}
              </span>
              <span className="site">{props.info.route.endLocation}</span>
            </div>
            <i class="cus-dot fas fa-circle"></i>
            <div className="time-taking-estimate">
              {props.info.route.totalTime
                .toFixed(2)
                .toString()
                .replace(".", " giờ ")}{" "}
              phút di chuyển
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
