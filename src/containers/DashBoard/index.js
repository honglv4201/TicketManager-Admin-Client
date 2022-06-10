import React from "react";
import { Layout } from "../../components/Layout";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * @author
 * @function DashBoard
 **/

export const DashBoard = (props) => {
  const auth = useSelector((state) => state.auth);
  if (auth.authenticate) {
    return <Navigate to={`/signin`} />;
  }
  return (
    <div>
      <Layout sidebar dashboard="true"></Layout>
    </div>
  );
};
