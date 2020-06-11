import React, {
  Component,
  useState,
  useEffect,
  useStyles,
  useRef,
} from "react";
import newsProvider from "../../../../data-access/new-provider";
import fileProvider from "../../../../data-access/image-provider";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import actionNews from "../../../../action/news";
import { Form, Button, Input, Select, Upload, Modal } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import imageProvider from "../../../../data-access/image-provider";

function modalAction(props) {
  const [CheckValidate, setCheckValidate] = useState(false);
  const files = useRef([]);
  const [state, _setState] = useState({
    data: [],
    previewVisible: false,
    previewImage: "",
    fileList: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    props
      .loadNewsDetail(props.id)
      .then((s) => {
        let logo = {};
        logo.url = s.data.logo;
        setState({
          data: s.news,
          fileList: s[0].news.image
            ? [
                {
                  uid: "-1",
                  name: "image.png",
                  status: "done",
                  url: s[0].news.image.absoluteUrl(),
                },
              ]
            : [],
        });
        console.log(s[0].news.image)
      })
      .catch((e) => {});
  }, []);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const { previewVisible, previewImage, fileList } = state;
  const handlePreview = async (file) => {
    debugger
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
    props.updateDate({ image: file.url || file.preview });
  };
  const handleChange = ({ fileList }) => {};
  const handleCancel = () => setState({ previewVisible: false });
  // const uploadImage = (event) => {
  //   imageProvider
  //     .upload(event.target.files[0])
  //     .then((s) => {
  //       if (s && s.data.code == 0) {
  //         props.updateDate({ image: s.data.data.file.fileDown });
  //         console.log(s.data.data.file.fileDown);
  //       }
  //     })
  //     .catch((e) => {});
  // };

  const create = () => {
    if (props.title === "" || props.title === undefined) {
      setCheckValidate(true);
      console.log(CheckValidate)
      return;
    } else {
      setCheckValidate(false);
      props.createOrEdit();
      props.callBack();
    }
  };
  const handleClose = () => {
    props.callBack();
  };

  // const handleDeleteImage = () => {
  //   props.updateDate({ image: "" });
  // };

  return (
    <Modal
      visible={props.visible}
      title={ props.id ? "CẬP NHẬT TIN TỨC" : "THÊM MỚI TIN TỨC"}
      onOk={() => create()}
      onCancel={() => handleClose()}
      okText={ props.id ? "Cập nhật" : "Thêm mới"}
      cancelText="Trở về"
    >
      <div className="form-create-update">
        <div className="row">
          <div className="col-md-3">
            <div>
              <strong>Tiêu đề</strong> (<span className="isofh-error">*</span>):{" "}
            </div>
          </div>
          <div className="col-md-8 news-title">
            <input
              value={props.title}
              id="name"
              name="name"
              variant="outlined"
              placeholder="Nhập tiêu đề"
              onChange={(e) => {
                props.updateDate({ title: e.target.value });
              }}
              style={{ margin: "normal" }}
            />
            <p>
              {CheckValidate &&
              (props.title == undefined || props.title == "") ? (
                <span className="isofh-error">vui lòng nhập tiêu đề</span>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="col-md-3">
            <div>
              <strong>Ảnh</strong> (<span className="isofh-error">*</span>):{" "}
            </div>
          </div>
          <div className="col-md-8 news-title">
            {/* <div> */}
              {/* <input
                accept="image/*"
                style={{ display: "none" }}
                placeholder="chọn ảnh"
                id="upload_logo_header"
                onChange={(event) => {
                  uploadImage(event);
                }}
                type="file"
              />
              <label htmlFor="upload_logo_header" style={{ marginLeft: "-3%" }}> */}
              <Upload
                  listType="picture-card"
                  fileList={
                    fileList &&
                    fileList.length &&
                    fileList.map((item) => {
                      let item2 = JSON.parse(JSON.stringify(item));
                      if (item2.url) item2.url = item2.url.absoluteUrl();
                      return item2;
                    })
                  }
                  onPreview={handlePreview}
                  onChange={handleChange}
                  onRemove={(file) => {
                    files.current = files.current.filter(
                      (item) => item.uid !== file.uid
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
                          (item) => item.uid === file.uid
                        );
                        if (x) {
                          if (s && s.data.code === 0 && s.data.data) {
                            props.updateDate({ image: s.data.data.file.fileDown });
                            let url = s.data.data.file.fileDown;
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
                          (item) => item.uid === file.uid
                        );
                        if (x) {
                          x.status = "error";
                          setState({
                            fileList: files.current,
                          });
                        }
                      });
                  }}
                  accept=".png,.gif,.jpg"
                >
                  {fileList.length >= 1 ? null : (
                    <div className="ant-upload-text">Upload</div>
                  )}
                </Upload>
              {/* </label>
            </div> */}
          </div>
        </div>      
      </div>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Modal>
  );
}
export default connect(
  (state) => {
    return {
      title: state.news.title,
      id: state.news.id,
      image: state.news.image,
    };
  },
  {
    onSearch: actionNews.onSearch,
    loadListNews: actionNews.loadListNews,
    updateDate: actionNews.updateData,
    loadNewsDetail: actionNews.loadNewsDetail,
    createOrEdit: actionNews.createOrEdit,
  }
)(modalAction);
