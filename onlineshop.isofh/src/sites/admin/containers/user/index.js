import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import actionUser from "../../../../action/user";
import SelectSize from "../../components/common/SelectSize";
import Pagination from "../../components/common/Pagination";
import { Link } from 'react-router-dom';
import { DatePicker, Button, Tooltip, Modal, Select  } from "antd";
import moment from "moment";
const { Option } = Select;
const index = (props) => {
    useEffect(() => {
        props.onSearch("", "","",null)
    },[])
    const modalCreateUpdate = (item) => {
        props.updateDate({
          id: item.id,
          name: item.name,
          userName: item.userName,
        });
          window.location.href = "/admin/user/update/" + item.id;
    }
  
    const create = () => {
      props.updateDate({
        id: null,
        name: "",
        userName: "",
      });
      window.location.href = "/admin/user/create-user"
    }
    const onSizeChange = (size) => {
      props.onSizeChange(size);
    };
  
    const onPageChange = (page) => {
      props.gotoPage(page);
    };

    const onDeleteItem = (item) => () => {
      props.onDeleteItem(item);
    };

    function onChange(value) {
      console.log(`selected ${value}`);
      props.onSearch(props.searchUserName,props.searchName,value, props.searchDate);
    }

    return(
        <div className="box-table">
      <div className="head-table">
        <i className="fa fa-align-justify font-icon"></i>
        <strong>Quản lý tài khỏan</strong>
        <div className="card-header-actions">
              <Button
                size="sm"
                className="btn-info btn-brand mr-1 mb-1"
                onClick={ () => create()}
              >
                <i className="fa fa-plus-circle" style={{ marginRight: 8 }}></i>
                <span>Thêm mới</span>
              </Button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col" style={{ width: "5%" }}>
              STT
            </th>
            <th scope="col">Họ và tên</th>
            <th scope="col">Tên tk</th>
            <th scope="col">giới tính</th>
            <th scope="col">Tình trạng</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Người tạo</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                value={props.searchUserName}
                onChange={(e) => {
                  props.onSearch(e.target.value,props.searchName,props.gender, props.searchDate);
                }}
                placeholder="Tìm kiếm tên tk"
              />
            </td>
            <td>
            <input
                value={props.searchName}
                onChange={(e) => {
                  props.onSearch(props.searchUserName,e.target.value,props.gender, props.searchDate);
                }}
                placeholder="Tìm kiếm họ và tên"
              />
            </td>
            <td>
              <Select
                  value={props.searchGender}
                  showSearch
                  placeholder="Giới tính"
                  optionFilterProp="children"
                  onChange={onChange}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="">Tất cả</Option>
                  <Option value={1}>Nam</Option>
                  <Option value={0}>Nữ</Option>
                </Select>
            </td>
            <td></td>
            <td>
              <DatePicker
                value={props.searchDate}
                onChange={(e) => {
                  if(e){
                    props.onSearch(props.userName,props.userName,props.gender, moment(e._d).format("YYYY-MM-DD"));
                  }
                  else{
                    props.onSearch(props.searchTitle, e);
                  }
                }}
                format={"DD/MM/YYYY"} 
                placeholder="Tìm kiếm theo ngày tạo"
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          {props.data && props.data.length > 0 ? (
            props.data.map((s, index) => {
              return (
                <tr key={index}>
                  <td>{(props.page - 1) * props.size + index + 1}</td>
                  <td>{s.user.name}</td>
                  <td>{s.user.username}</td>
                  <td>{s.user.gender ? "Nam" : "Nữ"}</td>
                  <td>
                    {s.user.blocked ? "đã khóa" : "đang hoạt động"}
                  </td>
                  <td style={{textAlign:"center"}}>{moment(s.user.createdDate).format("DD/MM/YYYY")}</td>
                  <td style={{textAlign:"center"}}>{s.user.createBy}</td>
                  <td style={{textAlign:"center"}}>
                    <Tooltip placement="topLeft" title={"Sửa"} style={{paddingRight:"7px",display:'inline-block'}}>
                      <a
                        onClick={() => {
                          modalCreateUpdate(s.user);
                        }}
                      >
                        <img src="/images/icon/edit1.png" alt="" />
                      </a>
                    </Tooltip>

                    <Tooltip placement="topLeft" title={"Xóa"}>
                      <a onClick={onDeleteItem(s.user)}>
                        <img src="/images/icon/delete.png" alt="" />
                      </a>
                    </Tooltip>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8">
                <p>Thông báo! Không tìm thấy tài khoản nào.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="footer">
        <SelectSize value={props.size} selectItem={onSizeChange} />
        <Pagination
          onPageChange={onPageChange}
          page={props.page}
          size={props.size}
          total={props.total}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      </div>
    </div>
    )
}
export default connect(
    (state) => {
        return{
            name: state.user.name,
            data: state.user.data || [],
            page: state.user.page || 1,
            size: state.user.size || 10,
            total: state.user.total || 0,
            searchGender: state.user.searchGender,
            searchUserName: state.user.searchUserName,
            searchName: state.user.searchName,
            searchDate: state.user.searchDate && state.user.searchDate !== -1 ? moment( state.user.searchDate).format("yyyy/MM/dd") : null,
        }
    },
    {
        onSearch: actionUser.onSearch,
        loadListUser: actionUser.loadListUser,
        updateDate: actionUser.updateData,
        gotoPage: actionUser.gotoPage,
        onSizeChange: actionUser.onSizeChange,
        onDeleteItem: actionUser.onDeleteItem,
    }
)(index);