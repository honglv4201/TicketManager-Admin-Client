// Using a class component, everything works without issue
// export class ComponentToPrint extends React.PureComponent {
//     render() {
//       return (
//         <div>My cool content here!</div>
//       );
//     }
//   }

import React from "react";
import "./componenttoprint.css";
import logoImg from "../../asset/img/logo.png";
//   // Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
//   // the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
//   // https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
export const ComponentToPrint = React.forwardRef((props, ref) => {
  // const ticketInfor = props.selected;
  // const tickets = props.tickets;
  // const trip = props.trip;
  return (
    <>
      <h1 ref={ref} className="printpage">
        {"ticketInfor.type" === "OnlineTicket" ? (
          <div>
            <div className="logo">
              <img src={logoImg} alt="" />
              <h1 className="header-title">Hóa đơn</h1>
            </div>

            <div className="printpage__body">
              <div className="row1">
                <div className="left">
                  <div class="company">
                    <div class="name">5Ting Bus</div>
                  </div>
                  <div className="session-contact">
                    <i class="far fa-envelope"></i>
                    <span className="email">customer@5tingbus.com</span>
                  </div>
                  <div className="session-contact">
                    <i class="fas fa-phone"></i>
                    <span className="phone">0396432444</span>
                  </div>
                  <div className="session-location">
                    Quan Thu Duc, 52409
                    <p>Ho Chi Minh</p>
                  </div>
                </div>
                <div className="right">
                  <div className="box-container">
                    <div className="col1x">
                      <p>Mã đặt chỗ</p>
                      <p>Ngày tạo</p>
                      <p>Ngày khởi hành</p>
                      <p>Tổng tiền</p>
                      <p>Tên khách hàng</p>
                    </div>
                    <div className="col2x">
                      <p className="id">5TVXB-32325</p>
                      <p className="date-create">
                        {/* {" "}
                        {new Intl.DateTimeFormat("vi", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        }).format(new Date())} */}
                      </p>
                      <p className="booking-date">
                        {/* {" "}
                        {new Intl.DateTimeFormat("vi", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        }).format(new Date(trip.startDate))} */}
                      </p>
                      <p className="total-money">
                        {" "}
                        {/* {tickets.price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })} */}
                      </p>
                      <p className="customer-name">
                        {/* {ticketInfor.idUser.firstName}{" "}
                        {ticketInfor.idUser.lastName} */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="row2">
                <h1 className="txt-detail">Thông tin chi tiết</h1>
                <h2>Hãng tàu: {trip.idVehicle.idEnterprise.name}</h2>
                <h2>
                  Tuyến đường: {trip.idRoute.startLocation} -{" "}
                  {trip.idRoute.endLocation}
                </h2>

                <h2>Số ghế {ticketInfor.seatNumber}</h2>
                <h2>Biển số: {trip.idVehicle.lisensePlate}</h2>
                <h2 class="card1-text">Nơi đón: {ticketInfor.getOn}</h2>
                <h2 class="card1-text">Nơi trả: {ticketInfor.getOff}</h2>

                <h2>Giờ khởi hành: {trip.idRoute.startTime} </h2>
              </div> */}
              <div className="row3">
                <h2>Ngày: 15 tháng 11 năm 2021</h2>
                <h2> Người bán vé : Lam Hong</h2>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="logo">
              <img src={logoImg} alt="" />
              <h1 className="header-title">Hóa đơn</h1>
            </div>

            <div className="printpage__body">
              <div className="row1">
                <div className="left">
                  <div class="company">
                    <div class="name">5Ting Bus</div>
                  </div>
                  <div className="session-contact">
                    <i class="far fa-envelope"></i>
                    <span className="email">customer@5tingbus.com</span>
                  </div>
                  <div className="session-contact">
                    <i class="fas fa-phone"></i>
                    <span className="phone">0396432444</span>
                  </div>
                  <div className="session-location">
                    Quan Thu Duc, 52409
                    <p>Ho Chi Minh</p>
                  </div>
                </div>
                <div className="right">
                  <div className="box-container">
                    <div className="col1x">
                      <p>Mã đặt chỗ</p>
                      <p>Ngày tạo</p>
                      <p>Ngày khởi hành</p>
                      <p>Tổng tiền</p>
                      <p>Tên khách hàng</p>
                    </div>
                    {/* <div className="col2x">
                      <p className="id">5TVXB-32325</p>
                      <p className="date-create">
                        {" "}
                        {new Intl.DateTimeFormat("vi", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        }).format(new Date())}
                      </p>
                      <p className="booking-date">
                        {" "}
                        {new Intl.DateTimeFormat("vi", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        }).format(new Date(trip.startDate))}
                      </p>
                      <p className="total-money">
                        {" "}
                        {tickets.price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                      <p className="customer-name">{ticketInfor.name}</p>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* <div className="row2">
                <h1 className="txt-detail">Thông tin chi tiết</h1>
                <h2>Hãng tàu: {trip.idVehicle.idEnterprise.name}</h2>
                <h2>
                  Tuyến đường: {trip.idRoute.startLocation} -{" "}
                  {trip.idRoute.endLocation}
                </h2>

                <h2>Số ghế {ticketInfor.seatNumber}</h2>
                <h2>Biển số: {trip.idVehicle.lisensePlate}</h2>
                <h2 class="card1-text">Nơi đón: {ticketInfor.getOn}</h2>
                <h2 class="card1-text">Nơi trả: {ticketInfor.getOff}</h2>

                <h2>Giờ khởi hành: {trip.idRoute.startTime} </h2>
              </div> */}
              <div className="row3">
                <h2>Ngày: 15 tháng 11 năm 2021</h2>
                <h2> Người bán vé : Lam Hong</h2>
              </div>
            </div>
          </div>
          // <div>

          //   <h1>Hãng tàu: {trip.idVehicle.idEnterprise.name}</h1>
          //   <h1>
          //     Tuyến đường: {trip.idRoute.startLocation} -{" "}
          //     {trip.idRoute.endLocation}
          //   </h1>

          //   <h2 class="customer-name">{ticketInfor.name}</h2>
          //   <h2>Số ghế {ticketInfor.seatNumber}</h2>
          //   <h2>Biển số: {trip.idVehicle.lisensePlate}</h2>
          //   <p class="card1-text">Nơi đón: {ticketInfor.getOn}</p>
          //   <p class="card1-text">Nơi trả: {ticketInfor.getOff}</p>
          //   <p class="card1-text">
          //     Giá vé:{" "}
          //     {tickets.price.toLocaleString("it-IT", {
          //       style: "currency",
          //       currency: "VND",
          //     })}
          //   </p>
          //   <h2>Giờ khởi hành: {trip.idRoute.startTime} </h2>
          //   <h2>
          //     Ngày khởi hành:{" "}
          //     {new Intl.DateTimeFormat("vi", {
          //       month: "long",
          //       day: "2-digit",
          //       year: "numeric",
          //     }).format(new Date(trip.startDate))}
          //   </h2>
          //   <h2>Ngày: ... tháng .... năm ....</h2>
          //   <h2> Người bán vé</h2>
          // </div>
        )}
      </h1>
    </>
  );
});
