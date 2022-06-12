import React, { Fragment, useState } from "react";
import { FunctionBar } from "./functionBar";
import { Link, NavLink } from "react-router-dom";
import "./listTicketOfTrip.css";
import { useSelector } from "react-redux";
import CustomInput from "./components/CustomInput";
import SelectSearch from "react-select-search";

/**
 * @author
 * @function ListTicketOfTrip
 **/

export const ListTicketOfTrip = (props) => {
  // const tickets = props.tickets;
  // const listTicket = props.listTicket;
  // const trip = props.trip;

  const listWagon = props.listWagon;
  const findInListTicket = (index) => {
    // for (let i = 0; i < listTicket.length; i++) {
    //   if (Number(listTicket[i].seatNumber) === index) {
    //     return listTicket[i];
    //   }
    // }
    // return;
  };

  const isDisable = () => {
    // if (trip.isActive === "no") return true;
    // var date = new Date(trip.startDate);
    // var curDate = new Date();
    // return date > curDate ? false : true;
  };

  const renderTickets = () => {
    const currentWagon = props.currentWagon;
    if ((listWagon && listWagon.length <= 0) || !listWagon) return null;
    let myTickets = [];
    console.log("hong", listWagon);
    const currentWagonSeat = listWagon[currentWagon].seats;
    for (
      let i = 0;
      i < listWagon[currentWagon].wagonTicket.wagon.totalSeat;
      i++
    ) {
      if (props.general) {
        if (currentWagonSeat.some((seat) => seat.seat.numOfSeat === i + 1)) {
          const countTicket = currentWagonSeat.filter(
            (seat) => seat.seat.numOfSeat === i + 1
          ).length;
          //  const ticketInfor = findInListTicket(i + 1);
          if (true) {
            myTickets.push(
              <div class="card1 selected" style={{ width: "25rem" }}>
                <div class="card1-header">
                  <span className="number-chair"> Ghế {i + 1}</span>
                  <span className="status">Vé online</span>
                </div>
                <div class="card1-body">
                  <h5 class="customer-name">
                    {/* {ticketInfor.idUser.firstName} {ticketInfor.idUser.lastName} */}
                    Đã đặt: {countTicket} vé
                  </h5>

                  <p class="card1-text">
                    Giá vé:{" "}
                    {listWagon[currentWagon].wagonTicket.price.toLocaleString(
                      "it-IT",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}
                  </p>
                  <DetailComponent
                    isBooked={true}
                    data={currentWagonSeat.filter(
                      (seat) => seat.seat.numOfSeat === i + 1
                    )}
                  />
                  {/* <FunctionBar
                    selected={ticketInfor}
                    tickets={tickets}
                    trip={trip}
                  /> */}
                </div>
              </div>
            );
          } else if ("ticketInfor.type" === "OfflineTicket") {
            myTickets
              .push
              // <div class="card1 offline-paid" style={{ width: "25rem" }}>
              //   <div class="card1-header">
              //     <span className="number-chair"> Ghế {i + 1}</span>
              //     <span className="status paid">Đã thanh toán</span>
              //   </div>
              //   <div class="card1-body">
              //     <div className="offline-customer-info">
              //       {" "}
              //       <h5 class="customer-name">{ticketInfor.name}</h5>
              //       <h5 class="customer-number">
              //         {"SĐT: " + ticketInfor.contactNumber}
              //       </h5>
              //     </div>
              //     <p class="card1-text">Nơi đón: {ticketInfor.getOn}</p>
              //     <p class="card1-text">Nơi trả: {ticketInfor.getOff}</p>
              //     <p class="card1-text">
              //       Giá vé:{" "}
              //       {tickets.price.toLocaleString("it-IT", {
              //         style: "currency",
              //         currency: "VND",
              //       })}
              //     </p>
              //     <FunctionBar
              //       selected={ticketInfor}
              //       tickets={tickets}
              //       trip={trip}
              //     ></FunctionBar>
              //   </div>
              // </div>
              ();
          } else {
            myTickets
              .push
              // <div class="card1 unknow" style={{ width: "25rem" }}>
              //   <div class="card1-header">Ghế {i + 1}</div>
              //   <div class="card1-body">
              //     <h5 class="card1-title">{ticketInfor.Name}</h5>
              //     <p class="card1-text">
              //       Giá vé:{" "}
              //       {tickets.price.toLocaleString("it-IT", {
              //         style: "currency",
              //         currency: "VND",
              //       })}
              //     </p>
              //   </div>
              // </div>
              ();
          }
        } else {
          myTickets.push(
            <div class="card1" style={{ width: "25rem" }}>
              <div class="card1-header">
                <span className="number-chair"> Ghế {i + 1}</span>
                <span className="status">Ghế trống</span>
              </div>
              <div class="card1-body">
                <p class="card1-text">
                  Giá vé:{" "}
                  {/* {tickets.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })} */}
                </p>
                <AddTicket />
              </div>
            </div>
          );
        }
      } else {
        const countTicket = currentWagonSeat.filter(
          (seat) => seat.seat.numOfSeat === i + 1
        ).length;
        //  const ticketInfor = findInListTicket(i + 1);
        if (true) {
          const isBooked = currentWagonSeat.some(
            (seat) => seat.seat.numOfSeat === i + 1
          );
          myTickets.push(
            <div
              class={`card1  ${isBooked && "selected"}`}
              style={{ width: "25rem" }}
            >
              <div class="card1-header">
                <span className="number-chair"> Ghế {i + 1}</span>
                {isBooked && <span className="status">Vé online</span>}
              </div>
              <div class="card1-body">
                <h5 class="customer-name">
                  {/* {ticketInfor.idUser.firstName} {ticketInfor.idUser.lastName} */}

                  {isBooked ? `Đã đặt: ${countTicket} vé` : "Ghế trống"}
                </h5>

                <p class="card1-text">
                  Giá vé:{" "}
                  {listWagon[currentWagon].wagonTicket.price.toLocaleString(
                    "it-IT",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </p>
                <DetailComponent
                  isBooked={isBooked}
                  data={currentWagonSeat.filter(
                    (seat) => seat.seat.numOfSeat === i + 1
                  )}
                />

                {/* <FunctionBar
                // selected={ticketInfor}
                // tickets={tickets}
                // trip={trip}
                /> */}
              </div>
            </div>
          );
        } else if ("ticketInfor.type" === "OfflineTicket") {
          myTickets
            .push
            // <div class="card1 offline-paid" style={{ width: "25rem" }}>
            //   <div class="card1-header">
            //     <span className="number-chair"> Ghế {i + 1}</span>
            //     <span className="status paid">Đã thanh toán</span>
            //   </div>
            //   <div class="card1-body">
            //     <div className="offline-customer-info">
            //       {" "}
            //       <h5 class="customer-name">{ticketInfor.name}</h5>
            //       <h5 class="customer-number">
            //         {"SĐT: " + ticketInfor.contactNumber}
            //       </h5>
            //     </div>
            //     <p class="card1-text">Nơi đón: {ticketInfor.getOn}</p>
            //     <p class="card1-text">Nơi trả: {ticketInfor.getOff}</p>
            //     <p class="card1-text">
            //       Giá vé:{" "}
            //       {tickets.price.toLocaleString("it-IT", {
            //         style: "currency",
            //         currency: "VND",
            //       })}
            //     </p>
            //     <FunctionBar
            //       selected={ticketInfor}
            //       tickets={tickets}
            //       trip={trip}
            //     ></FunctionBar>
            //   </div>
            // </div>
            ();
        } else {
          myTickets
            .push
            // <div class="card1 unknow" style={{ width: "25rem" }}>
            //   <div class="card1-header">Ghế {i + 1}</div>
            //   <div class="card1-body">
            //     <h5 class="card1-title">{ticketInfor.Name}</h5>
            //     <p class="card1-text">
            //       Giá vé:{" "}
            //       {tickets.price.toLocaleString("it-IT", {
            //         style: "currency",
            //         currency: "VND",
            //       })}
            //     </p>
            //   </div>
            // </div>
            ();
        }
      }
    }

    return myTickets;
  };

  return <div className="list-ticket">{renderTickets()}</div>;
};

const DetailComponent = ({ isBooked, data }) => {
  const closeModal = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  if (isBooked) {
    return (
      <Fragment>
        <div onClick={() => setOpen(true)} className="btn-detail">
          Chi tiết
        </div>
        {open && <DetailTicketModal data={data} closeModal={closeModal} />}
      </Fragment>
    );
  }
};
const AddTicket = ({ data }) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <Link to="">
      <button onClick={() => setOpen(true)} className="btn-add-ticket">
        Thêm vé
      </button>
      {open && <AddTicketModal data={data} closeModal={closeModal} />}
    </Link>
  );
};
const AddTicketModal = ({ closeModal, data }) => {
  const options = [
    {
      name: "Người lớn",
      value: "Người lớn",
    },
    {
      name: "Học sinh/ Sinh viên",
      value: "Học",
    },
    {
      name: "Người lớn",
      value: "sd",
    },
  ];
  const [typeTicket, setTypeTicket] = useState("Người lớn");
  const handleOnChange = (e) => {
    console.log(e);
    setTypeTicket(e);
  };
  return (
    <div className="detail-ticket-modal">
      <div className="detail-content">
        <div className="close" onClick={closeModal}>
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div className="title">Đặt vé Offline</div>
        <div className="content">
          <div className="flex">
            <div className="flexitem">
              <SelectSearch
                options={options}
                value={typeTicket}
                name="language"
                onChange={handleOnChange}
              />
              <CustomInput title="Nhập họ tên: " />
              <CustomInput title="Nhập CMND/CCCD: " />
            </div>
            <div className="flexitem">
              <h4>Thông tin admin đặt</h4>
              <div className="">
                Họ tên : hồng <span></span>
              </div>
              <div className="">
                Họ tên : phúc <span></span>
              </div>
            </div>
          </div>

          <div className="btn-book">Đặt vé</div>
        </div>
      </div>
    </div>
  );
};

const DetailTicketModal = ({ closeModal, data }) => {
  console.log(
    "🚀 ~ file: ListTicketOfTrip.js ~ line 296 ~ DetailTicketModal ~ data",
    data
  );

  return (
    <div className="detail-ticket-modal">
      <div className="detail-content">
        <div className="close" onClick={closeModal}>
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div className="title">Những người đã đặt</div>

        <div className="list-items">
          {data.map((item, ind) => {
            return <ItemTicket data={item} ind={ind + 1} />;
          })}
          <div className="div" style={{ marginTop: "80px" }}></div>
        </div>
      </div>
    </div>
  );
};

const ItemTicket = ({ data, ind }) => {
  const cities = useSelector((state) => state.city.cities);

  return (
    <div className="item-ticket">
      <div>
        <div className="header-item">Khách hàng {ind}:</div>
        <div className="item-ticket_content">
          <div className="info">
            <div>
              <span className="name">Tên hành khách: </span>
              {data.cusTicket.cusName}
            </div>
            {data.cusTicket.cusID && (
              <div>
                <span className="name">Giấy tờ: </span>
                {data.cusTicket.cusID}
              </div>
            )}
            {data.cusTicket.cusAge > 0 && (
              <div>
                <span className="name">Tuổi: </span>
                {data.cusTicket.cusAge}
              </div>
            )}

            <div>
              <span className="name">Trạm đi: </span>
              {cities[data.seat.startIndex].name}
            </div>

            <div>
              <span className="name">Trạm đến: </span>
              {cities[data.seat.endIndex].name}
            </div>

            <div>
              <span className="name">Chỗ ngồi: </span>
              Ghế {data.seat.numOfSeat + 1}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="header-item">Người đặt:</div>
        <div className="item-ticket_content">
          <div className="info">
            <div>
              <span className="name">Họ tên: </span>
              {data.userBooking.fullname}
            </div>
            <div>
              <span className="email">Email: </span>
              {data.userBooking.email}
            </div>
            <div>
              <span className="name">Giấy tờ: </span>
              {data.userBooking.identifyNumber}
            </div>

            <div>
              <span className="name">Số điện thoại: </span>
              {data.userBooking.phoneNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
