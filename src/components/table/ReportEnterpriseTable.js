import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TicketAction from "../../actions/ticket.actions";
import { Table } from "./Table";

/**
 * @author
 * @function ReportEnterpriseTable
 **/

export const ReportEnterpriseTable = (props) => {
  const p_month = props.month;
  const p_year = props.year;
  const dispatch = useDispatch();
  useEffect(() => {
    const form = { month: p_month, year: p_year };
    dispatch(TicketAction.getReport(form));
  }, [p_month, p_year]);
  const state_report = useSelector((state) => state.ticketR.report);

  const header = {
    header: ["Số thứ tự", "Hãng tàu", "Số vé đặt", "Doanh thu"],
    body: [],
  };
  const renderReport = () => {
    let list = [];
    let count = 1;

    for (const d of state_report) {
      list.push(
        <tr>
          <td>{count}</td>
          <td>{d._id}</td>
          <td>{d.totalTicket}</td>
          <td>{d.totalSale}</td>
        </tr>
      );
      count += 1;
    }

    return list;
  };

  const renderOrderHead = (item, ind) => <th key={ind}>{item}</th>;
  return (
    <div className="enterprise right-content-fixsize">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h2>Báo cáo hãng tàu</h2>
              <h2 style={{ marginLeft: 30 }}>Tháng {p_month}</h2>
              <h2 style={{ marginLeft: 15 }}>Năm {p_year}</h2>
            </div>
            <div className="card__body">
              <Table
                headData={header.header}
                renderHead={(item, ind) => renderOrderHead(item, ind)}
                render2Body={() => renderReport()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
