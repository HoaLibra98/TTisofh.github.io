import constants from "../resources/strings";
import clientUtils from "../utils/client-utils";

export default {
  login(username, password) {
    let object = {
     user :{
        username,
        password: password
     }
    };
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("put", constants.api.user.login, object)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  search(page, size, userName, Name,gender, createdDate) {
    debugger
    let parameters =
      (page ? "?page=" + page : "&page=" + -1) +
      (size ? "&size=" + size : "&size=" + -1) +
      (userName ? "&username=" + userName : "")+
      (Name ? "&name=" + Name : "") +
      ((gender == 1) ? "&gender=" + gender  : (gender == 0) ? "&gender=" + gender : "")+
      (createdDate ? "&createdDate=" + createdDate : "") 
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.user.search + parameters, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  delete(id) {
    return clientUtils.requestApi(
      "delete",
      constants.api.user.delete + "/" + id
    );
  },
  getDetail(id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.user.getAll + "?id=" + id)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  createOrEdit(id, name) {
    if (id) {
      return new Promise((resolve, reject) => {
        clientUtils
          .requestApi("put", constants.api.user.update + "/" + id, {
            user: { name },
          })
          .then((x) => {
            resolve(x);
          })
          .catch((e) => {
            reject(e);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        clientUtils
          .requestApi("post", constants.api.user.create, {
            news: { name },
          })
          .then((x) => {
            resolve(x);
          })
          .catch((e) => {
            reject(e);
          });
      });
    }
  },

};
