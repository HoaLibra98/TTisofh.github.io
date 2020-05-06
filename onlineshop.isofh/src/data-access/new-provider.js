import constants from '../resources/strings'
import datacacheProvider from './datacache-provider'
import clientUtils from '../utils/client-utils'

export default {

  search(page,size,title,createdDate, createdUser){
        let parameters =
        (page ? '?page=' + page : '&page=' + -1) +
        (size ? '&size=' + size : '&size=' + -1) +
        (createdDate ? '&createdDate=' + createdDate : '') +
        (createdUser ? '&createdUser=' + createdUser : '') +
        (title ? '&title=' + title : '')
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
  delete (id) {
    return clientUtils.requestApi('delete', constants.api.news.delete + '/' + id)
  },
  getDetail (id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi('get', constants.api.news.getAll + '?id=' + id)
        .then(x => {
          resolve(x)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  createOrEdit(id, title) {
    if (id) {
      return new Promise((resolve, reject) => {
        clientUtils
          .requestApi('put', constants.api.news.update + '/' + id, {news: {title}})
          .then(x => {
            resolve(x)
          })
          .catch(e => {
            reject(e)
          })
      })
    } else {
      return new Promise((resolve, reject) => {
        clientUtils
          .requestApi('post', constants.api.news.create, {news: {title}})
          .then(x => {
            resolve(x)
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}
