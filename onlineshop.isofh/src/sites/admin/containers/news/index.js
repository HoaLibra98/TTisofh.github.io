import React, { Component, useState, useEffect } from 'react'
import newProvider from '../../../../data-access/new-provider'
import Tooltip from '@material-ui/core/Tooltip'
import moment from 'moment'
import ModelNews from './create-update'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Input,
  Alert
} from 'reactstrap'
import IconButton from '@material-ui/core/IconButton'
const News = ({ classes }) => {
  const [state, setState] = useState({
    page: 1,
    size: 10
  })
  const [modalAction, setModalAction] = useState(false)
  const [data, setData] = useState([])
  const [dataCreateUpdate, setDataCreateUpdate] = useState([])
  useEffect(() => {
    loadPage()
  }, [])
  const loadPage = () => {
    let param = {
      page: state.page,
      size: state.size
    }
    newProvider.search(param).then(s => {
      debugger
      if (s && s.code == 0) {
        setData(s.data.data)
      }
    })
  }
  const showModalAction = item => {
    if (item) {
      setModalAction(true)
      setDataCreateUpdate(item)
    } else {
      setModalAction(true)
      setDataCreateUpdate({})
    }
  }
  const closeModal = () => {
    setModalAction(false)
    loadPage()
    setDataCreateUpdate({})
  }
  return (
    <div className='box-table'>
      <div className='head-table'>
        <i className='fa fa-align-justify font-icon'></i>
        <strong>Quản lý tin tức</strong>
        <div className='card-header-actions'>
          <Button
            size='sm'
            className='btn-info btn-brand mr-1 mb-1'
            onClick={() => showModalAction()}
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
          {data && data.length > 0 ? (
            data.map((s, index) => {
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
                        onClick={() => showModalAction(s)}
                        color='primary'
                        className='btn'
                        aria-label='EditIcon'
                      >
                        <img src='/images/icon/edit1.png' alt='' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Xóa'>
                      <IconButton
                        //   onClick={() => this.showModalDelete(item)}
                        color='primary'
                        className='btn'
                        aria-label='IconRefresh'
                      >
                        <img src='/images/icon/delete.png' alt='' />
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
        <ModelNews data={dataCreateUpdate} callBack={closeModal.bind(this)} />
      )}
    </div>
  )
}
export default News
