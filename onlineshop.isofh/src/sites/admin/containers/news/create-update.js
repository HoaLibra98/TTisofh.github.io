import React, { Component, useState, useEffect, useStyles } from 'react'
import {
  Button,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label
} from 'reactstrap'
import newsProvider from '../../../../data-access/new-provider'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const modalAction = ({ data, callBack }) => {
  const [open] = useState(true)
  const [checkbutton, setCheckButton] = useState(false)
  const [title, setTitle] = useState(
    data && data.news && data.news.title ? data.news.title : ''
  )
  const [content, setContent] = useState(
    data && data.news && data.news.content ? data.news.content : ''
  )
  const [image, setImage] = useState(
    data && data.news && data.news.image ? data.news.image : ''
  )
  const [dataCreate] = useState(data)
  const [CheckValidate, setCheckValidate] = useState(false)
  debugger
  const create = () => {
    let id = dataCreate && dataCreate.news ? dataCreate.news.id : ''
    if (title.length == 0 || title === '') {
      setCheckValidate(true)
    } else {
      setCheckValidate(false)
    }
    let param = {
      news: {
        title
      }
    }
    if (id) {
      debugger
      newsProvider.update(id, param).then(s => {
        if (s && s.code == 0 && s.data.data) {
          toast.success('Cập nhật tin tức thành công', {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      })
    } else {
      newsProvider.create(param).then(s => {
        if (s && s.data.data && s.code === 0) {
          toast.success('Thêm mới tin tức thành công', {
            position: toast.POSITION.TOP_RIGHT
          })
        }
      })
    }
  }
  const handleClose = () => {
    callBack()
  }
  return (
    <div>
      <Modal
        backdrop='static'
        isOpen={true}
        toggle={() => handleClose()}
        className='modal-lg'
      >
        <ValidatorForm onSubmit={create}>
          <ModalHeader>
            {dataCreate && dataCreate.news && dataCreate.news.id
              ? 'CẬP NHẬT TIN TỨC'
              : 'THÊM MỚI TIN TỨC'}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md='2'>
                <Label htmlFor='text-input'>
                  <strong>Tiêu đề</strong> (
                  <span className='isofh-error'>*</span>):{' '}
                </Label>
              </Col>
              <Col md='10' className='news-title'>
                <TextValidator
                  value={title}
                  id='name'
                  name='name'
                  variant='outlined'
                  placeholder='Nhập tiêu đề'
                  onChange={event => {
                    setTitle(event.target.value)
                    setCheckButton(true)
                  }}
                  margin='normal'
                />
                {CheckValidate && title == '' ? (
                  <span className='isofh-error'>vui lòng nhập tiêu đề</span>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => handleClose()}
              variant='contained'
              color='danger'
            >
              Trở về
            </Button>
            {checkbutton ? (
              <Button variant='contained' color='primary' type='submit'>
                {dataCreate.news && dataCreate.news.id
                  ? 'Cập nhật'
                  : 'Thêm mới'}
              </Button>
            ) : (
              <Button variant='contained' color='primary' disabled>
                {dataCreate.news && dataCreate.news.id
                  ? 'Cập nhật'
                  : 'Thêm mới'}
              </Button>
            )}
          </ModalFooter>
        </ValidatorForm>
      </Modal>
    </div>
  )
}
export default modalAction
