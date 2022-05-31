import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TripAction from "../../actions/trip.actions";
import { Layout } from "../../components/Layout";
import { ListTicketOfTrip } from "../../components/list/ListTicketOfTrip";
import "./tripdetail.css";
import busImg from "../../asset/img/bus1.jpg";
/**
 * @author
 * @function TripDetails
 **/

export const TripDetails = (props) => {
  const dispatch = useDispatch();
  const state_tripDetails = useSelector((state) => state.trip.tripDetails);

  useEffect(() => {
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

  const genTicketList = () => {
    const listTicket = state_tripDetails.listTicket;
    let count = 1;
    var list = [];
    for (let i = 0; i < listTicket.length; i++) {
      let ti = listTicket[i];
      list.push({
        STT: count,
        Hoten:
          ti.type === "OnlineTicket"
            ? ti.idUser.firstName + " " + ti.idUser.lastName
            : ti.name,
        SDT:
          ti.type === "OnlineTicket"
            ? ti.idUser.contactNumber
            : ti.contactNumber,
        SoGhe: Number(ti.seatNumber),
        NoiDon: ti.getOn,
        NoiTra: ti.getOff,
        LoaiVe: ti.type,
        GiaVe: state_tripDetails.tickets.price,
      });
      count += 1;
    }
    return list;
  };

  //const footer = [`Tổng cộng: ${state_tripDetails.listTicket.length} vé`];
  //const footer = [`Tổng cộng: 0 vé`];

  if (Object.keys(state_tripDetails).length === 0) {
    return null;
  }

  return (
    <Layout sidebar>
      <div className="trip-detail__wrapper">
        <div className="trip-detail__info">
          <div className="img-bus">
            <img src={busImg} alt="" />
          </div>
          <div className="info">
            <h2 className="enterprise">
              Nhà xe: {state_tripDetails.trip.idVehicle.idEnterprise.name}
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
                <span>Loại xe: </span>

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
            trip={state_tripDetails.trip}
          ></ListTicketOfTrip>
        </div>
      </div>
    </Layout>
  );
};
