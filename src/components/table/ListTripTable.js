import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TripAction from "../../actions/trip.actions";
import { InputTitleLeft } from "../UI/inputTitleLeft/InputTitleLeft";
import { SelectBox } from "../UI/select/SelectBox";
import { Table } from "./Table";
import swal from "sweetalert";
import { useEffect } from "react";
/**
 * @author
 * @function ListTripTable
 **/

export const ListTripTable = (props) => {
  const dispatch = useDispatch();
  const inputEl = useRef("");
  const prop_listTrip = props.listTrip.sort((a, b) =>
    a.startDate > b.startDate ? 1 : -1
  );
  const listVehicle = props.listVehicle;
  const listTicket = props.listTicket;
  const listSteersman = props.listSteersman;
  const term = props.term;

  const date = new Date().toISOString();

  const initTrip = () => {
    return {
      _id: "",
      idVehicle: {},
      idRoute: "",
      startDate: date,
      fixed_price: "",
      totalSeat: "",
      idSteersman: {},
    };
  };

  const [trip, setTrip] = useState(initTrip);

  const [modalShow, setModalShow] = useState(false);
  const [modalFlag, setModalFlag] = useState("Add");
  const [modalTitle, setModalTitle] = useState();
  const [editData, setEditData] = useState(false);
  const [checked, setChecked] = React.useState(true);
  const [listTrip, setListTrip] = React.useState(prop_listTrip);

  const getListTrip = () => {
    if (checked) {
      let list = [];
      for (let i = 0; i < prop_listTrip.length; i++) {
        var month = new Date(prop_listTrip[i].startDate).getUTCMonth() + 1;
        var day = new Date(prop_listTrip[i].startDate).getUTCDate();
        var year = new Date(prop_listTrip[i].startDate).getUTCFullYear();
        var date = new Date(year, month, day);
        var curDate = new Date();
        if (date > curDate) {
          list.push(prop_listTrip[i]);
        }
      }
      setListTrip(list);
    } else {
      setListTrip(prop_listTrip);
    }
  };

  useEffect(() => {
    getListTrip();
  }, [props.listTrip]);

  const checkEditData = () => {
    if (trip.idVehicle && trip.startDate && trip.fixed_price) {
      setEditData(true);
    } else {
      setEditData(false);
    }
  };

  const handleModalShow = (iFlag, trip = []) => {
    if (iFlag === "Add") {
      setModalFlag("Add");
      setModalTitle("Thêm chuyến tàu");
    } else {
      setModalFlag("Edit");
      setModalTitle("Sửa chuyến tàu");
      setTrip(trip);
    }
    setModalShow(true);
  };
  const handleModalSave = () => {
    const form = { ...trip, idRoute: props.idRoute };
    if (modalFlag === "Add") {
      delete form._id;
      dispatch(TripAction.addTrip(form));
      props.reLoad();
      swal({
        title: "Thêm thành công",
        text: "Bạn đã thêm chuyến tàu thành công",
        icon: "success",
        button: "OK",
      });
    } else {
      dispatch(TripAction.editTrip(form));
      props.reLoad();
      swal({
        title: "Sửa thành công",
        text: "Bạn đã chuyến tàu tuyến đường thành công",
        icon: "success",
        button: "OK",
      });
    }
    setTrip(initTrip);
    props.reLoad();
    setModalShow(false);
    resetCss();
  };
  const handleModalClose = () => {
    setTrip(initTrip);
    setModalShow(false);
    resetCss();
  };

  const resetCss = () => {
    setEditData(false);
  };

  const trips = {
    header: [
      "Ngày khởi hành",
      "Tàu phụ trách",
      "Số ghế",
      "Tài xế",
      "Trạng thái",
      "Tùy chọn",
    ],
    body: [],
  };

  const getStatus = (item) => {
    if (item.isActive === "no") return "Đã hủy";
    var date = new Date(item.startDate);
    var curDate = new Date();
    return date > curDate ? "Sẵn sàng" : "Đã hoàn thành";
  };

  const isDisable = (item) => {
    if (item.isActive === "no") return true;
    var date = new Date(item.startDate);
    var curDate = new Date();
    return date > curDate ? false : true;
  };

  const renderHead = (item, ind) => {
    return <th key={ind}>{item}</th>;
  };

  const findPriceOfTrip = (idTrip) => {
    for (const tic of listTicket) {
      if (tic.idTicket === idTrip) {
        return tic.price;
      }
    }
    return 0;
  };

  // const findTotalSeatOfVehicle = (idVehicle) => {
  //   for (const veh of listVehicle) {
  //     if (veh._id === idVehicle) {
  //       return veh.totalSeat;
  //     }
  //   }
  //   return 0;
  // };

  const delTrip = (trip) => {
    let form = trip;
    swal({
      title: "Bạn chắc chắn xóa",
      text: "Bạn có chắc sẽ xóa chuyến tàu này không",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Chuyến tàu đã được xóa thành công!", {
          icon: "success",
        });
        form.isActive = "no";
        dispatch(TripAction.editTrip(form));
        if (props.type !== "Main") {
          props.reLoad();
        }
      } else {
        swal("Chuyến tàu vẫn chưa bị xóa!");
      }
    });
  };

  const countTotalSeat = (idVehicle) => {
    let total = 0;

    for (let v of listVehicle) {
      if (idVehicle === v._id) {
        v.wagons.map((i) => {
          if (i == "nmdh" || i == "ncdh") {
            total += 64;
          } else if (i == "nk4dh") total += 28;
          else if (i == "nk6dh") total += 42;
        });
      }
    }
    return total;
  };

  // const findNameOfSteersman = (idUser) => {
  //   let result = "";

  //   for (let v of listVehicle) {
  //     if (idVehicle === v._id) {
  //       v.wagons.map((i) => {
  //         if (i == "nmdh" || i == "ncdh") {
  //           total += 64;
  //         } else if (i == "nk4dh") total += 28;
  //         else if (i == "nk6dh") total += 42;
  //       });
  //     }
  //   }
  //   return result;
  // };

  const renderTrips = (trips, steersmans) => {
    let myTrips = [];
    for (let trip of trips) {
      for (let s of steersmans) {
        if (s._id === trip.idSteersman._id) {
          myTrips.push(
            <tr>
              <td>{new Date(trip.startDate).toLocaleDateString("vi-VN")}</td>
              <td>
                SH: {trip.idVehicle.idTrain} - BS: {trip.idVehicle.numPlate}
              </td>
              <td>{countTotalSeat(trip.idVehicle._id)}</td>
              <td>
                {s.idUser.firstName} {s.idUser.lastName}
              </td>
              <td>{getStatus(trip)}</td>
              <td>
                <button
                  className="edit"
                  onClick={() => {
                    handleModalShow("Edit", {
                      _id: trip._id,
                      idVehicle: trip.idVehicle._id,
                      startDate: trip.startDate,
                      idRoute: trip.idRoute,
                      idSteersman: trip.idSteersman._id,
                      fixed_price: trip.fixed_price ? trip.fixed_price : 0,
                      // totalSeat: trip.idVehicle.totalSeat,
                    });
                  }}
                  hidden={isDisable(trip)}
                >
                  <i class="far fa-edit"></i>
                </button>
                <button
                  className="delete"
                  hidden={isDisable(trip)}
                  onClick={() => {
                    delTrip(trip);
                  }}
                >
                  <i class="far fa-trash-alt"></i>
                </button>
                <Link to={`/trips/${trip._id}`}>
                  <button className="detail" type="button" onClick={() => {}}>
                    Chi tiết
                  </button>
                </Link>
              </td>
            </tr>
          );
        }
      }
    }
    return myTrips;
  };

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  return (
    <div>
      <div className="routes right-content-fixsize">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__header">
                <h3>Các chuyến tàu</h3>
                <button
                  className="add-enterprise"
                  onClick={() => {
                    handleModalShow("Add");
                  }}
                >
                  Thêm chuyến tàu
                </button>
                <div className="ui-search">
                  <input
                    ref={inputEl}
                    placeholder="Tìm kiếm"
                    className="prompt"
                    value={term}
                    onChange={getSearchTerm}
                  />
                </div>
                <div style={{ marginLeft: 60, fontSize: 18 }}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      setChecked(!checked);
                      getListTrip();
                    }}
                  />
                  <label style={{ marginLeft: 10, fontSize: 18 }}>
                    Hiển thị chuyến tàu đã hoàn thành (đã hủy)
                  </label>
                </div>
              </div>

              <div className="card__body">
                <Table
                  headData={trips.header}
                  renderHead={(item, ind) => renderHead(item, ind)}
                  render2Body={() =>
                    renderTrips(listTrip, listSteersman).length > 0
                      ? renderTrips(listTrip, listSteersman)
                      : "Không tìm thấy kết quả"
                  }
                />
              </div>
              <div className="card__footer"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          modalShow ? "add-modal__wrapper active" : "add-modal__wrapper"
        }
      >
        <div className={modalShow ? "add-modal active" : "add-modal"}>
          <div className="add-modal__header">{modalTitle}</div>

          <div className="add-modal__body">
            <div className="input-enterprise-name">
              <InputTitleLeft
                title="Ngày đi"
                value={trip.startDate.substring(0, 10)}
                placeholder={``}
                onChange={(e) => {
                  setTrip({ ...trip, startDate: e.target.value });
                  checkEditData();
                }}
              />
              <SelectBox
                value={trip.idVehicle}
                onChange={(e) => {
                  setTrip({
                    ...trip,
                    idVehicle: e.target.value,
                    totalSeat: countTotalSeat(e.target.value),
                  });
                  checkEditData();
                }}
                list={listVehicle}
                title="Phương tiện"
                type="VehicleSelect"
              />
              <InputTitleLeft
                title="Giá vé"
                value={trip.fixed_price}
                placeholder={``}
                onChange={(e) => {
                  setTrip({ ...trip, fixed_price: parseInt(e.target.value) });
                  checkEditData();
                }}
                type="Number"
              />
              <SelectBox
                value={trip.idSteersman}
                onChange={(e) => {
                  setTrip({
                    ...trip,
                    idSteersman: e.target.value,
                  });
                  checkEditData();
                }}
                list={listSteersman}
                title="Tài xế"
                type="SteersmanSelect"
              />
            </div>
          </div>

          <div className="add-modal__footer">
            <button className="btn-cancel" onClick={handleModalClose}>
              {" "}
              Hủy bỏ
            </button>
            <button
              className="btn-save"
              disabled={!editData}
              onClick={handleModalSave}
            >
              {" "}
              Lưu lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
