import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TripAction from "../../actions/trip.actions";
import { Layout } from "../../components/Layout";
import ScrollContainer from "react-indiana-drag-scroll";
import { ListTicketOfTrip } from "../../components/list/ListTicketOfTrip";
import "./tripdetail.css";
import busImg from "../../asset/img/bus1.jpg";
import { useParams } from "react-router-dom";
import SelectSearch from "react-select-search";
import CityAction from "../../actions/city.actions";
/**
 * @author
 * @function TripDetails
 **/

export const TripDetails = (props) => {
  const dispatch = useDispatch();
  const state_tripDetails = useSelector((state) => state.trip.tripDetails);
  const state_loading_tripDetails = useSelector((state) => state.trip.loading);
  const state_cities = useSelector((state) => state.city);
  const [startIndex, setStartIndex] = useState(null);
  const [endIndex, setEndIndex] = useState(null);

  useEffect(() => {
    loadTripDetails();
  }, []);
  const { tripId } = useParams();

  const loadTripDetails = () => {
    // const { tripId } = props.match.params;
    const payload = {
      params: {
        tripId,
      },
    };
    if (startIndex && endIndex) {
      dispatch(
        TripAction.getTripDetailsByIdAndLocation({
          startIndex,
          endIndex,
          tripId,
        })
      );
    } else {
      dispatch(TripAction.getTripDetailsById(payload));
    }
    dispatch(CityAction.getAllCities());
  };

  const [currentWagon, setCurrentWagon] = useState(0);
  const [general, setGeneral] = useState(false);

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

  // if (Object.keys(state_tripDetails).length === 0) {
  //   return null;
  // }


  const options = [];
  state_cities.cities.map((item) => {
    options.push({
      name: item.name,
      value: item.indexCity + 1,
    });
  });


  const handleFilter = (items) => {
    return (searchValue) => {
      if (searchValue.length === 0) {
        return options;
      }
      const updatedItems = items.filter((list) => {
        return list.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      return updatedItems;
    };
  };

  const handleChangeStart = (e) => {
    setStartIndex(e);
    console.log(e);
  };
  const handleChangeEnd = (e) => {
    setEndIndex(e);
    //console.log(e);
  };

  const handleRemoveGeneral = () => {
    setStartIndex(null);
    setEndIndex(null);
    console.log("startIndex", startIndex);
  };
  useEffect(() => {
    if (general) {
      handleRemoveGeneral();
      loadTripDetails();
    }
  }, [general]);

  useEffect(() => {
    if (startIndex >= 1 && endIndex >= 1 && general) {
      dispatch(
        TripAction.getTripDetailsByIdAndLocation({
          startIndex: startIndex - 1,
          endIndex: endIndex - 1,
          tripId,
        })
      );
    }
  }, [startIndex, endIndex]);

  return (
    <Layout sidebar>
      {state_loading_tripDetails && (
        <div className="loadingComponent">
          <div className="loading-content"></div>
        </div>
      )}
      {!state_loading_tripDetails && (
        <div className="trip-detail__wrapper">
          <div className="trip-detail__info">
            <div className="img-bus">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLxuYnnayof2-xvo5o7ByiU5oQ1k3TR2U8_zWNfF4_rYW2C_FCvxbqkJa65B2ijJYhz1s&usqp=CAU"
                alt=""
              />
            </div>
            <div className="info">
              <h2>
                Tàu:{" "}
                {state_tripDetails.tripDetail &&
                  state_tripDetails.tripDetail.idVehicle.idTrain}
              </h2>
              <h2 className="enterprise">
                {/* Nhà xe: {state_tripDetails.trip.idVehicle.idEnterprise.name} */}
              </h2>

              <div className="detail-info">
                {/* <h2>Biển số: {state_tripDetails.trip.idVehicle.lisensePlate}</h2> */}

                <div className="start-time">
                  {/* <h2>Bắt đầu: {state_tripDetails.trip.idRoute.startLocation}</h2> */}
                </div>

                {/* <h2>Kết thúc: {state_tripDetails.trip.idRoute.endLocation}</h2> */}
                <h2>
                  Ngày khởi hành: T
                  {new Date(
                    state_tripDetails.tripDetail &&
                      state_tripDetails.tripDetail.startDate
                  ).getDay() + 1}
                  {", "}
                  Ngày{" "}
                  {new Date(
                    state_tripDetails.tripDetail &&
                      state_tripDetails.tripDetail.startDate
                  ).toLocaleDateString("vi-VN")}
                </h2>
              </div>


              <div style={{ display: "none" }} className="quantity-info">
                <div className="chair-number">
                  <i class="fas fa-chair"></i>
                  <span>Số ghế: </span>
                  <span className="quantity">
                    {" "}
                    {/* {state_tripDetails.trip.idVehicle.totalSeat} */}
                  </span>
                </div>
                <div className="type-bus">
                  <i class="bx bx-label"></i>
                  <span>Loại xe: </span>

                  <span className="type">
                    {/* {state_tripDetails.trip.idVehicle.quality} */}
                  </span>
                </div>
              </div>
            </div>

            <div className={`select ${!general && "disable"}`}>
              <SelectSearch
                options={options}
                value={startIndex || ""}
                name="language"
                search
                placeholder="Điểm đi"
                //    filterOptions={handleFilter}
                onChange={handleChangeStart}
              />

              <SelectSearch
                options={options}
                value={endIndex}
                name="language"
                search
                placeholder="Điểm đến"
                filterOptions={handleFilter}
                onChange={handleChangeEnd}
              />
            </div>
            <div
              className={`resetGeneral ${general && "active"}`}
              onClick={() => setGeneral((prev) => !prev)}
            >
              Tìm theo ga
            </div>
          </div>

          <div className="trip_detail__wagon">
            <ScrollContainer
              style={{
                display: "flex",
                gap: "10px",
              }}
              className="scroll-wagon"
            >
              {new Array(9).fill(0).map((item, ind) => {
                return (
                  <WagonItem
                    onClick={() => setCurrentWagon(ind)}
                    className={ind === currentWagon && "active"}
                  >
                    Toa {ind + 1}: Ngồi cứng điều hoà
                  </WagonItem>
                );
              })}
            </ScrollContainer>
          </div>
          {((general && startIndex >= 1 && endIndex >= 1) || !general) && (
            <div className="trip-detail__list">
              <ListTicketOfTrip
                general={general}
                // tickets={state_tripDetails.tickets}
                listWagon={state_tripDetails.wagonTickets}
                currentWagon={currentWagon}
                // listTicket={state_tripDetails.listTicket}
                // trip={state_tripDetails.trip}
              ></ListTicketOfTrip>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

const WagonItem = ({ children, className, onClick }) => {
  return (
    <div onClick={onClick} className={`wagon ${className}`}>
      {children}
    </div>
  );
};
