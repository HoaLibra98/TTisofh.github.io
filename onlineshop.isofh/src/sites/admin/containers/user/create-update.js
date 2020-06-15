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
  import actionUser from "../../../../action/user";
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
      props.loadUserDetail(ID).then( s => {
        setState({
          fileList : s[0].user.avatar ? [
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: s[0].user.avatar.absoluteUrl(),
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
    const handleCancel = () => 
      setState({ previewVisible: false })
    ;
  
    const create = () => {
      if (props.name === "" || props.name === undefined) {
        setCheckValidate(true);
        return;
      } else {
        setCheckValidate(false);
        props.createOrEdit();
        window.location.href = "/admin/user"
  
      }
    };
    const handleClose = () => {
        props.updateDate({
        id: null,
        name: "",
        userName: "",
      });
      window.location.href = "/admin/user"
    };
  
    return (
      <div>
        <div className="form-create-update">
          <div><h3>{props.id ? "CẬP NHẬT TÀI KHỎAN" : "THÊM MỚI TAI KHOẢN"}</h3></div>
          <div className="row">
            <div className="col-md-3">
                Tên tài khoản:
            </div>
            <div className="col-md-8 news-title">
                {props.us}
            </div>
            <div className="col-md-3">
              <div>
                <strong>Họ và tên</strong> (<span className="isofh-error">*</span>):{" "}
              </div>
            </div>
            <div className="col-md-8 news-title">
              <input
                value={props.name}
                id="name"
                name="name"
                variant="outlined"
                placeholder="Nhập họ và tên"
                onChange={(e) => {
                  props.updateDate({ name: e.target.value });
                }}
                style={{ margin: "normal" }}
              />
              <p>
                {CheckValidate &&
                (props.name == undefined || props.name == "") ? (
                  <span className="isofh-error">vui lòng nhập họ và tên</span>
                ) : (
                  ""
                )}
              </p>
            </div>
            <div className="col-md-3">
              <div>
                <strong>Ảnh đại diện</strong> (<span className="isofh-error">*</span>):{" "}
              </div>
            </div>
            <div className="col-md-8 news-title">
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
                              props.updateDate({ avatar: s.data.data.file.fileDown });
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
        id: state.user.id,
        avatar: state.user.avatar,
        name: state.user.name,
        userName: state.user.userName,
        gennder: state.user.gender
      };
    },
    {
      onSearch: actionUser.onSearch,
      loadListUser: actionUser.loadListUser,
      updateDate: actionUser.updateData,
      loadUserDetail: actionUser.loadUserDetail,
      createOrEdit: actionUser.createOrEdit,
    }
  )(modalAction);
  