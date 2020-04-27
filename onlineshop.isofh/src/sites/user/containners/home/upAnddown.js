import React,{Component} from 'react';
import {connect} from 'react-redux'
import {tang,giam} from '../../../../reducers/actions';
function index(props) {

    return (
        <div>
            <button>Tăng</button>
            <button>Giảm</button>
        </div>
    )
}
export default connect(
    state => {
        return {}
    }
)(index);