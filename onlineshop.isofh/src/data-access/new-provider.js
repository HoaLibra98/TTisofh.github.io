import constants from '../resources/strings'
import datacacheProvider from './datacache-provider'
import clientUtils from '../utils/client-utils'
export default {
  search (param) {
    let parameters =
      (param.page ? '?page=' + param.page : '&page=' + -1) +
      (param.size ? '&size=' + param.size : '&size=' + -1) +
      (param.createdDate ? '&createdDate=' + param.createdDate : '') +
      (param.createdUser ? '&createdUser=' + param.createdUser : '') +
      (param.name ? '&name=' + param.name : '')
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('get', constants.api.news.search + parameters, {})
        .then(x => {
          resolve(x)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  update (id, object) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('put', constants.api.news.update + '/id', object)
        .then(x => {
          resolve(x)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  delete (id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('delete', constants.api.news.delete + '/id')
        .then(x => {
          resolve(x)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  create (id, object) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('post', constants.api.news.create + '/id', object)
        .then(x => {
          resolve(x)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}
