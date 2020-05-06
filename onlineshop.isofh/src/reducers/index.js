  
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import news from  './news'

export default combineReducers({
  todos,
  news,
  visibilityFilter
})