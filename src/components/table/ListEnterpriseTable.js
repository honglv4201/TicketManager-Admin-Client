import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Table } from "./Table";
import { InputTitleLeft } from "../UI/inputTitleLeft/InputTitleLeft";
import { SelectBox } from "../UI/select/SelectBox";
import EnterpriseAction from "../../actions/enterprise.actions";

/**
 * @author
 * @function ListEnterpriseTable
 **/

export const ListEnterpriseTable = (props) => {
  const dispatch = useDispatch();
  const inputEl = useRef("");
  const listEnterprise = props.listEnterprise;
  const listCity = props.listCity;
  const term = props.term;

  const initEnterprise = () => {
    return {
      _id: "",
      name: "",
      address: "",
      isDeleted: "no",
      hotline: "",
    };
  };
  const [enterprise, setEnterprise] = useState(initEnterprise);

  const [modalShow, setModalShow] = useState(false);
  const [modalFlag, setModalFlag] = useState("Add");
  const [modalTitle, setModalTitle] = useState();
  const [editData, setEditData] = useState(false);

  //const [searchTerm, setSearchTerm] = useState("");

  const checkEditData = (targetValue, object) => {
    if (enterprise.name && enterprise.address && enterprise.hotline) {
      setEditData(true);
    } else {
      setEditData(false);
    }
  };

  const handleModalShow = (iFlag, enterprise = []) => {
    if (iFlag === "Add") {
      setModalFlag("Add");
      setModalTitle("Thêm hãng tàu");
    } else {
      setModalFlag("Edit");
      setModalTitle("Sửa hãng tàu");
      setEnterprise(enterprise);
    }
    setModalShow(true);
  };
  const handleModalSave = () => {
    const form = enterprise;
    if (modalFlag === "Add") {
      delete form._id;

      dispatch(EnterpriseAction.addEnterprise(form));

      swal({
        title: "Thêm thành công",
        text: "Bạn đã thêm hãng tàu thành công",
        icon: "success",
        button: "OK",
      });
    } else {
      dispatch(EnterpriseAction.editEnterprise(form));
      swal({
        title: "Sửa thành công",
        text: "Bạn đã sửa hãng tàu thành công",
        icon: "success",
        button: "OK",
      });
    }
    setEnterprise(initEnterprise);
    setModalShow(false);
    resetCss();
  };
  const handleModalClose = () => {
    setEnterprise(initEnterprise);
    setModalShow(false);
    resetCss();
  };

  //front end
  const resetCss = () => {
    setEditData(false);
  };
  const delEnterprise = (selectedEnt) => {
    var form = selectedEnt;
    swal({
      title: "Bạn chắc chắn xóa",
      text: "Bạn có chắc sẽ xóa hãng tàu này không",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Hãng tàu đã được xóa thành công!", {
          icon: "success",
        });
        form.isDeleted = "yes";
        dispatch(EnterpriseAction.editEnterprise(form));
      } else {
        swal("Hãng tàu vẫn chưa bị xóa!");
      }
    });
  };

  const enterprises = {
    header: ["Hãng tàu", "Địa chỉ", "Hotline", "Tùy chọn"],
    body: [],
  };
  const renderOrderHead = (item, ind) => <th key={ind}>{item}</th>;

  const renderEnterprises = (enterprises) => {
    let myEnterprises = [];
    for (let enterprise of enterprises) {
      if (enterprise.isDeleted === "no") {
        myEnterprises.push(
          <tr>
            <td>{enterprise.name}</td>
            <td>{enterprise.address}</td>
            <td>{enterprise.hotline}</td>
            <td>
              <button
                className="edit"
                color="warning"
                onClick={() => {
                  handleModalShow("Edit", enterprise);
                }}
              >
                <i class="far fa-edit"></i>
              </button>
              <button
                className="delete"
                color="danger"
                onClick={() => delEnterprise(enterprise)}
              >
                <i class="far fa-trash-alt"></i>
              </button>
              <Link to={`/enterprises/${enterprise._id}`}>
                <button className="detail" onClick={() => {}}>
                  Chi tiết
                </button>
              </Link>
            </td>
          </tr>
        );
      }
    }
    return myEnterprises;
  };

  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
  };

  return (
    <div className="enterprise right-content-fixsize">
      <div
        className={
          modalShow ? "add-modal__wrapper active" : "add-modal__wrapper"
        }
      >
        <div className={modalShow ? "add-modal active" : "add-modal"}>
          <div className="add-modal__header">{modalTitle}</div>

          <div className="add-modal__body">
            <div className="input-enterprise-name">
              <InputTitleLeft
                title="Tên hãng tàu"
                value={enterprise.name}
                placeholder={``}
                onChange={(e) => {
                  setEnterprise({ ...enterprise, name: e.target.value });
                  checkEditData();
                }}
              />

              <SelectBox
                value={enterprise.address}
                onChange={(e) => {
                  setEnterprise({ ...enterprise, address: e.target.value });
                  checkEditData();
                }}
                list={listCity}
                type="LocationSelect"
                title="Địa chỉ"
              />

              <InputTitleLeft
                title="Hotline"
                value={enterprise.hotline}
                placeholder={``}
                onChange={(e) => {
                  setEnterprise({ ...enterprise, hotline: e.target.value });
                  checkEditData();
                }}
              />
            </div>
          </div>

          <div className="add-modal__footer">
            <button className="btn-cancel" onClick={handleModalClose}>
              {" "}
              Hủy bỏ
            </button>
            <button
              className="btn-save"
              disabled={!editData}
              onClick={handleModalSave}
            >
              {" "}
              Lưu lại
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>Quản lý hãng tàu</h3>
              <button
                className="add-enterprise"
                onClick={() => {
                  handleModalShow("Add");
                }}
              >
                Thêm hãng tàu
              </button>
              <div className="ui-search">
                <input
                  ref={inputEl}
                  type="text"
                  placeholder="Tìm kiếm"
                  className="prompt"
                  value={term}
                  onChange={getSearchTerm}
                />
              </div>
            </div>

            <div className="card__body">
              <Table
                headData={enterprises.header}
                renderHead={(item, ind) => renderOrderHead(item, ind)}
                render2Body={() =>
                  renderEnterprises(listEnterprise).length > 0 ? (
                    renderEnterprises(listEnterprise)
                  ) : (
                    <span className="no-result">Không tìm thấy kết quả</span>
                  )
                }
              />
            </div>
            <div className="card__footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
