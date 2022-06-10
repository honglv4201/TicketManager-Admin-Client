import React, { useEffect, useState } from "react";
import "../../../asset/css/components-css/buy-ticket.css";
import { useDispatch, useSelector } from "react-redux";

// img
import serviceImg from "../../../asset/img/services.png";
import pickupPointImg from "../../../asset/img/pickup-point.png";
import { LeftPannel } from "../ModalUpdateTicket/LeftPannel";
import { update } from "../../../actions/user_ticket";
import axios from "axios";

/**
 * @author
 * @function ModalUpdateTicket
 **/

export const ModalUpdateTicket = (props) => {
  const [locations, setLocations] = useState([
    {
      city: "",
      name: "",
    },
  ]);
  const getOn = locations.filter(
    (location) => location.city === props.info.route.startLocation
  );
  const getOff = locations.filter(
    (location) => location.city === props.info.route.endLocation
  );
  const dispatch = useDispatch();
  const [on, setOn] = useState(props.info.book.getOn);
  const [off, setOff] = useState(props.info.book.getOff);

  const [processStatus, setProcessState] = useState(1);

  //front end relate logic
  const [processHandled, setProcessHandled] = useState(1);

  //only for front-end design
  const [prevStatus, setPreStatus] = useState(1); // 1 is default with slide to right
  const [isOpen, setIsOpen] = useState(1); //1 is default with first open， 2 is opened -> for design only
  const numberProcess = 4;
  const clickNextProcess = () => {
    if (processStatus < numberProcess) {
      setPreStatus(1);
      setProcessState(processStatus + 1);
    } else {
      setPreStatus(2);
    }
    if (processStatus > processHandled) {
      setProcessHandled(processStatus);
    }
  };

  const clickOpen = () => {
    setIsOpen(2);
  };

  let seats = [];
  props.info.ticket.quantity.forEach((item, index) => {
    if (item) {
      if (index + 1 == props.info.book.seatNumber) {
        seats.push({
          id: index + 1,
          value: "available",
        });
      } else {
        seats.push({
          id: index + 1,
          value: "booked",
        });
      }
    } else {
      seats.push({
        id: index + 1,
        value: "available",
      });
    }
  });
  const initialSeat = [];
  seats.forEach((seat) => {
    if (seat.value === "available") {
      initialSeat.push(seat.id);
    }
  });
  const [itemChoosing, setItemChoosing] = useState(props.info.book.seatNumber);
  const [itemAvailable, setItemAvailable] = useState(initialSeat);

  const clickChoosing = (id) => {
    setItemChoosing((prev) => {
      if (itemChoosing == id) {
        return itemChoosing;
      } else {
        if (itemAvailable.includes(id)) {
          return id;
        } else {
          return itemChoosing;
        }
      }
    });
  };

  const getOnCLick = (e) => {
    setOn(e.target.value);
  };
  const getOffCLick = (e) => {
    setOff(e.target.value);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/location/fetch`)
      .then(function(response) {
        return response.data;
      })
      .then(function(data) {
        const items = data;
        setLocations(items);
      });
  }, []);

  return (
    <div>
      <div className="modal-ticket">
        <div className="modal-ticket__main">
          <div className="modal-ticket__header">
            <div className="process-bar">
              <div
                className={
                  processStatus === 1
                    ? "item  active current info-customer"
                    : "item  active info-customer"
                }
                onClick={() => {
                  setProcessState(1);
                  if (processStatus > processHandled) {
                    setProcessHandled(processStatus);
                  }
                }}
              >
                <p>1</p>
                <span>Thông tin khách hàng</span>
              </div>

              <div
                className={
                  processStatus === 2
                    ? "item process active current info-customer"
                    : processStatus > 2
                    ? "item process active info-customer"
                    : "item process info-customer"
                }
                onClick={() => {
                  clickOpen();
                  setProcessState(2);
                  if (processStatus > 2) {
                    setPreStatus(2);
                  } else {
                    setPreStatus(1);
                  }
                  if (processHandled < 2) {
                    setProcessHandled(2);
                  }
                }}
              >
                <p>2</p>
                <span>Chọn ghế</span>
              </div>
            </div>
          </div>

          <div className="modal-ticket__content">
            <div
              className={
                isOpen === 1
                  ? "content__customer active"
                  : processStatus === 1
                  ? "content__customer active slide-right"
                  : "content__customer"
              }
            >
              <LeftPannel
                loginImg={serviceImg}
                title="Dịch vụ"
                desc="Hãy chọn các dịch vụ bạn cần nhé :33"
                isLogin="true"
                linkText="Tìm hiểu thêm"
                info={props.info}
              ></LeftPannel>
              <div className="customer__right-panel">
                <div className="right-panel__header">Chọn dịch vụ bên dưới</div>
                <div className="services-list">
                  <div className="seat">
                    <div className="seat-choosing">
                      <div className="steering-wheel">
                        <i class="icofont-steering"></i>
                      </div>
                      <div className="pannel-wrapper">
                        {seats.map((seat) => (
                          <div
                            className={
                              itemChoosing == seat.id &&
                              itemAvailable.includes(seat.id)
                                ? "item-seat active"
                                : itemAvailable.includes(seat.id)
                                ? "item-seat"
                                : "item-seat non-ava"
                            }
                            onClick={() => clickChoosing(seat.id)}
                          >
                            <i class="fas fa-couch"></i>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="seat-guide">
                      <div className="note">* Chú thích</div>
                      <div className="item">
                        <div className="circle circle-choosed"></div>
                        <span>Đang chọn</span>
                      </div>
                      <div className="item">
                        <div className="circle circle-ava"></div>
                        <span>Ghế trống</span>
                      </div>
                      <div className="item">
                        <div className="circle circle-nonava"></div>
                        <span>Không có sẵn</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="custom-btn"
                  onClick={() => {
                    clickOpen();
                    setProcessState(2);
                    if (processStatus > 2) {
                      setPreStatus(2);
                    } else {
                      setPreStatus(1);
                    }
                    if (processHandled < 2) {
                      setProcessHandled(2);
                    }
                  }}
                >
                  Tiếp tục
                </button>
              </div>
            </div>

            <div
              className={
                processStatus === 2
                  ? prevStatus === 1
                    ? "content__services active slide-left"
                    : "content__services active slide-right"
                  : "content__services"
              }
            >
              <LeftPannel
                loginImg={pickupPointImg}
                title="Chọn điểm đón, điểm đến"
                desc="Hãy chọn nơi xe luân chuyển của chúng tôi sẽ đón bạn, nơi bạn dừng ở điểm đến"
                isLogin="false"
                linkText="Tìm hiểu thêm"
                info={props.info}
              ></LeftPannel>
              <div className="customer__right-panel">
                <div className="right-panel__header">
                  Chọn điểm đón, trả khách
                </div>
                <div className="pickup-dropoff__chossing">
                  <div className="pickup-dropoff__main__choosing">
                    <div className="pickup-point">
                      <div className="pickup-dropoff__point pickup-point__title">
                        Điểm đón
                      </div>
                      <ul className="pickup-point__content">
                        {getOn.map((element) => (
                          <li>
                            <input
                              type="radio"
                              name="getOn"
                              value={element.location}
                              onChange={getOnCLick}
                              checked={on == element.location ? true : false}
                            />
                            <span className="content-locate">
                              {" "}
                              {element.location}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="dropoff-point">
                      <div className="pickup-dropoff__point dropoff-point__title">
                        Điểm trả
                      </div>
                      <ul className="pickup-point__content">
                        {getOff.map((element) => (
                          <li>
                            <input
                              type="radio"
                              name="getOff"
                              value={element.location}
                              onChange={getOffCLick}
                              checked={off == element.location ? true : false}
                            />
                            <span className="content-locate">
                              {" "}
                              {element.location}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {props.updatable && (
                  <button
                    className="custom-btn"
                    onClick={() => {
                      if (window.confirm("Bạn muốn lưu thay đổi ?")) {
                        props.info.ticket.quantity[
                          props.info.book.seatNumber - 1
                        ] = false;
                        props.info.ticket.quantity[itemChoosing - 1] = true;
                        dispatch(
                          update(
                            {
                              idUser: props.user._id,
                              idTicket: props.info.ticket._id,
                              getOn: on,
                              getOff: off,
                              seatNumber: itemChoosing,
                            },
                            {
                              idTrip: props.info.trip._id,
                              quantity: props.info.ticket.quantity,
                              price: props.info.ticket.price,
                              _id: props.info.ticket._id,
                            },
                            props.info.book._id
                          )
                        );
                        alert("Cập nhật thành công");
                        window.location.reload();
                      }
                    }}
                  >
                    Lưu thay đổi
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="close-btn" onClick={props.closeModal}>
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  );
};
