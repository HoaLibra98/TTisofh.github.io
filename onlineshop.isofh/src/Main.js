import React, { Component } from 'react';
import { connect } from 'react-redux';
// import userProvider from "./data-access/user-provider";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import constants from "./resources/strings";
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable';
import dataCacheProvider from './data-access/datacache-provider';
import Login from "./sites/user/containners/account/Login";
import Admin from "./sites/admin/Home";
function Loading() {
  return <div></div>;
}
const routes = [
  // {
  //   path: "/dang-nhap",
  //   component: Loadable({
  //     loader: () => import('./sites/user/containners/account/Login'),
  //     loading: Loading,
  //   })
  // },
  {
    path: "/admin",
    component: Loadable({
      loader: () => import('./sites/admin/Home'),
      loading: Loading,
    })
  },
  {
    path: "/admin/:function",
    component: Loadable({
      loader: () => import('./sites/admin/Home'),
      loading: Loading,
    })
  },
  {
    path: "/admin/:function/:id",
    component: Loadable({
      loader: () => import('./sites/admin/Home'),
      loading: Loading,
    })
  },
  {
    path: "/admin/:function/:function/:id",
    component: Loadable({
      loader: () => import('./sites/admin/Home'),
      loading: Loading,
    })
  },
  {
    path: "/trang-chu",
    component: Loadable({
      loader: () => import('./sites/user/template/LayoutTemplate'),
      loading: Loading,
    })
  },
  {
    path: "/",
    component: Loadable({
      loader: () => import('./sites/user/template/LayoutTemplate'),
      loading: Loading,
    })
  },
  
]
class App2 extends Component {
  constructor(props) {
    super(props);
    // constants.dataCache.current_admin = datacacheProvider.read("", constants.key.storage.current_account);
    // this.props.dispatch({ type: constants.action.action_user_login, value: userProvider.getAccountStorage() })
    // this.props.dispatch({ type: constants.action.action_user, value: constants.dataCache.current_admin })
  }
  loadScript(path) {
    const script = document.createElement("script");
    script.src = path;
    script.async = true;
    document.body.appendChild(script);
  }

  render() {
    const userCheck = dataCacheProvider.read(
      "",
      constants.key.storage.current_account_login
    );
    return (<BrowserRouter>
      <div className="web-bve">
        <Router>
          <div>
            <Switch>
              {
                routes.map((route, key) => {
                  if (route.component)
                    return <Route exact key={key}
                      path={route.path}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  return null;
                })
              }
              {
          (!userCheck) ?
            <Redirect to="/dang-nhap" component={Login} /> : <Redirect to="/admin" component={Admin} />
      }
            </Switch>
          </div>
        </Router>
      </div>
    </BrowserRouter>);
  }
}
function mapStateToProps(state) {
  return {
    userApp: state.userApp
  };
}

export default connect(mapStateToProps)(App2);