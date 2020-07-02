import React, { Component, useState, useEffect } from "react";
import moment from "moment";
import ModelNews from "./create-update";
import SelectSize from "../../components/common/SelectSize";
import Pagination from "../../components/common/Pagination";
import { connect } from "react-redux";
import actionNews from "../../../../action/news";
import { Link } from 'react-router-dom';
import { DatePicker, Button, Tooltip, Modal } from "antd";
import "antd/dist/antd.css";
function News(props) {
  const [modalAction, setModalAction] = useState(false);
  const [count, setCount] = useState(1);
  
  useEffect(() => {
    props.onSearch("", null);
    console.log("value count is 1: " + count)
  }, []);
  useEffect(() => {
    console.log("value count is 3: " + count)
  },[count])
  const tang = () => {
    setCount(count + 1)
  }
  const giam = () => {
    setCount(count - 1)
  }
  const onSizeChange = (size) => {
    props.onSizeChange(size);
  };

  const onPageChange = (page) => {
    props.gotoPage(page);
  };

  // const showModalAction = (item) => {
  //   if (item) {
  //     setModalAction(true);
  //     props.updateDate({
  //       id: item.id,
  //       title: item.title,
  //       image: item.image,
  //     });
  //   } else {
  //     setModalAction(true);
  //     props.updateDate({
  //       id: null,
  //       title: "",
  //       image: "",
  //     });
  //   }
  // };


  const modalCreateUpdate = (item) => {
      props.updateDate({
        id: item.id,
        title: item.title,
        image: item.image,
      });
        window.location.href = "/admin/news/update/" + item.id;
  }

  const create = () => {
    props.updateDate({
      id: null,
      title: "",
      image: "",
    });
    window.location.href = "/admin/news/create-news"
  }


  // const closeModal = () => {
  //   setModalAction(false);
  //   props.updateDate({
  //     id: null,
  //     title: "",
  //     image: "",
  //   });
  // };
  const onDeleteItem = (item) => () => {
    props.onDeleteItem(item);
  };

  return (
    <div className="box-table">
      {/* <div>
        <Button onClick={() => tang()}>
          tăng
        </Button>
             <span>{count}</span>
        <Button onClick={() => giam()}>
          giảm
        </Button>
      </div> */}
      <div className="head-table">
        <i className="fa fa-align-justify font-icon"></i>
        <strong>Quản lý tin tức</strong>
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
            <th scope="col">Tiêu đề</th>
            <th scope="col">link</th>
            <th scope="col">ảnh</th>
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
                value={props.searchTitle}
                onChange={(e) => {
                  props.onSearch(e.target.value, props.searchDate);
                }}
                placeholder="Tìm kiếm theo tiêu đề"
              />
            </td>
            <td></td>
            <td></td>
            <td>
              <DatePicker
                // value={props.searchDate}
                onChange={(e) => {
                  if(e){
                    props.onSearch(props.searchTitle, e._d);
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
                  <td>{s.news.title}</td>
                  <td>{s.news.link}</td>
                  <td>
                    <img
                      style={{ maxWidth: "120px" }}
                      src={s.news.image ? s.news.image.absoluteUrl() : null}
                    />
                  </td>
                  <td style={{textAlign:"center"}}>{moment(s.news.createdDate).format("DD/MM/YYYY")}</td>
                  <td style={{textAlign:"center"}}>{s.news.createdUser}</td>
                  <td style={{textAlign:"center"}}>
                    <Tooltip placement="topLeft" title={"Sửa"} style={{paddingRight:"7px",display:'inline-block'}}>
                      <a
                        onClick={() => {
                          modalCreateUpdate(s.news);
                        }}
                      >
                        <img src="/images/icon/edit1.png" alt="" />
                      </a>
                    </Tooltip>

                    <Tooltip placement="topLeft" title={"Xóa"}>
                      <a onClick={onDeleteItem(s.news)}>
                        <img src="/images/icon/delete.png" alt="" />
                      </a>
                    </Tooltip>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">
                <p>Thông báo! Không tìm thấy tin tức nào.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* {modalAction && (
        <ModelNews
          visible={modalAction}
          callBack={closeModal.bind(this)}
        />
      )} */}

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
  );
}
export default connect(
  (state) => {
    return {
      data: state.news.data || [],
      title: state.news.searchTitle,
      searchTitle: state.news.searchTitle,
      searchDate: state.news.searchDate && state.news.searchDate !== -1 ? moment( state.news.searchDate).format("yyyy/MM/dd") : null,
      page: state.news.page || 1,
      size: state.news.size || 10,
      total: state.news.total || 0,
    };
  },
  {
    onSearch: actionNews.onSearch,
    loadListNews: actionNews.loadListNews,
    updateDate: actionNews.updateData,
    gotoPage: actionNews.gotoPage,
    onSizeChange: actionNews.onSizeChange,
    onDeleteItem: actionNews.onDeleteItem,
  }
)(News);
