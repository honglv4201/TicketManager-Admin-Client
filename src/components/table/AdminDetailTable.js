import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OfflineTicketAction from "../../actions/offlineTicket.actions";
import { Table } from "./Table";

/**
 * @author
 * @function AdminDetailTable
 **/

export const AdminDetailTable = (props) => {
  const user = props.user;
  const dispatch = useDispatch();

  const state_offlineTickets = useSelector(
    (state) => state.offlineticket.offlineTickets
  );
  useEffect(() => {
    // dispatch(OfflineTicketAction.getAllOfflineTicket());
  }, []);

  const header = [
    "Tên hành khách",
    "Số điện thoại",
    "Địa chỉ",
    "Số ghế",
    "Tùy chọn",
  ];
  const renderOrderHead = (item, ind) => <th key={ind}>{item}</th>;

  const delOfflineTicket = (offlineTicket) => {};

  const renderListOfflineTicket = () => {
    let myList = [];
    for (let l of state_offlineTickets) {
      if (l.idAdmin === user._id) {
        myList.push(
          <tr>
            <td>{l.name}</td>
            <td>{l.contactNumber}</td>
            <td>{l.address}</td>
            <td>{l.seatNumber}</td>
            <td>
              {l.idTicket.idTrip.idRoute.startLocation} -{" "}
              {l.idTicket.idTrip.idRoute.endLocation}
            </td>
            <td>
              <button
                className="delete"
                color="danger"
                onClick={() => delOfflineTicket(l)}
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        );
      }
    }
    return myList;
  };
  if (
    state_offlineTickets === null ||
    Object.keys(state_offlineTickets).length === 0
  ) {
    return null;
  }
  return (
    <div className="enterprise right-content-fixsize">
      <div className="row">
        <div className="col-12">
          <div className="card__header">
            <h3>Danh sách vé đã tạo</h3>
          </div>
          <div className="card__body">
            <Table
              headData={header}
              renderHead={(item, ind) => renderOrderHead(item, ind)}
              render2Body={() => renderListOfflineTicket()}
            ></Table>
          </div>
          <div className="card__footer"></div>
        </div>
      </div>
    </div>
  );
};
