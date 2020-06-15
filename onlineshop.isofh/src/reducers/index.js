  
import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import news from  './news'
import user from  './user'

export default combineReducers({
  user,
  news,
  visibilityFilter
})