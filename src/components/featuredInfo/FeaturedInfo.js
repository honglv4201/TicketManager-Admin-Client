import "../featuredInfo/featuredInfo.css";
import React from "react";
import PropTypes from "prop-types";

const FeaturedInfo = (props) => {
  const { ticket, canceledTicket, sale, newUser } = props;

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Vé bán</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney" id="ticketId">
            {ticket}{" "}
          </span>
          <span className="featuredMoneyRate">
            {/* -200 <ArrowDownward className="featuredIcon negative" /> */}
            {/* <i class="fas fa-chevron-left"></i> */}
          </span>
        </div>
        {/* {<span className="featuredSub">Compared to last month</span>} */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Vé hủy</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney" id="saleId">
            {canceledTicket}{" "}
          </span>
          <span className="featuredMoneyRate">
            {/* +11,4 <ArrowUpward className="featuredIcon" /> */}
            {/* <i class="fas fa-chevron-right"></i> */}
          </span>
        </div>
        {/*<span className="featuredSub">Compared to last month</span>*/}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Doanh thu</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney money" id="saleId">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(sale)}{" "}
          </span>
          <span className="featuredMoneyRate">
            {/* +11,4 <ArrowUpward className="featuredIcon" /> */}
            {/* <i class="fas fa-chevron-right"></i> */}
          </span>
        </div>
        {/*<span className="featuredSub">Compared to last month</span>*/}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Người dùng mới</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney" id="saleId">
            {newUser}{" "}
          </span>
          <span className="featuredMoneyRate">
            {/* +11,4 <ArrowUpward className="featuredIcon" /> */}
            {/* <i class="fas fa-chevron-right"></i> */}
          </span>
        </div>
        {/*<span className="featuredSub">Compared to last month</span>*/}
      </div>
    </div>
  );
};

FeaturedInfo.propTypes = {
  ticket: PropTypes.any,
  sale: PropTypes.any,
  canceledTicket: PropTypes.any,
  newUser: PropTypes.any,
};

export default FeaturedInfo;
