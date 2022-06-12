import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserAction from "../../actions/user.actions";
import { UserDetail } from "../../components/customer/UserDetail";
import { Layout } from "../../components/Layout";
import { AdminDetailTable } from "../../components/table/AdminDetailTable";

/**
 * @author
 * @function UserDetails
 **/

export const UserDetails = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    loadUserDetail();
  }, []);

  const { userId } = useParams();
  console.log(userId);
  const loadUserDetail = () => {
    const payload = {
      params: {
        userId,
      },
    };
    dispatch(UserAction.getUserDetailById(payload));
  };
  const state_userDetail = useSelector((state) => state.user.userDetail);
  return (
    <>
      {state_userDetail.role === "admin" ||
      state_userDetail.role === "steersman" ? (
        <Layout sidebar>
          <div className="persional-info-identity">
            <div>Mã nhân viên : {state_userDetail._id}</div>
            <h2>
              Họ tên : {state_userDetail.firstName} {state_userDetail.lastName}
            </h2>
            <div>
              Giới tính :{" "}
              {state_userDetail.profile.gender === "Male" ? "Nam" : "Nữ"}
            </div>
            <div>Số điện thoại: {state_userDetail.contactNumber}</div>
            <div>Email: {state_userDetail.email}</div>
          </div>
          <AdminDetailTable user={state_userDetail}></AdminDetailTable>
        </Layout>
      ) : (
        <UserDetail userDetails={state_userDetail}></UserDetail>
      )}
    </>
  );
};
