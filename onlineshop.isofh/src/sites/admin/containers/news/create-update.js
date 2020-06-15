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
import "antd/dist/antd.css";
function modalAction(props) {
  const [CheckValidate, setCheckValidate] = useState(false);
  const ID = props.match.params.id;
  const files = useRef([]);
  const [state, _setState] = useState({
    data: [],
    previewVisible: false,
    previewImage: "",
    fileList: []
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    props.loadNewsDetail(ID).then( s => {
      setState({
        fileList : s[0].news.image ? [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: s[0].news.image.absoluteUrl(),
          },
        ] : []
      })
    })
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
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };
  // const handleChange = ({ fileList }) => {};
  const handleCancel = () => 
    setState({ previewVisible: false })
  ;
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
      return;
    } else {
      setCheckValidate(false);
      props.createOrEdit();
      window.location.href = "/admin/news"

    }
  };
  const handleClose = () => {
      props.updateDate({
      id: null,
      title: "",
      image: "",
    });
    window.location.href = "/admin/news"
  };

  // const handleDeleteImage = () => {
  //   props.updateDate({ image: "" });
  // };
  console.log(fileList)
  return (
    <div>
      <div className="form-create-update">
        <div><h3>{props.id ? "CẬP NHẬT TIN TỨC" : "THÊM MỚI TIN TỨC"}</h3></div>
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
                  // onChange={handleChange}
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
                  {fileList.length > 0 ? null
                   : (
                    <div className="ant-upload-text">Upload</div>
                   )
                  }
                </Upload>
              {/* </label>
            </div> */}
          </div>
        </div>      
      </div>
      <div>
          <Button
                size="sm"
                className="btn-info btn-brand mr-1 mb-1"
                onClick={() => handleClose()}
              >
                <i className="fa fa-plus-circle" style={{ marginRight: 8 }}></i>
                <span>Trở về</span>
          </Button>
          <Button
                size="sm"
                className="btn-info btn-brand mr-1 mb-1"
                onClick={() => create()}
              >
                <i className="fa fa-plus-circle" style={{ marginRight: 8 }}></i>
                <span>{props.id ? "Cập nhật" : "Thêm mới"}</span>
          </Button>
      </div>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
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
