import React from 'react';
import { connect } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
const  index = ({ canUndo, canRedo, onUndo, onRedo }) => {
    return(
        <div>
            <button onClick={onUndo} disabled={!canUndo}>
                Undo
            </button>
            <button onClick={onRedo} disabled={!canRedo}>
                Redo
            </button>
        </div>
    )
}

export default connect(
    state => {
        return{
            canUndo: state.todos.past.length > 0,
            canRedo: state.todos.future.length > 0
        }
    },
    {
        onUndo: UndoActionCreators.undo,
        onRedo: UndoActionCreators.redo
    }
)(index)