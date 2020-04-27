import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import UpAndDown from './upAnddown'
const weatherHome = (props) => {
 
  useEffect(() => {
  }, [])

  return (
    <div className='container'>
        <UpAndDown/>
        Giá trị hiện tại : {props.value}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  value: state.number
})

export default connect(
  mapStateToProps
)(weatherHome)
