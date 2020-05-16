import React, { Component, useState, useEffect } from 'react'
import moment from 'moment'
import ModelNews from './create-update'
import SelectSize from "../../components/common/SelectSize";
import Pagination from "../../components/common/Pagination";
import { connect } from 'react-redux'
import actionNews from "../../../../action/news";
import { DatePicker,Button ,Tooltip,Modal} from "antd";
import {toast} from'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import newProvider from '../../../../data-access/new-provider'
import 'antd/dist/antd.css';
const { confirm } = Modal;
const { YearPicker } = DatePicker
function News( props ){
  const [modalAction, setModalAction] = useState(false)
  const [Id, setId] = useState(null)

  useEffect(() => {
    props.onSearch("", -1);
  }, []);


  const onSizeChange = size => {
    props.onSizeChange(size);
  };

  const onPageChange = page => {
    props.gotoPage(page);
  };

  const showModalAction = item => {
    if (item) {
      setModalAction(true)
      setId(item.id)
      props.updateDate({
        id: item.id,
        title: item.title
      })
    } else {
      setModalAction(true)
      setId(null)
      props.updateDate({
        id: null,
        title: ''
      })
    }
  }
  const closeModal = () => {
    setModalAction(false)
    setId(null)
    props.updateDate({
      id: null,
      title: ''
    })
  }
  const onDeleteItem = item => () => {
    props.onDeleteItem(item);
  };
  

  return (
    <div className='box-table'>
      <div className='head-table'>
        <i className='fa fa-align-justify font-icon'></i>
        <strong>Quản lý tin tức</strong>
        <div className='card-header-actions'>
          <Button
            size='sm'
            className='btn-info btn-brand mr-1 mb-1'
            onClick={
              () => {
              showModalAction()
            }}
          >
            <i className='fa fa-plus-circle' style={{ marginRight: 8 }}></i>
            <span>Thêm mới</span>
          </Button>
        </div>
      </div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>STT</th>
            <th scope='col'>Tiêu đề</th>
            <th scope='col'>link</th>
            <th scope='col'>ảnh</th>
            <th scope='col'>Ngày tạo</th>
            <th scope='col'>Người tạo</th>
            <th scope='col'>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <YearPicker onChange={ (e,dateString) => {console.log(e); console.log(dateString)}} placeholder='chọn'/>
            </td>
            <td>
              <input
                value={props.searchTitle}
                onChange={(e) => {
                  props.onSearch(e.target.value)
                }}
                placeholder="Tìm kiếm theo tiêu đề"
              />
            </td>
            <td></td>
            <td></td>
            <td></td>
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
                    <img src={s.news.image ? s.news.image.absoluteUrl() : null} />
                  </td>
                  <td>{moment(s.news.createdDate).format('DD-MM-YYYY')}</td>
                  <td>{s.news.createdUser}</td>
                  <td>
                    <Tooltip placement="topLeft" title={"Sửa"}>
                        <a
                           onClick={
                            () => {
                              showModalAction(s.news)
                            }
                          }
                        >
                          <img src='/images/icon/edit1.png' alt='' />
                        </a>
                    </Tooltip>

                    <Tooltip placement="topLeft" title={"Xóa"}>
                        <a
                         onClick={onDeleteItem(s.news)}
                        >
                          <img src='/images/icon/delete.png' alt='' />
                        </a>
                    </Tooltip>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan='7'>
                <p>Thông báo! Không tìm thấy tin tức nào.</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {modalAction && (
        <ModelNews ID = {Id} visible={modalAction} callBack={closeModal.bind(this)} />
      )}

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
  state => {
    debugger
  return {
      data: state.news.data,
      title: state.news.searchTitle,
      searchTitle: state.news.searchTitle,
      page: state.news.page || 1,
      size: state.news.size || 10,
      total: state.news.total || 0,
    }
  },
  {
    onSearch: actionNews.onSearch,
    loadListNews: actionNews.loadListNews,
    updateDate: actionNews.updateData,
    gotoPage : actionNews.gotoPage,
    onSizeChange: actionNews.onSizeChange,
    onDeleteItem: actionNews.onDeleteItem
  }
)(News);
