import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CityAction from "../../actions/city.actions";
import EnterpriseAction from "../../actions/enterprise.actions";
import { Layout } from "../../components/Layout";
import { ListEnterpriseTable } from "../../components/table/ListEnterpriseTable";

/**
 * @author
 * @function Enterprise
 **/

export const Enterprise = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(EnterpriseAction.getAllEnterprises());
    dispatch(CityAction.getAllCities());
  }, []);

  const state_enterprise = useSelector((state) => state.enterprise);
  const state_city = useSelector((state) => state.city);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newEnterprises = state_enterprise.enterprises.filter(
        (enterprise) => {
          return Object.values(enterprise)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
      );
      setSearchResults(newEnterprises);
    } else {
      setSearchResults(state_enterprise.enterprises);
    }
  };

  return (
    <Layout sidebar>
      <ListEnterpriseTable
        listEnterprise={
          searchTerm.length < 1 ? state_enterprise.enterprises : searchResults
        }
        listCity={state_city.cities}
        term={searchTerm}
        searchKeyword={searchHandler}
      ></ListEnterpriseTable>
    </Layout>
  );
};
