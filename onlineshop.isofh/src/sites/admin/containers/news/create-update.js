import React, { Component, useState, useEffect, useStyles ,useRef} from 'react'
import newsProvider from '../../../../data-access/new-provider'
import fileProvider from '../../../../data-access/image-provider'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { connect } from 'react-redux'
import actionNews from "../../../../action/news";
import { Modal, Button,Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


function modalAction (props) {
  const [state,_setState] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  });
  const files = useRef([]);
  const id = props.ID;
  const [title, setTitle] = useState();
  const [CheckValidate, setCheckValidate] = useState(false);

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
      props
        .loadNewsDetail(id)
        .then(s => {
          let logo = {};
          logo.url = s.news.image;
          let data = state.fileList.push(logo);
          debugger
          setState({
            fileList: s.news.image
              ? [
                  {
                    uid: "-1",
                    name: "image.png",
                    status: "done",
                    url: s.news.image.absoluteFileUrl(),
                  },
                ]
              : [],
          });
        })
        .catch(e => {
        });
  }, []);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleCancel = () =>setState({ previewVisible: false });

  const handlePreview = async (file) => {
    debugger
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  const handleChange = () => {};


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
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
      <Modal
          visible={props.visible}
          title={id ? 'CẬP NHẬT TIN TỨC': 'THÊM MỚI TIN TỨC'}
          onOk={() => create()}
          onCancel={() => handleClose()}
          okText={id ? 'Cập nhật' : 'Thêm mới'}
          cancelText="Trở về"
        >
          <div className="form-create-update">
            <div className="row">
              <div className="col-md-3">
                <div>
                    <strong>Tiêu đề</strong> (
                    <span className='isofh-error'>*</span>):{' '}
                </div>
              </div>
              <div className="col-md-8 news-title">
                    <input
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
                      style={{margin:"normal"}}
                    />
                    <p>
                        {CheckValidate && ( title == undefined ||title == '') ? (
                          <span className='isofh-error'>vui lòng nhập tiêu đề</span>
                        ) : (
                          ''
                        )}
                    </p>
              </div>
              <div className="col-md-3">
                <div>
                    <strong>Ảnh</strong> (
                    <span className='isofh-error'>*</span>):{' '}
                </div>
              </div>
              <div className="col-md-8 news-title">
                  <Upload
                    accept=".png,.gif,.jpg"
                    listType="picture-card"
                    fileList={
                      state.fileList &&
                      state.fileList.length &&
                      state.fileList.map((item) => {
                        let item2 = JSON.parse(JSON.stringify(item));
                        if (item2.url) item2.url = item2.url.absoluteFileUrl();
                        return item2;
                      })
                    }
                    onPreview={handlePreview}
                    onChange={handleChange}
                    onRemove={(file) => {
                      files.current = files.current.filter(
                        (item) => item.uid != file.uid
                      );
                      setState({
                        fileList: files.current,
                        hasChange: true,
                      });
                    }}
                    customRequest={({ onSuccess, onError, file }) => {
                      file.status = "uploading";
                      files.current.push(file);
                      setState({
                        fileList: files.current,
                      });
                      fileProvider
                        .upload(file)
                        .then((s) => {
                          var x = files.current.find(
                            (item) => item.uid == file.uid
                          );
                          if (x) {
                            if (s && s.code == 0 && s.data.length) {
                              setState({
                                logo: s.data[0],
                              });
                              let url = s.data[0];
                              x.status = "done";
                              x.url = url;
                            } else {
                              x.status = "error";
                            }
                            setState({
                              fileList: files.current,
                              hasChange: true,
                            });
                          }
                        })
                        .catch((e) => {
                          var x = files.current.find(
                            (item) => item.uid == file.uid
                          );
                          if (x) {
                            x.status = "error";
                            setState({
                              fileList: files.current,
                            });
                          }
                        });
                    }}
                  >
                    {state.fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  <Modal
                    visible={state.previewVisible}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img alt="example" style={{ width: '100%' }} src={state.previewImage} />
                    {state.fileList.length >= 1 ? null : (
                      <div className="ant-upload-text">Upload</div>
                    )}
                  </Modal>
              </div>
          </div>
          </div>
        </Modal>
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
