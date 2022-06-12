import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { Home } from "./containers/Home";
import { Signin } from "./containers/Signin";
import { Signup } from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import { Routes as WayRouters } from "./containers/Routes";
import { Enterprise } from "./containers/Enterprise";

import { Analytics } from "./containers/Analytics";

import { DashBoard } from "./pages/Dashboard";
import { UserBooking } from "./pages/UserBooking";
import { Customer } from "./pages/Customers";

import "./asset/css/main.css";
import { EnterpriseDetails } from "./containers/EnterpriseDetails";
import { RouteDetails } from "./containers/RouteDetails";
import { User } from "./containers/User";
import { TripDetails } from "./containers/TripDetails";
import { UserDetail } from "./components/customer/UserDetail";

import { Rules } from "./pages/Rules";

import { AdminBooking } from "./pages/adminbooking/AdminBooking";
import { UserDetails } from "./containers/UserDetails";
import { OfflineTicket } from "./containers/OfflineTicket";
import PropTypes from "prop-types";

const AppRoute = () => {
  let routes = useRoutes([
    { path: "/enterprises", element: <Enterprise /> },
    { path: "/signin", element: <Signin /> },
    { path: "/booking", element: <AdminBooking /> },
    { path: "/home", element: <Home /> },
    {
      path: "/enterprises/:enterpriseId/informations/:routeId/routeinfo",
      element: <RouteDetails />,
    },
    {
      path: "/enterprises/:enterpriseId",
      element: <EnterpriseDetails />,
    },
    { path: "/user/:userId", element: <UserDetails /> },
    { path: "/user/:userId/userdetail", element: <UserDetails /> },
    { path: "/routes/:routeId", element: <RouteDetails /> },
    { path: "/trips/:tripId", element: <TripDetails /> },
    { path: "/trips/:tripId/tickets", element: <OfflineTicket /> },
    { path: "/routes", element: <WayRouters /> },
    { path: "/enterprises", element: <Enterprise /> },
    { path: "/analytics", element: <Analytics /> },
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    { path: "/user", element: <User /> },
    { path: "/settings", element: <Rules /> },
    { path: "/", element: <DashBoard /> },
    { path: "/dashBoard", element: <DashBoard /> },
    { path: "/userBooking", element: <UserBooking /> },
    { path: "/customers", element: <Customer /> },
    { path: "/booking", element: <AdminBooking /> },
  ]);

  return routes;
};

const App = (props) => {
  return (
    <Router>
      <AppRoute />
    </Router>
  );
};

export default App;
