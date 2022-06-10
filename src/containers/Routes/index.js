/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CityAction from "../../actions/city.actions";
import EnterpriseAction from "../../actions/enterprise.actions";
import RouteAction from "../../actions/route.actions";

import { Layout } from "../../components/Layout";

import { ListRouteTable } from "../../components/table/ListRouteTable";

/**
 * @author
 * @function Routes
 **/

export const Routes = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(RouteAction.getAllRoutes());
    dispatch(EnterpriseAction.getAllEnterprises());
    dispatch(CityAction.getAllCities());
  }, []);

  const state_route = useSelector((state) => state.route);
  const state_enterprise = useSelector((state) => state.enterprise);
  const state_city = useSelector((state) => state.city);
  const [searchTermR, setSearchTermR] = useState("");
  const [searchResultsR, setSearchResultsR] = useState([]);

  const searchHandlerR = (searchTermR) => {
    setSearchTermR(searchTermR);
    if (searchTermR !== "") {
      const newRoutes = state_route.routes.filter((route) => {
        return Object.values(route)
          .join(" ")
          .toLowerCase()
          .includes(searchTermR.toLowerCase());
      });
      setSearchResultsR(newRoutes);
    } else {
      setSearchResultsR(state_route.routes);
    }
  };

  if (
    Object.keys(state_route).length === 0 ||
    Object.keys(state_enterprise).length === 0 ||
    Object.keys(state_city).length === 0
  ) {
    return null;
  }

  return (
    <Layout sidebar>
      <ListRouteTable
        listRoute={searchTermR.length < 1 ? state_route.routes : searchResultsR}
        listEnterprise={state_enterprise}
        listCity={state_city}
        type="Main"
        term={searchTermR}
        searchKeyword={searchHandlerR}
      ></ListRouteTable>
    </Layout>
  );
};
