import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserAction from "../../actions/user.actions";
import { Layout } from "../../components/Layout";
import { ListUserTable } from "../../components/table/ListUserTable";

/**
 * @author
 * @function User
 **/

export const User = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserAction.getAllUser());
  }, []);

  const state_user = useSelector((state) => state.user);

  if (Object.keys(state_user).length === 0) {
    return null;
  }
  return (
    <Layout sidebar>
      <ListUserTable listUser={state_user.users}></ListUserTable>
    </Layout>
  );
};
