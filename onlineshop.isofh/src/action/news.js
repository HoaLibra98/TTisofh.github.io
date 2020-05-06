import newProvider from '../data-access/new-provider'
import {toast} from'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Modal } from "antd";
const { confirm } = Modal;

function updateData(data) {
    return dispatch => {
        dispatch({
            type: 'UPDATE_DATE_NEWS',
            data
        })
    }
}

function loadListNews(){
    return (dispatch,getState) => {
        newProvider.search(1,10000,'','','').then(
            s => {
                switch (s.code) {
                    case 0:
                      dispatch(
                        updateData({
                          news: s.data.data
                        })
                      );
                      break;
                  }
            }
        )
    }
}

function onSearch(title) {
    return (dispatch, getState) => {
      if (title === undefined) {
      } else {
        dispatch(
          updateData({
            searchName: title
          })
        );
      }
    };
  }
  
function createOrEdit() {
    return (dispatch,getState) => {
        let id = getState().news.id;
        console.log(getState().news)
        let title = getState().news.title;
        newProvider.createOrEdit(id,title).then(
            s => {
                switch (s.code) {
                    case 0:
                        dispatch(updateData({
                            id: "",
                            title: "",
                        }))
                        if (!id) {
                            toast.success("Thêm tin tức thành công!", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                          } else {
                            toast.success("Cập nhật tin tức thành công!", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                          }
                          dispatch(loadListNews());
                        break;
                    default:
                        if (!id) {
                            toast.error("Thêm tin tức không thành công!", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                          } else {
                            toast.error("Cập nhật tin tức không thành công!", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                          }
                        break;
                }
            }
        ).catch(e => {
          });
    }
}

function loadNewsDetail(id) {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        newProvider
          .getDetail(id)
          .then(s => {
            if (s && s.code == 0 && s.data && s.data.data) {
              dispatch(
                updateData({
                  id: s.data.data.id,
                  title: s.data.data.title
                })
              );
              resolve(s.data.data);
              return;
            }
            reject(s);
          })
          .catch(e => {
            reject(e);
          });
      });
    };
  }

  function onDeleteItem(item) {
    return (dispatch, getState) => {
      return new Promise((resolve, reject) => {
        confirm({
          title: "Xác nhận",
          content: `Bạn có muốn xóa tin tức ${item.title}?`,
          okText: "Xóa",
          okType: "danger",
          cancelText: "Hủy",
          onOk() {
            newProvider
              .delete(item.id)
              .then(s => {
                if (s.code == 0) {
                  toast.success("xóa tin tức thành công!", {
                    position: toast.POSITION.TOP_RIGHT
                  });
                  let data = getState().news.data || [];
                  let index = data.findIndex(x => x.id == item.id);
                  if (index != -1);
                  data.splice(index, 1);
                  dispatch(
                    updateData({
                      data: [...data]
                    })
                  );
                  dispatch(loadListNews());
                  resolve();
                } else {
                  toast.error("Xóa tin tức không thành công!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                  reject();
                }
              })
              .catch(e => {
                toast.error("Xóa tin tức không thành công!", {
                  position: toast.POSITION.TOP_RIGHT
              });
                reject();
              });
          },
          onCancel() {
            reject();
          }
        });
      });
    };
  }


  function onSizeChange(size) {
    return (dispatch, getState) => {
      dispatch(
        updateData({
          size: size
        })
      );
      dispatch(gotoPage(1));
    };
  }


  function gotoPage(page) {
    return (dispatch, getState) => {
      dispatch(updateData({ page: page }));
      let size = getState().news.size || 10;
      let title = getState().news.title;
      productProvider
        .search(page, size, title)
        .then(s => {
          dispatch(
            updateData({
              total: s.data.total || size,
              data: s.data.data || []
            })
          );
        });
    };
  }


export default{
    updateData,
    loadListNews,
    onSearch,
    createOrEdit,
    loadNewsDetail,
    onDeleteItem,
    gotoPage,
    onSizeChange
}