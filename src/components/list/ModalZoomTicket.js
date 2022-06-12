import React from "react";
import "./modalzoomticket.css";

/**
 * @author
 * @function ModalZoomTicket
 **/

export const ModalZoomTicket = React.forwardRef((props, ref) => {
  // const ticketInfor = props.selected;
  // const tickets = props.tickets;
  // const trip = props.trip;
  const handleCloseModal = () => {
    ref.current.classList.toggle("active");
  };
  return (
    <div>
      {/*   MODAL */}
      <div className={"zoom-modal__wrapper "} ref={ref}>
        <div className="zoom-modal active">
          <div className="zoom-modal__header">
            Thông tin vé{" "}
            {/* <span className="number-ticket">
              <h2>Số ghế {ticketInfor.seatNumber}</h2>
            </span> */}
          </div>

          <div className="zoom-modal__body">
            <div className="row1">
              <div className="right">
                <div className="box-container">
                  <div className="col1x">
                    <p>Mã đặt chỗ</p>

                    <p>Ngày khởi hành</p>
                    <p>Tổng tiền</p>
                    <p>Tên khách hàng</p>
                  </div>
                  <div className="col2x">
                    <p className="id">5TVXB-32325</p>

                    {/* <p className="booking-date">
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
                    <p className="customer-name">
                      {ticketInfor.type === "OnlineTicket"
                        ? ticketInfor.idUser.firstName +
                          " " +
                          ticketInfor.idUser.lastName
                        : ticketInfor.name}
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row2">
              <div className="colx2-left">
                <h2>Hãng tàu</h2>
                <h2>Tuyến đường</h2>
                <h2>Biển số</h2>
                <h2>Nơi đón</h2>
                <h2>Nơi trả</h2>
                <h2>Khởi hành</h2>
              </div>
              {/* <div className="colx2-right">
                <p> {trip.idVehicle.idEnterprise.name}</p>
                <p>
                  {" "}
                  {trip.idRoute.startLocation} - {trip.idRoute.endLocation}
                </p>
                <p>{trip.idVehicle.lisensePlate}</p>
                <p> {ticketInfor.getOn}</p>
                <p>{ticketInfor.getOff}</p>
                <p>{trip.idRoute.startTime} </p>

              {/* <h2>Nhà xe: {trip.idVehicle.idEnterprise.name}</h2>

              <h2>
                Tuyến đường: {trip.idRoute.startLocation} -{" "}
                {trip.idRoute.endLocation}
              </h2>

              <h2>Biển số: {trip.idVehicle.lisensePlate}</h2>
              <h2 class="card1-text">Nơi đón: {ticketInfor.getOn}</h2>
              <h2 class="card1-text">Nơi trả: {ticketInfor.getOff}</h2>

              <h2>Giờ khởi hành: {trip.idRoute.startTime} </h2> */}
            </div>
          </div>

          <div className="zoom-modal__footer">
            <button onClick={handleCloseModal}>close</button>
          </div>
        </div>
      </div>
    </div>
  );
});
