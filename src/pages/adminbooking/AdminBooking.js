import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTripDetailsById } from "../../actions/trip.actions";
import { Layout } from "../../components/Layout";
import { ListTicketOfTrip } from "../../components/list/ListTicketOfTrip";
import "../../containers/TripDetails/tripdetail.css";
import busImg from "../../asset/img/bus1.jpg";
/**
 * @author
 * @function AdminBooking
 **/

export const AdminBooking = (props) => {
  return (
    <Layout sidebar>
      <p>hong</p>
      {/* <div className="trip-detail__wrapper">
        <div className="trip-detail__info">
          <div className="img-bus">
            <img src={busImg} alt="" />
          </div>
          <div className="info">
            <h2 className="enterprise">
              Hãng tàu: {state_tripDetails.trip.idVehicle.idEnterprise.name}
            </h2>

            <div className="detail-info">
              <h2>Biển số: {state_tripDetails.trip.idVehicle.lisensePlate}</h2>

              <div className="start-time">
                <h2>Bắt đầu: {state_tripDetails.trip.idRoute.startLocation}</h2>
              </div>

              <h2>Kết thúc: {state_tripDetails.trip.idRoute.endLocation}</h2>
              <h2>
                Ngày khởi hành:{" "}
                {new Intl.DateTimeFormat("vi", {
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(state_tripDetails.trip.startDate))}
              </h2>
            </div>

            <div className="quantity-info">
              <div className="chair-number">
                <i class="fas fa-chair"></i>
                <span>Số ghế: </span>
                <span className="quantity">
                  {" "}
                  {state_tripDetails.trip.idVehicle.totalSeat}
                </span>
              </div>
              <div className="type-bus">
                <i class="bx bx-label"></i>
                <span>Loại tàu: </span>

                <span className="type">
                  {state_tripDetails.trip.idVehicle.quality}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="trip-detail__list">
          <ListTicketOfTrip
            tickets={state_tripDetails.tickets}
            listTicket={state_tripDetails.listTicket}
          ></ListTicketOfTrip>
        </div>
      </div> */}
    </Layout>
  );
};
