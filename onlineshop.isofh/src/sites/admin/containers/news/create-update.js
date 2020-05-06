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
import { connect } from 'react-redux'
import actionNews from "../../../../action/news";

function modalAction (props) {
  const id = props.ID;
  const [title, setTitle] = useState();
  const [CheckValidate, setCheckValidate] = useState(false);
  useEffect(() => {
      props
        .loadNewsDetail(id)
        .then(s => {})
        .catch(e => {
        });
  }, []);

  const create = () => {
    if(title === '' || title === undefined){
      setCheckValidate(true);
      return
    }
    else{
      setCheckValidate(false)
    }
    props.createOrEdit();
    props.callBack();
  }
  const handleClose = () => {
    props.callBack()
  }
  return (
    <div>
      <Modal
        backdrop='static'
        isOpen={true}
        toggle={() => props.callBack()}
        className='modal-lg'
      >
        <ValidatorForm onSubmit={create}>
          <ModalHeader>
            {id
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
                  value={props.title}
                  id='name'
                  name='name'
                  variant='outlined'
                  placeholder='Nhập tiêu đề'
                  onChange={e => {
                    setTitle(e.target.value);
                    if(id){
                    props.updateDate({ id,title: e.target.value });
                    }
                    else{
                    props.updateDate({ title: e.target.value });
                  }
                }
                }
                  margin='normal'
                />
                {CheckValidate && ( title == undefined ||title == '') ? (
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
              <Button variant='contained' color='primary' type='submit'>
                {id
                  ? 'Cập nhật'
                  : 'Thêm mới'}
              </Button>
          </ModalFooter>
        </ValidatorForm>
      </Modal>
    </div>
  )
}
export default connect(
  state => {
  return {
    title: state.news.title,
    id:state.news.id
    }
  },
  {
    onSearch: actionNews.onSearch,
    loadListNews: actionNews.loadListNews,
    updateDate: actionNews.updateData,
    loadNewsDetail: actionNews.loadNewsDetail,
    createOrEdit: actionNews.createOrEdit
  }
)(modalAction);
