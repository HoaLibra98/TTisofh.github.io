import React, { Component, useState, useEffect } from 'react'

import axios from 'axios'
const API_KEY = '180f734ca78125afb021e7f1d162f4a2'
const weatherHome = () => {
  const [name, setName] = useState('')
  const [data, setData] = useState([])

  const [main, setMain] = useState([])
  useEffect(() => {
    loadPage()
  }, [])
  const loadPage = (action, item) => {
    let namesearch = action === 'name' ? item : name
    axios
      .get(
        'http://api.openweathermap.org/data/2.5/weather' +
          '?q=' +
          namesearch +
          '&mode=json&units=metric&cnt=100&APPID=' +
          API_KEY
      )
      .then(res => {
        setData(res.data)
        setMain(res.data.man)
      })
      .catch(error => console.log('error'))
  }
  const convertText = value => {
    if (value.length == 1) {
      if (value == ' ') {
        return ''
      }
      return value
    } else {
      return value.replace('  ', ' ')
    }
  }
  console.log(data)
  return (
    <div className='container'>
      <div className='card'>
        <input
          value={name ? name : ''}
          id={name}
          name={name}
          className='form-control'
          onChange={event => {
            loadPage('name', convertText(event.target.value))
            setName(convertText(event.target.name))
          }}
        />
        {(data && data !== null) || data != '' ? (
          <div className='card-body'>
            <h4 className='card-title'>{data.name}</h4>
            <p className='card-text'>Thông tin thời tiết</p>
            <a className='card-link'>
              <b>Nhiệt độ cao: </b>
            </a>
            <a className='card-link'>
              <b>Nhiệt độ thấp: </b>
            </a>
            <hr />
            <a className='cart-link'>Mức đo gió: </a>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default weatherHome
