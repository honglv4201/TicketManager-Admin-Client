import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "./Table";

/**
 * @author
 * @function ListUserTable
 **/

export const ListUserTable = (props) => {
  const dispatch = useDispatch();
  const inputEl = useRef("");
  const inputElC = useRef("");
  const inputElS = useRef("");
  const listUser = props.listUser;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTermC, setSearchTermC] = useState("");
  const [searchResultsC, setSearchResultsC] = useState([]);
  const [searchTermS, setSearchTermS] = useState("");
  const [searchResultsS, setSearchResultsS] = useState([]);

  const initUser = () => {
    return {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
    };
  };
  const users = {
    header: ["Họ tên", "Giới tính", "Email", "Số điện thoại", "Tùy chọn"],
    body: [],
  };
  const renderHead = (item, ind) => {
    return <th key={ind}>{item}</th>;
  };
  const renderUsers = (users) => {
    let myUsers = [];
    for (let user of users) {
      myUsers.push(
        <tr>
          <td>
            {user.firstName} {user.lastName}
          </td>
          <td>
            {user.profile[0].gender
              ? user.profile[0].gender === "Male"
                ? "Nam"
                : "Nữ"
              : "Trống"}
          </td>
          <td>{user.email}</td>
          <td>{user.contactNumber}</td>
          <td>
            {/* <button
              className="edit"
              onClick={() => {
                //handleModalShow("Edit", route);
              }}
            >
              Sửa
            </button>
            <button
              className="delete"
              onClick={() => {
                //delRoute(route);
              }}
            >
              Xóa
            </button> */}
            {/* <Link to={`/routes/${route._id}/informations`}>
              <Button type="button" onClick={() => {}}>
                Chi tiết
              </Button>
            </Link> */}

            <Link to={`/user/${user._id}`}>
              <button className="detail" onClick={() => {}}>
                Chi tiết
              </button>
            </Link>
          </td>
        </tr>
      );
    }
    return myUsers;
  };
  if (Object.keys(listUser).length === 0) {
    return (
      <div>
        <h1>Quản lý tài khoản</h1>
      </div>
    );
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newAdmin = listUser.listAdmin.filter((admin) => {
        return Object.values(admin)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newAdmin);
    } else {
      setSearchResults(listUser.listAdmin);
    }
  };

  const getSearchTerm = () => {
    searchHandler(inputEl.current.value);
  };

  const searchHandlerC = (searchTermC) => {
    setSearchTermC(searchTermC);
    if (searchTermC !== "") {
      const newCustomer = listUser.listCustomer.filter((customer) => {
        return Object.values(customer)
          .join(" ")
          .toLowerCase()
          .includes(searchTermC.toLowerCase());
      });
      setSearchResultsC(newCustomer);
    } else {
      setSearchResultsC(listUser.listCustomer);
    }
  };

  const getSearchTermC = () => {
    searchHandlerC(inputElC.current.value);
  };
  const searchHandlerS = (searchTermS) => {
    setSearchTermS(searchTermS);
    if (searchTermS !== "") {
      const newSteersmans = listUser.listSteersman.filter((steersman) => {
        return Object.values(steersman)
          .join(" ")
          .toLowerCase()
          .includes(searchTermS.toLowerCase());
      });
      setSearchResultsS(newSteersmans);
    } else {
      setSearchResultsS(listUser.listSteersman);
    }
  };

  const getSearchTermS = () => {
    searchHandlerS(inputElS.current.value);
  };

  return (
    <React.Fragment>
      <div className="user__main-content right-content-fixsize">
        <h1 className="manager-user__title">Quản lý tài khoản</h1>
        <div className="card">
          <div className="card__header">
            <h3>Danh sách admin</h3>
            {/* <Button
          onClick={() => {
            handleModalShow("Add");
          }}
          >
          Thêm tuyến đường
        </Button> */}{" "}
            <div className="ui-search">
              <input
                ref={inputEl}
                type="text"
                placeholder="Tìm kiếm"
                className="prompt"
                value={searchTerm}
                onChange={getSearchTerm}
              />
            </div>
          </div>

          <div className="card__body">
            <Table
              headData={users.header}
              renderHead={(item, ind) => renderHead(item, ind)}
              render2Body={() =>
                renderUsers(
                  searchTerm.length < 1 ? listUser.listAdmin : searchResults
                ).length > 0
                  ? renderUsers(
                      searchTerm.length < 1 ? listUser.listAdmin : searchResults
                    )
                  : "Không tìm thấy kết quả"
              }
            />
          </div>
          <div className="card__footer"></div>
        </div>

        <div className="card">
          <div className="card__header">
            <h3>Danh sách người dùng</h3>
            {/* <Button
          onClick={() => {
            handleModalShow("Add");
          }}
          >
          Thêm tuyến đường
        </Button> */}
            <div className="ui-search">
              <input
                ref={inputElC}
                type="text"
                placeholder="Tìm kiếm"
                className="prompt"
                value={searchTermC}
                onChange={getSearchTermC}
              />
            </div>
          </div>

          <div className="card__body">
            <Table
              headData={users.header}
              renderHead={(item, ind) => renderHead(item, ind)}
              render2Body={() =>
                renderUsers(
                  searchTermC.length < 1
                    ? listUser.listCustomer
                    : searchResultsC
                ).length > 0
                  ? renderUsers(
                      searchTermC.length < 1
                        ? listUser.listCustomer
                        : searchResultsC
                    )
                  : "Không tìm thấy kết quả"
              }
            />
          </div>
          <div className="card__footer"></div>
        </div>

        <div className="card">
          <div className="card__header">
            <h3>Danh sách tài xế</h3>
            {/* <Button
          onClick={() => {
            handleModalShow("Add");
          }}
          >
          Thêm tuyến đường
        </Button> */}{" "}
            <div className="ui-search">
              <input
                ref={inputElS}
                type="text"
                placeholder="Tìm kiếm"
                className="prompt"
                value={searchTermS}
                onChange={getSearchTermS}
              />
            </div>
          </div>

          <div className="card__body">
            <Table
              headData={users.header}
              renderHead={(item, ind) => renderHead(item, ind)}
              render2Body={() =>
                renderUsers(
                  searchTermS.length < 1
                    ? listUser.listSteersman
                    : searchResultsS
                ).length > 0
                  ? renderUsers(
                      searchTermS.length < 1
                        ? listUser.listSteersman
                        : searchResultsS
                    )
                  : "Không tìm thấy kết quả"
              }
            />
          </div>
          <div className="card__footer"></div>
        </div>
      </div>
    </React.Fragment>
  );
};
