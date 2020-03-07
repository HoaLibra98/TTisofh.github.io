import React from 'react'
import { AppSidebarToggler } from '@coreui/react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
// import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert'
import { connect } from 'react-redux'
// import { Redirect, Link } from 'react-router-dom'
import constants from '../../../../resources/strings'
class PrimarySearchAppBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      userAvatar: ''
    }
  }
  // componentWillMount() {
  //   this.getDetail();
  //   // walletProvider.getDetail("13").then(s => { }).catch(e => { });
  // }

  // getDetail() {
  //   let id = (this.props.userApp.currentUser || {}).id;
  //   let userApp = this.props.userApp.currentUser;
  //   if (userApp != undefined) {
  //     this.setState({
  //       // userId: userApp.id,
  //       userName: userApp.name,
  //       userAvatar: userApp.avatar
  //     });
  //   }
  //   // else {
  //   //   userProvider.getDetail(id).then(s => {
  //   //     if (s && s.code == 0 && s.data) {
  //   //       this.setState({
  //   //         userId: s.data.user.id,
  //   //         userName: s.data.user.name,
  //   //         userAvatar: s.data.user.avatar
  //   //       })
  //   //     }
  //   //     this.setState({ progress: false })
  //   //   }).catch(e => {
  //   //     this.setState({ progress: false })
  //   //   })
  //   // }

  // }
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleProfile () {
    // this.handleMenuClose();
    window.location.href = '/admin/user-info'
  }

  handlelogOut = event => {
    // let param = JSON.parse(localStorage.getItem('isofh'));
    // localStorage.clear()
    localStorage.removeItem('_' + constants.key.storage.current_account_login)
    localStorage.removeItem('_' + constants.key.storage.current_account)
    window.location.href = '/dang-nhap'
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
    this.handleMobileMenuClose()
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null })
  }

  render () {
    const { classes } = this.props
    return (
      <div className='header-top-area'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              <div className='header-top-wraper'>
                <div className='row'>
                  <div className='col-lg-1 col-md-0 col-sm-1 col-xs-12'>
                    <div className='menu-switcher-pro'>
                      <button
                        type='button'
                        id='sidebarCollapse'
                        className='btn bar-button-pro header-drl-controller-btn btn-info navbar-btn'
                      >
                        <i className='fas fa-bars'></i>
                      </button>
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-7 col-sm-6 col-xs-12'>
                    <div className='header-top-menu tabl-d-n'>
                      <ul className='nav navbar-nav mai-top-nav'>
                        <li className='nav-item'>
                          <a href='#' className='nav-link'>
                            Home
                          </a>
                        </li>
                        <li className='nav-item'>
                          <a href='#' className='nav-link'>
                            About
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='col-lg-5 col-md-5 col-sm-12 col-xs-12'>
                    <div className='header-right-info'>
                      <ul
                        className='nav navbar-nav mai-top-nav header-right-menu'
                        style={{ display: 'flex', msFlexDirection: 'row' }}
                      >
                        <li className='nav-item'>
                          <a
                            href='#'
                            data-toggle='dropdown'
                            role='button'
                            aria-expanded='false'
                            className='nav-link dropdown-toggle'
                          >
                            <img src='img/product/pro4.jpg' alt='' />
                            <span className='admin-name'>Prof.Anderson</span>
                            <i className='fa fa-angle-down edu-icon edu-down-arrow'></i>
                          </a>
                          <ul
                            role='menu'
                            className='dropdown-header-top author-log dropdown-menu animated zoomIn'
                          >
                            <li>
                              <a href='#'>
                                <span className='edu-icon edu-home-admin author-log-ic'></span>
                                My Account
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <span className='edu-icon edu-user-rounded author-log-ic'></span>
                                My Profile
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <span className='edu-icon edu-money author-log-ic'></span>
                                User Billing
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <span className='edu-icon edu-settings author-log-ic'></span>
                                Settings
                              </a>
                            </li>
                            <li>
                              <a href='#'>
                                <span className='edu-icon edu-locked author-log-ic'></span>
                                Log Out
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userApp: state.userApp
  }
}
export default connect(mapStateToProps)(PrimarySearchAppBar)
