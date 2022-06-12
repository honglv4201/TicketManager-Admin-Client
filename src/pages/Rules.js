import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import "./rule.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import avatarImg from "../asset/img/user.jpg";
import { ReportEnterpriseTable } from "../components/table/ReportEnterpriseTable";
import AuthAction from "../actions/auth.actions";
import TripAction from "../actions/trip.actions";
import wagonTicketAction from "../actions/wagonTicket.action";
export const Rules = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(AuthAction.signout());
  };

  const [rules, setRules] = useState({
    book: 0,
    cancel: 0,
    max: 0,
    coefficientNK4DH: 0,
    coefficientNK6DH: 0,
    coefficientNMDH: 0,
  });

  const [changeState, setChangeState] = useState(false);

  const listTrip = useSelector((state) => state.trip.trips);

  const updateWagonTicket = (_id, fixed_price) => {
    dispatch(wagonTicketAction.editWagonTicket({ _id, fixed_price }));
  };

  const handleSubmitChangeRegulation = () => {
    axios.put(`http://localhost:2000/api/rule/629f47b2ad18e2f9b52514dd`, rules);
    for (let t of listTrip) {
      updateWagonTicket(t._id, t.fixed_price);
    }
    alert("Lưu thành công");
    setChangeState(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRules({
      ...rules,
      [name]: value,
    });
    setChangeState(true);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/rule`)
      .then(function (response) {
        return response.data;
      })
      .then(function (data) {
        const items = data;
        setRules({
          book: items[0].book,
          cancel: items[0].cancel,
          max: items[0].max,
          coefficientNK4DH: items[0].coefficientNK4DH,
          coefficientNK6DH: items[0].coefficientNK6DH,
          coefficientNMDH: items[0].coefficientNMDH,
        });
      });
    dispatch(TripAction.getAllTrip());
  }, []);

  return (
    <Layout sidebar>
      <div className="container rulepage">
        <h1 className="head-title">Cài đặt</h1>
        {/* <div className="leftBox">
        
          <input
            type="number"
            name="book"
            value={rules.book}
            onChange={handleChange}
            min="1"
          />
          <input
            type="number"
            name="cancel"
            value={rules.cancel}
            onChange={handleChange}
            min="1"
          />
          <input
            type="number"
            name="max"
            value={rules.max}
            onChange={handleChange}
            min="1"
          />
          <button
            type="submit"
            className="button"
            name="button"
            onClick={() => {
              axios.put(
                `http://localhost:2000/api/rule/61aeb8a2d82d65187dbf7c6b`,
                rules
              );
              alert("Lưu thành công");
            }}
          >
            Lưu thay đổi
          </button>
        </div>
        <div className="rightBox">
          <div className="social">
            <button className="socialin label">
              Thời gian chậm nhất đặt vé
            </button>
            <button className="socialin label">
              Thời gian chậm nhất huỷ vé
            </button>
            <button className="socialin label">
              Số lượng vé tối đa được đặt
            </button>
          </div>
        </div> */}
        <div className="account">
          <h2 className="session-title">Tài khoản </h2>
          <div className="account___wrapper">
            <div className="image-avatar">
              <img src={avatarImg} alt="" />
            </div>
            <div className="account__option">
              <div className="account-name">
                {JSON.parse(localStorage.getItem("user")).fullName}
              </div>
              <span className="txt-notyou">Không phải bạn?</span>
              <a href="/" className="change-account" onClick={logout}>
                Đăng xuất
              </a>
            </div>
          </div>
        </div>
        <div className="regulation">
          <h2 className="session-title">Quy định</h2>
          <div className="session-row">
            <span className="title">Thời gian chậm nhất đặt vé</span>
            <input
              type="number"
              name="book"
              value={rules.book}
              onChange={handleChange}
              min="1"
            />
          </div>
          <div className="session-row">
            <span className="title"> Thời gian chậm nhất huỷ vé</span>
            <input
              type="number"
              name="cancel"
              value={rules.cancel}
              onChange={handleChange}
              min="1"
            />
          </div>
          <div className="session-row">
            <span className="title"> Số lượng vé tối đa được đặt</span>
            <input
              type="number"
              name="max"
              value={rules.max}
              onChange={handleChange}
              min="1"
            />
          </div>
          <div className="session-row">
            <span className="title"> Hệ số khoang Ngồi mềm điều hòa</span>
            <input
              type="number"
              name="coefficientNMDH"
              value={rules.coefficientNMDH}
              onChange={handleChange}
              min="1"
            />
          </div>
          <div className="session-row">
            <span className="title"> Hệ số khoang Nằm 4 điều hòa</span>
            <input
              type="number"
              name="coefficientNK4DH"
              value={rules.coefficientNK4DH}
              onChange={handleChange}
              min="1"
            />
          </div>
          <div className="session-row">
            <span className="title"> Hệ số khoang Nằm 6 điều hòa</span>
            <input
              type="number"
              name="coefficientNK6DH"
              value={rules.coefficientNK6DH}
              onChange={handleChange}
              min="1"
            />
          </div>
          <button
            type="submit"
            className={changeState === true ? "button active" : "button"}
            name="button"
            onClick={changeState === true ? handleSubmitChangeRegulation : null}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </Layout>
  );
};
