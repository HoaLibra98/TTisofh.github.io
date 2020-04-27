import React from 'react'
import Footer from './filter'
import AddTodo from '../contain/addTodo'
import VisibleTodoList from '../contain/visibleTodoList'
import UpDown from './upAnddown'
import {connect} from 'react-redux'
import UndoRedo from './undoRedo'
  
const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
    <UndoRedo/>
  </div>
)

export default connect(
  state => {
    return
  }
)(App)