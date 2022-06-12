import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../components/Layout";
import { ListRouteTable } from "../../components/table/ListRouteTable";
import { ListSteersmanTable } from "../../components/table/ListSteersmanTable";
import { ListVehicleTable } from "../../components/table/ListVehicleTable";

import busImg from "../../asset/img/bus.png";
import CityAction from "../../actions/city.actions";
import EnterpriseAction from "../../actions/enterprise.actions";
import { useParams } from "react-router-dom";

/**
 * @author
 * @function EnterpriseDetails
 **/

export const EnterpriseDetails = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    loadEnterpriseDetails();
    dispatch(EnterpriseAction.getAllEnterprises());
    dispatch(CityAction.getAllCities());
  }, []);

  const { enterpriseId } = useParams();
  const loadEnterpriseDetails = () => {
    // const { enterpriseId } = props.match.params;
    const payload = {
      params: {
        enterpriseId,
      },
    };
    dispatch(EnterpriseAction.getEnterpriseDetailsById(payload));
  };

  const state_enterprise = useSelector((state) => state.enterprise);

  const state_city = useSelector((state) => state.city);

  const [searchTermR, setSearchTermR] = useState("");
  const [searchResultsR, setSearchResultsR] = useState([]);
  const [searchTermV, setSearchTermV] = useState("");
  const [searchResultsV, setSearchResultsV] = useState([]);
  const [searchTermS, setSearchTermS] = useState("");
  const [searchResultsS, setSearchResultsS] = useState([]);

  const enterpriseDetails = useSelector(
    (state) => state.enterprise.enterpriseDetails
  );

  if (Object.keys(enterpriseDetails).length === 0) {
    return null;
  }

  const searchHandlerR = (searchTermR) => {
    setSearchTermR(searchTermR);
    if (searchTermR !== "") {
      const newRoutes = enterpriseDetails.routes.filter((route) => {
        return Object.values(route)
          .join(" ")
          .toLowerCase()
          .includes(searchTermR.toLowerCase());
      });
      setSearchResultsR(newRoutes);
    } else {
      setSearchResultsR(enterpriseDetails.routes);
    }
  };

  const searchHandlerV = (searchTermV) => {
    setSearchTermV(searchTermV);
    if (searchTermV !== "") {
      const newVehicles = enterpriseDetails.vehicles.filter((vehicle) => {
        return Object.values(vehicle)
          .join(" ")
          .toLowerCase()
          .includes(searchTermV.toLowerCase());
      });
      setSearchResultsV(newVehicles);
    } else {
      setSearchResultsV(enterpriseDetails.vehicles);
    }
  };
  const searchHandlerS = (searchTermS) => {
    setSearchTermS(searchTermS);
    if (searchTermS !== "") {
      const newSteersmans = enterpriseDetails.steersmans.filter((steersman) => {
        return Object.values(steersman)
          .join(" ")
          .toLowerCase()
          .includes(searchTermS.toLowerCase());
      });
      setSearchResultsS(newSteersmans);
    } else {
      setSearchResultsS(enterpriseDetails.steersmans);
    }
  };
  return (
    <Layout sidebar>
      <div className="enterprise-info">
        <div className="image">
          <img src={busImg} alt="" />
        </div>
        <div className="info">
          <h1>Hãng tàu {enterpriseDetails.enterprise.name}</h1>
          <p>Địa chỉ: {enterpriseDetails.enterprise.address}</p>
          <p>Hotline: {enterpriseDetails.enterprise.hotline}</p>
        </div>
      </div>
      {/* <Button
        onClick={() => {
        }}
      >
        Clickme
      </Button> */}

      <ListRouteTable
        listRoute={
          searchTermR.length < 1 ? enterpriseDetails.routes : searchResultsR
        }
        listEnterprise={state_enterprise}
        listCity={state_city}
        type="Other"
        reLoadEnterpriseDetails={loadEnterpriseDetails}
        term={searchTermR}
        searchKeyword={searchHandlerR}
      ></ListRouteTable>

      <ListVehicleTable
        listVehicle={
          searchTermV.length < 1 ? enterpriseDetails.vehicles : searchResultsV
        }
        listEnterprise={state_enterprise}
        nameEnterprise={enterpriseDetails.enterprise.name}
        idEnterprise={enterpriseDetails.enterprise._id}
        type="Other"
        reLoadEnterpriseDetails={loadEnterpriseDetails}
        term={searchTermV}
        searchKeyword={searchHandlerV}
      ></ListVehicleTable>

      <ListSteersmanTable
        idEnterprise={enterpriseDetails.enterprise._id}
        listSteersman={
          searchTermS.length < 1 ? enterpriseDetails.steersmans : searchResultsS
        }
        listVehicle={enterpriseDetails.vehicles}
        type="Other"
        reLoadEnterpriseDetails={loadEnterpriseDetails}
        term={searchTermS}
        searchKeyword={searchHandlerS}
      ></ListSteersmanTable>
    </Layout>
  );
};
