import React from "react";
import { Layout } from "../components/Layout";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../components/table/Table";
import { Navigate } from "react-router-dom";
import AnalyticsAction from "../actions/analytics.actions";
/**
 * @author
 * @function UserBooking
 **/

export const UserBooking = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AnalyticsAction.getLastOrder());
  }, []);

  const listLastOrder = useSelector((state) => state.listLastOrder);

  const latestOrders = {
    header: [
      "STT",
      "Người đặt",
      "Email",
      "Số điện thoại",
      "CCCD/CMND",
      "Số ghế",
      "Tổng tiền",
      "Thanh toán",
      "Trạng thái",
    ],
    body: listLastOrder.listOrder,
  };

  const renderOrderHead = (item, ind) => <th key={ind}>{item}</th>;
  const renderOrderBody = (item, ind) => (
    <tr key={ind}>
      <td>{item.stt}</td>
      <td>{item.fullname}</td>
      <td>{item.email}</td>
      <td>{item.phoneNumber}</td>
      <td>{item.identifyNumber}</td>
      <td>{item.totalTicket}</td>
      <td>{item.totalPrice}</td>
      <td>{item.payment}</td>
      <td>{item.isPay}</td>
    </tr>
  );

  if (!localStorage.getItem("token")) {
    return <Navigate to={`/signin`} />;
  }

  return (
    <div>
      <Layout sidebar dashboard="true">
        <h2 className="page-header">Quản lý người đặt vé</h2>
        <div className="card">
          <div className="card__header">
            <h3>Trạng thái khách hàng</h3>
          </div>
          <div className="card__body">
            <Table
              headData={latestOrders.header}
              renderHead={(item, ind) => renderOrderHead(item, ind)}
              bodyData={latestOrders.body}
              renderBody={(item, ind) => renderOrderBody(item, ind)}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};
