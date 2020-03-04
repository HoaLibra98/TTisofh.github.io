import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

export default {
    getAccountStorage() {
        var user = datacacheProvider.read("", constants.key.storage.current_account_login);
        return user;
    },
    saveAccountStorage(account) {
        return datacacheProvider.save("", constants.key.storage.current_account, account);
    },
    xx() {
        clientUtils.serverApi = "";
    },
    login(username, password) {
        let object = {
            user: {
                username,
                password: password
            }
        }
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("put", constants.api.user.login, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    logout(id) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("put", constants.api.user.logout + "/" + id).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    search(param) {
        let parameters =
            (param.page ? '?page=' + param.page : '?page=' + -1) +
            (param.size ? '&size=' + param.size : '&size=' + - 1) +
            (param.email ? '&email=' + param.email : '') +
            (param.blocked ? '&blocked=' + param.blocked : '&blocked=' + - 1) +
            (param.name ? '&name=' + param.name : '') +
            (param.userType ? '&userType=' + param.userType : '&userType=' + - 1) +
            (param.title ? '&title=' + param.title : '') +
            (param.username ? '&username=' + param.username : '') +
            (param.createdDate ? '&createdDate=' + param.createdDate : '') +
            (param.createdUser ? '&createdUser=' + param.createdUser : '')
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.user.search + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
            // if (search) {
            //     clientUtils.requestApi("get", constants.api.user.search + parameters, {}).then(x => {
            //         resolve(x);
            //     }).catch(e => {
            //         reject(e);
            //     })
            // } else {
            //     let data = datacacheProvider.read("", "DATA_USER", [])
            //     if (!fromApi) {
            //         if (data && data.data && data.data.data.length) {
            //             if (param.size < data.data.total) {
            //                 param.size = data.data.total
            //                 this.search(param, true).then(s => {
            //                     resolve(s)
            //                 }).catch(e => {
            //                     resolve([])
            //                 })
            //             } else {
            //                 resolve(data)
            //             }
            //         } else {
            //             this.search(param, true).then(s => {
            //                 resolve(s)
            //             }).catch(e => {
            //                 resolve([])
            //             })
            //         }
            //     } else {
            //         clientUtils.requestApi("get", constants.api.user.search + parameters, {}).then(x => {
            //             if (x && x.data) {
            //                 datacacheProvider.save("", "DATA_USER", x)
            //                 if (param.size < x.data.total) {
            //                     param.size = x.data.total
            //                     this.search(param, true).then(s => {
            //                         resolve(s)
            //                     }).catch(e => {
            //                         resolve([])
            //                     })
            //                 } else {
            //                     resolve(x)
            //                 }
            //             } else {
            //                 resolve([])
            //             }
            //         }).catch(e => {
            //             resolve([])
            //         })
            //     }
            // }
        })
    },
    updatePassword(id, object) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("put", constants.api.user.updatePassword + "/" + id, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    updateEmail(id, object) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("put", constants.api.user.updateEmail + "/" + id, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    create(object) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("post", constants.api.user.create, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    update(id, object) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("put", constants.api.user.update + "/" + id, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    block(id, object) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("put", constants.api.user.block + "/" + id, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    active(id, object) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("put", constants.api.user.active + "/" + id, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    reset(id) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("put", constants.api.user.reset + "/" + id).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    getDetail(id) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.user.detail + "/" + id).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
    userAccess(object) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("post", constants.api.userAccess.create, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },
}   