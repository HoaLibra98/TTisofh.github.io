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

const modalAction = ({ data, callBack }) => {
  debugger
  const [open] = useState(true)
  const [checkbutton, setCheckButton] = useState(false)
  const [title, setTitle] = useState(
    data && data.news && data.news.title ? data.news.title : ''
  )
  const [content, setContent] = useState(
    data && data.news && data.news.content ? data.news.content : ''
  )
  const [image, setImage] = useState(data && data.length ? data.news.image : '')
  const [dataCreate] = useState(data)
  const create = () => {}
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
        <ValidatorForm>
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
                    setTitle(event.target.name).replace('  ', ' ')
                    setCheckButton(true)
                  }}
                  margin='normal'
                />
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
