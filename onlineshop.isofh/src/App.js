import React, { Component } from 'react';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ToastContainer } from 'react-toastify';
import Main from './Main';
import AppReducer from './reducers';
import stringUtils from 'mainam-react-native-string-utils';
import "antd/dist/antd.css";
const store = createStore(AppReducer,applyMiddleware(thunk));

const Kernel = () => (
  <div>
    <ToastContainer autoClose={3000} />
    <Provider store={store}>
      <Main />
    </Provider>
  </div>
)
export default Kernel;