import React, { useEffect, useState } from "react";
import { Layout } from "../Layout";
import userImg from "../../asset/img/user.jpg";
import "./userdetail.css";
import { Table } from "../table/Table";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailById } from "../../actions";
import { getAll } from "../../actions/user_ticket";
import axios from "axios";
import "../../asset/css/components-css/itemTicket.css";
import { ModalUpdateTicket } from "../../components/customer/ModalUpdateTicket";
import { StatusCard } from "../statusCard/StatusCard";

/**
 * @author
 * @function UserDetail
 **/

export const UserDetail = (props) => {
  const [openBuyingModal, setOpenBuyingModal] = useState(false);
  const [detail, setDetail] = useState("");
  const [updatable, setUpdatable] = useState(false);
  const clickCloseBuyingModal = () => {
    setOpenBuyingModal(false);
  };

  if (openBuyingModal === true) {
    document.body.style.overflowY = "hidden";
    document.body.style.width = "100%";
    document.body.style.marginRight = "150px";
  } else {
    document.body.style.overflowY = "auto";
    document.body.style.position = "static";
  }
  const userId = window.location.href.split("/")[4];
  const [customer, setCustomer] = useState("");
  const dispatch = useDispatch();
  const books = useSelector((state) => state.user_ticket);
  const active = books.filter(
    (item) =>
      new Date(item.trip.startDate) >= Date.now() &&
      item.book.idUser === userId &&
      !item.book.canceled
  );
  const used = books.filter(
    (item) =>
      new Date(item.trip.startDate) < Date.now() &&
      item.book.idUser === userId &&
      !item.book.canceled
  );
  const canceled = books.filter(
    (item) => item.book.canceled && item.book.idUser === userId
  );
  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/user/${userId}`)
      .then(function (response) {
        return response.data;
      })
      .then(function (data) {
        const items = data;
        setCustomer(items);
      });
    //loadUserDetail();
    // dispatch(getAll());
  }, []);

  /*   const loadUserDetail = () => {
      const { userId } = props.match.params;
      const payload = {
        params: {
          userId,
        },
      };
      dispatch(getUserDetailById(payload));
    }; */
  const headData = ["hong1", "hong2", "hong3"];
  const renderHead = (item, ind) => <th key={ind}>{item}</th>;

  // if (Object.keys(userDetail).length === 0) {
  //   return null;
  // }
  return (
    //<<<<<<< user-details
    <Layout sidebar>
      <div className="user-detail__wrapper">
        <div className="row1">
          {customer !== "" && (
            <div className="left-panel">
              <div className="image-avatar">
                <img src={userImg} alt="" />
              </div>
              <h4 className="user-fullname">
                {customer.firstName} {customer.lastName}
              </h4>
              <span className="rank" id="">
                Hạng VIP
              </span>

              <div className="important-info">
                <div className="phone-number" id="phoneId">
                  <i class="bx bx-phone"></i>
                  <span>{customer.contactNumber}</span>
                </div>
                <div className="email" id="emailId">
                  <i class="far fa-envelope"></i>
                  <span>{customer.email}</span>
                </div>
              </div>
              <div className="status_card">
                <StatusCard
                  icon="bx bx-dollar-circle"
                  quantity={
                    (
                      active.reduce((s, i) => (s = s + i.ticket.price), 0) +
                      used.reduce((s, i) => (s = s + i.ticket.price), 0)
                    )
                      .toString()
                      .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.") + "đ"
                  }
                  title="Tổng tiền đã chi"
                />
                <StatusCard
                  icon="bx bx-receipt"
                  quantity={active.length + used.length}
                  title="Số vé đã mua"
                />
              </div>
            </div>
          )}
        </div>

        <div className=" right-panel">
          <h3>Giao dịch gần đây</h3>
          <div className="recent-transaction">
            {active.map((item) => (
              <table>
                <tr>
                  <td>
                    <div className="icon-left bus">
                      <i class=" fas fa-bus"></i>
                    </div>
                  </td>
                  <td>
                    <div className="ticket-booking">
                      <div className="location">
                        <span className="start">
                          {item.route.startLocation}
                        </span>
                        <i class="startend fas fa-caret-right"></i>
                        <span className="end">{item.route.endLocation}</span>
                      </div>
                      <div className="time-booking">
                        {new Date(item.trip.startDate).toLocaleDateString(
                          "vi-VN"
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{item.enterprise.name}</td>
                  <td>
                    <div className="status prepare">Chuẩn bị</div>
                  </td>
                  <td>
                    <div
                      className="btn-detail"
                      onClick={() => {
                        setDetail(item);
                        setUpdatable(true);
                        setOpenBuyingModal(true);
                      }}
                    >
                      <i class="fas fa-info"></i>
                      Chi tiết
                    </div>
                  </td>
                </tr>
              </table>
            ))}
            {used.map((item) => (
              <table>
                <tr>
                  <td>
                    <div className="icon-left bus">
                      <i class=" fas fa-bus"></i>
                    </div>
                  </td>
                  <td>
                    <div className="ticket-booking">
                      <div className="location">
                        <span className="start">
                          {item.route.startLocation}
                        </span>
                        <i class="startend fas fa-caret-right"></i>
                        <span className="end">{item.route.endLocation}</span>
                      </div>
                      <div className="time-booking">
                        {new Date(item.trip.startDate).toLocaleDateString(
                          "vi-VN"
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{item.enterprise.name}</td>
                  <td>
                    <div className="status used">Đã đi</div>
                  </td>
                  <td>
                    <div
                      className="btn-detail"
                      onClick={() => {
                        setDetail(item);
                        setUpdatable(false);
                        setOpenBuyingModal(true);
                      }}
                    >
                      <i class="fas fa-info"></i>
                      Chi tiết
                    </div>
                  </td>
                </tr>
              </table>
            ))}
            {canceled.map((item) => (
              <table>
                <tr>
                  <td>
                    <div className="icon-left bus">
                      <i class=" fas fa-bus"></i>
                    </div>
                  </td>
                  <td>
                    <div className="ticket-booking">
                      <div className="location">
                        <span className="start">
                          {item.route.startLocation}
                        </span>
                        <i class="startend fas fa-caret-right"></i>
                        <span className="end">{item.route.endLocation}</span>
                      </div>
                      <div className="time-booking">
                        {new Date(item.trip.startDate).toLocaleDateString(
                          "vi-VN"
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{item.enterprise.name}</td>
                  <td>
                    <div className="status cancel">Đã huỷ</div>
                  </td>
                  <td>
                    <div
                      className="btn-detail"
                      onClick={() => {
                        setDetail(item);
                        setUpdatable(false);
                        setOpenBuyingModal(true);
                      }}
                    >
                      <i class="fas fa-info"></i>
                      Chi tiết
                    </div>
                  </td>
                </tr>
              </table>
            ))}
          </div>
          <div className="modal__buy-ticket">
            {openBuyingModal === true ? (
              <ModalUpdateTicket
                closeModal={clickCloseBuyingModal}
                info={detail}
                updatable={updatable}
                user={customer.user}
              />
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};
