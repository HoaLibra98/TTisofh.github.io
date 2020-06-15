import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import constants from "../../resources/strings";
import dataCacheProvider from "../../data-access/datacache-provider";
import "./app.scss";

// import userProvider from '../../data-access/user-provider';
import {
  // AppAside,
  AppBreadcrumb,
  AppHeader,
  AppFooter,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  // AppSidebarNav,
} from "@coreui/react";
// routes config
import routes from "./configs/routes";
import DefaultHeader from "./components/layout/DefaultHeader";
import DefaultFooter from "./components/layout/DefaultFooter";
import WithRoot from "./WithRoot";
import Login from "../user/containners/account/Login";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import IconButton from "@material-ui/core/IconButton";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
    };
  }
  getMenu() {
    let allMenus = [
      {
        userType: [],
        name: "QL tin tức",
        url: "/admin/news",
        imgUrl: "fa-basketball-ball",
        classActiveStyle: "cooperactive-basis",
      },
    ];
    return allMenus.filter((item) => {
      if (!(item.userType || []).length) return true;
      for (let i = 0; i < item.userType.length; i++) {
        if (
          item.userType[i] == (this.props.userApp.currentUser || {}).userType
        ) {
          return true;
        }
      }
    });
  }
  openMenu(item) {
    item.open = !item.open;
    this.setState({ menus: [...this.state.menus] });
  }
  componentDidMount() {
    this.setState({ menus: this.getMenu() });
   
  }
  onChange(date, dateString) {
    console.log(dateString);
  }
  onLogout(){
    this.props.history.push("/dang-nhap")
  }
  render() {
    const { classes } = this.props;
    const userCheck = dataCacheProvider.read(
      "",
      constants.key.storage.current_account_login
    );
    return (
      <div className="app">
        <AppHeader fixed>
          <div className="left-sidebar-pro">
            <nav id="sidebar" className="">
              <div className="sidebar-header" style={{padding:"7px 0px"}}>
                <a href="index.html">
                  <img
                    className="main-logo"
                    src="/images/logo.png"
                    alt=""
                  />
                </a>
                <strong>
                  <a href="#" style={{color:"black"}}>
                    Isofh Portal
                  </a>
                </strong>
              </div>
              <div className="left-custom-menu-adp-wrap comment-scrollbar">
                <nav className="sidebar-nav left-sidebar-menu-pro">
                  <ul className="metismenu" id="menu1">
                    {this.state.menus &&
                      this.state.menus.length > 0 &&
                      this.state.menus.map((item, index) => {
                        if (!(item.subMenu && item.subMenu.length)) {
                          return (
                            <li key={index} className="nav-item">
                              <NavLink
                                className={
                                  "nav-link " + `${item.classActiveStyle}`
                                }
                                activeclassname="active"
                                to={item.url}
                              >
                                <i
                                  className={
                                    "fa icon-menu fa-2x " + `${item.imgUrl}`
                                  }
                                  aria-hidden="true"
                                ></i>{" "}
                                {item.name}
                              </NavLink>
                            </li>
                          );
                        }
                        return (
                          <li
                            key={index}
                            className={
                              item.open
                                ? "menu-ul-show nav-item "
                                : "menu-ul-hide nav-item"
                            }
                          >
                            <a
                              className={
                                "nav-link " + `${item.classActiveStyle}`
                              }
                              activeclassname="active"
                              onClick={this.openMenu.bind(this, item)}
                            >
                              <i
                                className={
                                  "fa icon-menu fa-2x " + `${item.imgUrl}`
                                }
                                aria-hidden="true"
                              ></i>{" "}
                              {item.name}
                              <IconButton
                                color="primary"
                                className={classes.button + " button-primary"}
                                aria-label="ArrowDropDown"
                              >
                                <ArrowDropDown />
                              </IconButton>
                            </a>
                            <ul className={"menu-ul"}>
                              {item.subMenu.map((item2, index) => (
                                <li key={index} className="menu-left">
                                  <NavLink
                                    className={
                                      "nav-link2 " + `${item2.classActiveStyle}`
                                    }
                                    activeclassname="active"
                                    to={item2.url}
                                  >
                                    <i
                                      className={
                                        "fa icon-menu2 " + `${item2.imgUrl}`
                                      }
                                      aria-hidden="true"
                                    ></i>{" "}
                                    {item2.name}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </li>
                        );
                      })}
                  </ul>
                </nav>
              </div>
            </nav>
          </div>
        </AppHeader>
        <div className="app-body all-content-wrapper">
          <DefaultHeader />
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />

            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid className="main-fuild">
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => <route.component {...props} />}
                    />
                  ) : null;
                })}
              </Switch>
             
            </Container>
          </main>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
  sidebar: {
    textAlign: "left",
  },
});

function mapStateToProps(state) {
  return {
    userApp: state.userApp,
  };
}
export default connect(mapStateToProps)(WithRoot(withStyles(styles)(Home)));
