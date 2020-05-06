import React, { Component, useState, useEffect } from 'react'
import { Select, Button, DatePicker, Form, Input, Tooltip, Modal } from "antd";
import moment from 'moment'
import ModelNews from './create-update'
import {
  Alert
} from 'reactstrap'
import IconButton from '@material-ui/core/IconButton'
import { connect } from 'react-redux'
import actionNews from "../../../../action/news";

function News( props ){
  const [modalAction, setModalAction] = useState(false)
  const [Id, setId] = useState(null)

  useEffect(() => {
    props.loadListNews();
    console.log(props.loadListNews())
    // props.onSearch("");
  }, []);

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
    props.updateDate({
      id: null,
      title: ''
    })
  }

  const onDeleteItem = (item) => {
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
          {props.data && props.data.length > 0 ? (
            props.data.map((s, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{s.news.title}</td>
                  <td>{s.news.link}</td>
                  <td>
                    <img src={s.news.image} />
                  </td>
                  <td>{moment(s.news.createdDate).format('DD-MM-YYYY')}</td>
                  <td>{s.news.createdUser}</td>
                  <td>
                    <Tooltip title='Sửa'>
                      <IconButton
                        onClick={
                          () => {
                            showModalAction(s.news)
                          }
                        }
                        color='primary'
                        className='btn'
                        aria-label='EditIcon'
                      >
                        <img src='/images/icon/edit1.png' alt='' />
                      </IconButton>
                    </Tooltip>
                      <Tooltip placement="topLeft" title={"Xóa"}>
                        <IconButton>
                          <a
                            onClick={() => onDeleteItem(s.news)}
                          >
                            <img src='/images/icon/delete.png' alt='' />
                          </a>
                        </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan='7'>
                <Alert color='danger'>
                  Thông báo! Không tìm thấy tin tức nào.
                </Alert>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {modalAction && (
        <ModelNews ID = {Id} callBack={closeModal.bind(this)} />
      )}
    </div>
  )
}
export default connect(
  state => {
  return {
      data: state.news.news
    }
  },
  {
    onSearch: actionNews.onSearch,
    loadListNews: actionNews.loadListNews,
    updateDate: actionNews.updateData,
    onDeleteItem: actionNews.onDeleteItem
  }
)(News);
