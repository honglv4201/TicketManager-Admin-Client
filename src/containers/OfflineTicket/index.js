import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import swal from "sweetalert";
import CityAction from "../../actions/city.actions";
import OfflineTicketAction from "../../actions/offlineTicket.actions";
import TripAction from "../../actions/trip.actions";
import { Layout } from "../../components/Layout";
import { InputTitleLeft } from "../../components/UI/inputTitleLeft/InputTitleLeft";
import { SelectBox } from "../../components/UI/select/SelectBox";

import "./offlineticket.css";
/**
 * @author
 * @function OfflineTicket
 **/

export const OfflineTicket = (props) => {
  const state_trip = useSelector((state) => state.trip.tripDetails.trip);
  const state_ticket = useSelector((state) => state.trip.tripDetails.tickets);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CityAction.getAllCities());
    loadTripDetails();
  }, []);

  const loadTripDetails = () => {
    const { tripId } = props.match.params;
    const payload = {
      params: {
        tripId,
      },
    };
    dispatch(TripAction.getTripDetailsById(payload));
  };
  const state_city = useSelector((state) => state.city);

  const getLocationByCityName = (ctName) => {
    for (const ct of state_city.cities) {
      if (ct.name === ctName) {
        return ct.location;
      }
    }
    return [];
  };

  const initOffTicket = () => {
    return {
      _id: "",
      idTicket: "",
      idAdmin: "",
      //idUser: "",
      name: "",
      contactNumber: "",
      dob: "",
      address: "",
      seatNumber: localStorage.getItem("seatSelect"),
      getOn: "",
      getOff: "",
      canceled: "false",
    };
  };
  const [offTicket, setOffTicket] = useState(initOffTicket);

  const createOfflineTicket = () => {
    const ticket = state_ticket;
    ticket.quantity[offTicket.seatNumber - 1] = true;
    const form = offTicket;
    form.idTicket = state_ticket._id;
    form.idAdmin = JSON.parse(localStorage.getItem("user"))._id;
    //form.seatNumber = localStorage.getItem("seatSelect");
    delete form._id;
    dispatch(OfflineTicketAction.addOfflineTicket(form, ticket));
    swal({
      title: "Thêm thành công",
      text: "Bạn đã thêm chuyến tàu thành công",
      icon: "success",
      button: "OK",
    }).then(function () {
      window.location = `${window.location.pathname.replace(
        "tickets",
        "informations"
      )}`;
    });
  };
  if (!state_trip) return <></>;
  if (!state_ticket) {
    return <></>;
  }

  const genSeatSelect = () => {
    let listSeat = [];
    for (let i = 0; i < state_ticket.quantity.length; i++) {
      listSeat.push({ num: i + 1, isSel: state_ticket.quantity[i] });
    }
    return listSeat;
  };
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
    <Layout sidebar>
      <div className="offlineticket">
        <h3 className="head-title">Đặt vé offline</h3>
        <div className="offlineticket__body">
          <div className="left-pannel-info">
            <div className="header">
              <i class="cus-bus fas fa-bus"></i>
              <span className="depart">{state_trip.idRoute.startLocation}</span>
              <i class="cus-right fas fa-arrow-right"></i>
              <span className="destination">
                {state_trip.idRoute.endLocation}
              </span>
            </div>
            <div className="main">
              <div className="date">
                <i class="fas fa-table"></i>
                <span> Ngày khởi hành</span>
                <p className="start-time">
                  {" "}
                  {new Date(state_trip.startDate).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div className="bus-branch">
                {/* <span> Tàu</span> <spanc className="branch-name"></spanc> */}
              </div>
              <div className="time-estimate__wrapper">
                <i class="far fa-clock"></i>
                <span> Thời gian</span>
              </div>

              <div className="time-estimate">
                <div className="time-site time-site-start">
                  <span className="time">
                    {state_trip.idRoute.startTime
                      .toFixed(2)
                      .toString()
                      .replace(".", ":")}
                  </span>
                  <span className="site">
                    {state_trip.idRoute.startLocation}
                  </span>
                </div>
                <i class="fas fa-caret-right"></i>
                <div className="time-site time-site-end">
                  <span className="time">
                    {math(
                      state_trip.idRoute.startTime,
                      state_trip.idRoute.totalTime
                    )}
                  </span>
                  <span className="site">{state_trip.idRoute.endLocation}</span>
                </div>
              </div>
              <div className="total-time__wrapper">
                <i class="cus-dot fas fa-circle"></i>
                <div className="time-taking-estimate">
                  {state_trip.idRoute.totalTime} phút di chuyển
                </div>
              </div>
            </div>
          </div>
          <div className="input-form">
            {/* <h2>Số ghế: {localStorage.getItem("seatSelect")}</h2> */}
            <SelectBox
              value={offTicket.seatNumber}
              onChange={(e) => {
                setOffTicket({ ...offTicket, seatNumber: e.target.value });
              }}
              list={genSeatSelect()}
              type="SeatSelect"
              title="Số ghế"
            />
            <InputTitleLeft
              title="Họ và tên"
              value={offTicket.name}
              placeholder={``}
              onChange={(e) => {
                setOffTicket({ ...offTicket, name: e.target.value });
              }}
            />
            <InputTitleLeft
              title="Số điện thoại"
              value={offTicket.contactNumber}
              placeholder={``}
              onChange={(e) => {
                setOffTicket({ ...offTicket, contactNumber: e.target.value });
              }}
            />
            <InputTitleLeft
              title="Ngày sinh"
              value={offTicket.dob}
              placeholder={``}
              onChange={(e) => {
                setOffTicket({ ...offTicket, dob: e.target.value });
              }}
            />
            <InputTitleLeft
              title="Địa chỉ"
              value={offTicket.address}
              placeholder={``}
              onChange={(e) => {
                setOffTicket({ ...offTicket, address: e.target.value });
              }}
            />

            <SelectBox
              value={offTicket.getOn}
              onChange={(e) => {
                setOffTicket({ ...offTicket, getOn: e.target.value });
              }}
              list={getLocationByCityName(state_trip.idRoute.startLocation)}
              addShow={state_trip.idRoute.startLocation}
              type="LocationSelect"
              title="Nơi đón"
            />

            <SelectBox
              value={offTicket.getOff}
              onChange={(e) => {
                setOffTicket({ ...offTicket, getOff: e.target.value });
              }}
              list={getLocationByCityName(state_trip.idRoute.endLocation)}
              addShow={state_trip.idRoute.endLocation}
              type="LocationSelect"
              title="Nơi trả"
            />
            <Button className="btn-create-ticket" onClick={createOfflineTicket}>
              Hoàn thành
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
