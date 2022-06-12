import React from "react";
import { Layout } from "../components/Layout";
import statusCards from "../asset/JsonData/status-card-data.json";
import cus from "../asset/JsonData/customers-list.json";
import { StatusCard } from "../components/statusCard/StatusCard";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Chart from "react-apexcharts";
import { Table } from "../components/table/Table";
import { Navigate } from "react-router-dom";
import AnalyticsAction from "../actions/analytics.actions";
/**
 * @author
 * @function DashBoard
 **/

export const DashBoard = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AnalyticsAction.getCurrentDate());
    dispatch(AnalyticsAction.getCurrentByEnterprises());
    dispatch(AnalyticsAction.getCurrentByEnterprisesList());
    dispatch(AnalyticsAction.getAllName());
    dispatch(AnalyticsAction.getLastOrderByDay());
  }, []);

  const currentDate = useSelector((state) => state.currentDate);
  const chartByEnterprise = useSelector((state) => state.chartByEnterprise);
  const listByEnterprise = useSelector((state) => state.listByEnterprise);
  const listNameEnterprise = useSelector((state) => state.listNameEnterprise);
  const listLastOrder = useSelector((state) => state.listLastOrder);
  const auth = useSelector((state) => state.auth);

  const chartOptions = {
    series: [
      {
        type: "line",
        name: "Doanh thu",
        data: chartByEnterprise.sale,
      },
      {
        type: "column",
        name: "Vé bán",
        data: chartByEnterprise.booking,
      },
    ],
    options: {
      color: ["#6ab04c", "#2980b9"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enable: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: listNameEnterprise.listName,
      },
      legent: {
        position: "left",
      },
      grid: {
        show: false,
      },
      yaxis: [
        {
          title: {
            text: "Doanh thu",
          },
        },
        {
          opposite: true,
          title: {
            text: "Vé bán",
          },
        },
      ],
      title: {
        text: "Thống kê vé bán và doanh thu",
        align: "left",
      },
    },
  };

  const topEnterPrises = {
    head: ["Hãng tàu", "Vé bán", "Doanh thu"],
    body: listByEnterprise.listEnterprises,
  };

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

  const renderHead = (item, ind) => <th key={ind}>{item}</th>;

  const renderBody = (item, ind) => (
    <tr key={ind}>
      <td>{item.username}</td>
      <td>{item.order}</td>
      <td>{item.price}</td>
    </tr>
  );

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

  if (Object.keys(currentDate).length === 0) {
    return null;
  }
  if (currentDate.currentDateData === null) {
    return null;
  }

  if (!localStorage.getItem("token")) {
    return <Navigate to={`/signin`} />;
  }

  return (
    <div>
      <Layout sidebar dashboard="true">
        <h2 className="page-header">Dashboard</h2>

        <div className="row">
          <div className="col-12">
            <div className="row">
              {currentDate.currentDateData.map((item) => (
                <div className="col-3">
                  <StatusCard
                    icon={item.icon}
                    quantity={item.count}
                    title={item.title}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-7">
            <div className="card full-height">
              <Chart
                options={chartOptions.options}
                series={chartOptions.series}
                height="100%"
              />
            </div>
          </div>

          <div className="col-5">
            <div className="card">
              <div className="card__header">
                <h3>Top hãng tàu</h3>
              </div>
              <div className="card__body">
                <Table
                  headData={topEnterPrises.head}
                  renderHead={(item, ind) => renderHead(item, ind)}
                  bodyData={topEnterPrises.body}
                  renderBody={(item, ind) => renderBody(item, ind)}
                />
              </div>
              <div className="card__footer">
                <a>View all</a>
              </div>
            </div>
          </div>

          <div className="col-12">
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
              <div className="card__footer">
                <a>View all</a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
