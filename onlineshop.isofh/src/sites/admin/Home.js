import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import '../../App.css';
import constants from "../../resources/strings";
import datacacheProvider from '../../data-access/datacache-provider';
import userProvider from '../../data-access/user-provider';
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
} from '@coreui/react';
// routes config
import routes from './configs/routes';
import DefaultHeader from './components/layout/DefaultHeader';
import DefaultFooter from './components/layout/DefaultFooter';
import WithRoot from './WithRoot';
import './App.scss';
import Login from '../user/containners/account/Login';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: []
        }
    }
    getMenu() {
        let allMenus = [
            // {
            //     userType: [1],
            //     name: "Quản lý tài khoản",
            //     url: '/admin/user',
            //     imgUrl: 'fa-users',
            //     classActiveStyle: "tai-khoan"
            // },
            // {
            //     userType: [1, 2],
            //     name: "Quản lý tin tức",
            //     url: '/admin/news',
            //     imgUrl: 'fa-newspaper',
            //     classActiveStyle: "tin-tuc"
            // },
            // {
            //     userType: [1, 2],
            //     name: "Quản lý slide",
            //     url: '',
            //     imgUrl: 'fa-sliders-h',
            //     classActiveStyle: "slide",
            //     subMenu: [
            //         {
            //             role: [],
            //             name: "Slide item",
            //             url: '/admin/slideItem',
            //             imgUrl: 'fa-circle',
            //             classActiveStyle: 'slide-item',
            //         },
            //         {
            //             role: [],
            //             name: "Slide page",
            //             url: '/admin/slide',
            //             imgUrl: 'fa-circle',
            //             classActiveStyle: 'slide-page',
            //         },
            //         {
            //             role: [],
            //             name: "Slide place",
            //             url: '/admin/slidePlace',
            //             imgUrl: 'fa-circle',
            //             classActiveStyle: 'slide-place',
            //         }
            //     ]
            // },
            // {
            //     userType: [1],
            //     name: "Quản lý menu",
            //     url: '/admin/menu',
            //     imgUrl: 'fa-bars',
            //     classActiveStyle: "menu"
            // },
            // {
            //     userType: [1, 2],
            //     name: "Quản lý Page",
            //     url: '/admin/page',
            //     imgUrl: 'fa-pager',
            //     classActiveStyle: "page"
            // },
            // {
            //     userType: [1, 2],
            //     name: "QL Đào tạo - NCKH",
            //     url: '/admin/training',
            //     imgUrl: 'fa-briefcase',
            //     classActiveStyle: "training"
            // },
            // {
            //     userType: [1, 2],
            //     name: "Quản lý chuyên gia",
            //     url: '/admin/doctor',
            //     imgUrl: 'fa-user-md',
            //     classActiveStyle: "doctor"
            // },
            // {
            //     userType: [1],
            //     name: "Quản lý Landing Page",
            //     url: '/admin/landing-page',
            //     imgUrl: 'fa-copy',
            //     classActiveStyle: "landing-page"
            // },
            {
                userType: [],
                name: "QL tin tức",
                url: '/admin/news',
                imgUrl: 'fa-basketball-ball',
                classActiveStyle: "cooperactive-basis"
            },
        ];
        return allMenus.filter(item => {
            if (!(item.userType || []).length)
                return true;
            for (let i = 0; i < item.userType.length; i++) {
                if (item.userType[i] == (this.props.userApp.currentUser || {}).userType) {
                    return true;
                }
            }
        })
    }
    openMenu(item) {
        item.open = !item.open;
        this.setState({ menus: [...this.state.menus] })
    }
    componentDidMount() {
        this.setState({ menus: this.getMenu() })
        constants.dataCache.current_admin = datacacheProvider.read("", constants.key.storage.current_account);
        // this.getUserAccess();
    }
    // getUserAccess = () => {
    //     var nav = window.navigator;
    //     var screen = window.screen;
    //     var guid = nav.mimeTypes.length;
    //     guid += nav.userAgent.replace(/\D+/g, '');
    //     guid += nav.plugins.length;
    //     guid += screen.height || '';
    //     guid += screen.width || '';
    //     guid += screen.pixelDepth || '';
    //     let deviceId = localStorage.getItem("_ONLINE_COUNTER_KEY");
    //     if (deviceId === null) {
    //         datacacheProvider.save("", "ONLINE_COUNTER_KEY", guid)
    //         deviceId = localStorage.getItem("_ONLINE_COUNTER_KEY");
    //     }
    //     let data = {
    //         deviceId: deviceId
    //     }
    //     // if (!lastSend || new Date().getTime() - lastSend > 300000) {
    //     userProvider.userAccess(data).then(s => {
    //         if (s && s.data && s.code === 0) {
    //             // storageMgr.write("LAST_SEND_COUNTER", new Date().getTime());
    //         }
    //     }).catch(e => {

    //     })
    //     // }

    // }
    render() {
        const { classes } = this.props;
        return (
            <div className="app">
                <AppHeader fixed>
                    <DefaultHeader />
                </AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <div className="scrollbar-container sidebar-nav ps ps--active-y ps-container">
                            <ul className="nav">
                                {
                                    this.state.menus && this.state.menus.length > 0 && this.state.menus.map((item, index) => {
                                        if (!(item.subMenu && item.subMenu.length)) {
                                            return <li key={index} className="nav-item">
                                                <NavLink className={'nav-link ' + `${item.classActiveStyle}`} activeclassname="active" to={item.url}>
                                                    <i className={'fa icon-menu fa-2x ' + `${item.imgUrl}`} aria-hidden="true"></i> {item.name}
                                                </NavLink></li>
                                        }
                                        return <li key={index} className={item.open ? 'menu-ul-show nav-item ' : 'menu-ul-hide nav-item'}>
                                            <a className={'nav-link ' + `${item.classActiveStyle}`} activeclassname="active" onClick={this.openMenu.bind(this, item)} >
                                                <i className={'fa icon-menu fa-2x ' + `${item.imgUrl}`} aria-hidden="true"></i> {item.name}
                                                <IconButton color="primary" className={classes.button + " button-primary"} aria-label="ArrowDropDown">
                                                    <ArrowDropDown />
                                                </IconButton>
                                            </a>
                                            <ul className={'menu-ul'}>
                                                {
                                                    item.subMenu.map((item2, index) => <li key={index} className="menu-left">
                                                        <NavLink className={'nav-link2 ' + `${item2.classActiveStyle}`} activeclassname="active" to={item2.url}>
                                                            <i className={'fa icon-menu2 ' + `${item2.imgUrl}`} aria-hidden="true"></i> {item2.name}
                                                        </NavLink>
                                                    </li>)
                                                }
                                            </ul>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className="main">
                        <AppBreadcrumb appRoutes={routes} />
                        <Container fluid className='main-fuild'>
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component ? (
                                        <Route key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => (
                                                <route.component {...props} />

                                            )} />)
                                        : (null);
                                },
                                )}
                            </Switch>
                            {/* {
                                (!this.props.userApp.isLogin) &&
                                <Redirect to="/dang-nhap" component={Login} />
                            } */}
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

const styles = theme => ({
    sidebar: {
        textAlign: 'left',
    }
})

function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}
export default connect(mapStateToProps)(WithRoot(withStyles(styles)(Home)));