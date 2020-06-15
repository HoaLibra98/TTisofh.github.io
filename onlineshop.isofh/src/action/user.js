import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "antd";
import moment from 'moment'
import userProvider from "../data-access/userProvider";
const { confirm } = Modal;
function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_DATE_USER",
      data,
    });
  };
}

function loadListUser() {
  return (dispatch, getState) => {
    userProvider.search(1, 10000, "", "", "").then((s) => {
      switch (s.code) {
        case 0:
          dispatch(
            updateData({
              news: s.data.data,
            })
          );
          break;
      }
    });
  };
}

function onSearch(userName, name,gender,createdDate) {
  return (dispatch, getState) => {
    if (userName === undefined && name === undefined) {
    } else {
      dispatch(
        updateData({
          searchName: name,
          searchUserName: userName,
          searchDate: createdDate,
          searchGender:gender
        })
      );
    }
    dispatch(gotoPage(1));
  };
}
const onDeleteItem = (item) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      confirm({
        title: "Xác nhận",
        content: `Bạn có muốn xóa tài khoản ${item.userName}?`,
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        onOk() {
          userProvider
            .delete(item.id)
            .then((s) => {
              if (s.code == 0) {
                toast.success("xóa tài khoản thành công!", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                let data = getState().user.data || [];
                let index = data.findIndex((x) => x.id == item.id);
                if (index != -1);
                data.splice(index, 1);
                dispatch(
                  updateData({
                    data: [...data],
                  })
                );
                dispatch(onSearch());
                resolve();
              } else {
                toast.error("Xóa tài khoản không thành công!", {
                  position: toast.POSITION.TOP_RIGHT,
                });
                reject();
              }
            })
            .catch((e) => {
              toast.error("Xóa tài khoản không thành công!", {
                position: toast.POSITION.TOP_RIGHT,
              });
              reject();
            });
        },
        onCancel() {
          reject();
        },
      });
    });
  };
};
function createOrEdit() {
  return (dispatch, getState) => {
    let id = getState().user.id;
    let name = getState().user.name;
    userProvider
      .createOrEdit(id, name)
      .then((s) => {
        switch (s.code) {
          case 0:
            if (!id) {
              toast.success("Thêm tin tức thành công!", {
                position: toast.POSITION.TOP_RIGHT,
              });
              dispatch(
                updateData({
                  id: "",
                  name: ""
                })
              );
            } else {
              toast.success("Cập nhật tài khoản thành công!", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
            dispatch(onSearch());
            break;
          default:
            if (!id) {
              toast.error("Thêm tài khoản không thành công!", {
                position: toast.POSITION.TOP_RIGHT,
              });
            } else {
              toast.error("Cập nhật tin tức không thành công!", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
            dispatch(onSearch());

            break;
        }
      })
      .catch((e) => {});
  };
}

function loadUserDetail(id) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      userProvider
        .getDetail(id)
        .then((s) => {
          if (s && s.code == 0 && s.data && s.data.data) {
            dispatch(
              updateData({
                id: s.data.data[0].user.id,
                name: s.data.data[0].user.name,
                userName: s.data.data[0].user.userName,
              })
            );
            resolve(s.data.data);
            return;
          }
          reject(s);
        })
        .catch((e) => {
          reject(e);
        });
    });
  };
}

function onSizeChange(size) {
  return (dispatch, getState) => {
    dispatch(
      updateData({
        size: size,
      })
    );
    dispatch(gotoPage(1));
  };
}

function gotoPage(page) {
  return (dispatch, getState) => {
    dispatch(updateData({ page: page }));
    let size = getState().user.size || 10;
    let name = getState().user.searchName;
    let userName = getState().user.searchUserName;
    let gender = getState().user.searchGender
    let date = getState().user.searchDate && getState().user.searchDate != -1 ? getState().user.searchDate : null ;
    userProvider.search(page, size, name, userName,gender, date).then((s) => {
    dispatch(
        updateData({
          total: s.data.total,
          data: s.data.data || [],
        })
      );
    });
  };
}

export default {
  updateData,
  loadListUser,
  onSearch,
  createOrEdit,
  loadUserDetail,
  gotoPage,
  onSizeChange,
  onDeleteItem,
};
