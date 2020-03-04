import constants from '../resources/strings';
import clientUtils from '../utils/client-utils';


export default {
    getAccess() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.userAccess.getAccess, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    totalCount() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.userAccess.totalCount, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    onlineCount() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.userAccess.onlineCount, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    }
}   