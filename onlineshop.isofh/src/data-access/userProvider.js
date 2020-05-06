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
};
