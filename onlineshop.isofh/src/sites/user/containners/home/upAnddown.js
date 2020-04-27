import React,{Component} from 'react';
import {connect} from 'react-redux'
import actions from '../../../../reducers/actions';
function index(props) {

    return (
        <div>
            <button onClick={ () => props.tang()}>Tăng</button>
            <button onClick={ () => props.giam()}>Giảm</button>
        </div>
    )
}
export default connect(
    state => {
        return {}
    },
    {
        tang: actions.tang,
        giam: actions.giam
    }
)(index);