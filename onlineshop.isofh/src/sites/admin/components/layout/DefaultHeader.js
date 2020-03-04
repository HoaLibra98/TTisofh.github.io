import React from 'react';
import { AppSidebarToggler } from '@coreui/react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux';
// import { Redirect, Link } from 'react-router-dom'
import constants from '../../../../resources/strings';
class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      userAvatar: ''
    };
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
    this.setState({ anchorEl: event.currentTarget });
  };

  handleProfile() {
    // this.handleMenuClose();
    window.location.href = '/admin/user-info';
  }

  handlelogOut = event => {
    // let param = JSON.parse(localStorage.getItem('isofh'));
    // localStorage.clear()
    localStorage.removeItem("_" + constants.key.storage.current_account_login);
    localStorage.removeItem("_" + constants.key.storage.current_account);
    window.location.href = '/dang-nhap';

    // let id = (this.props.userApp.currentUser || {}).id;
    // userProvider.logout(id).then(s => {
    //   if (s && s.data && s.code === 0) {
    // localStorage.clear()
    // window.location.reload()
    // window.location.href = '/dang-nhap';
    // var logedin = localStorage.getItem('isofh')
    // if(!logedin) {
    //   this.props.history.push("/login");
    // }
    //   } else {
    //     alert(s.message)
    //   }
    // }).catch(e => {

    // })
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
        className="profile-menu"
        color="primary"
      >
        <MenuItem onClick={this.handleProfile}>Thông tin cá nhân</MenuItem>
        {/* <MenuItem onClick={this.handleMenuClose}>My account</MenuItem> */}
        <MenuItem onClick={this.handlelogOut}>Đăng xuất</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}

      >
        {/* <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem> */}
        <MenuItem onClick={this.handleProfile}>
          <IconButton color="inherit" className="profile">
            <AccountCircle fontSize='small' />
          </IconButton>
          <p>Thông tin cá nhân</p>
        </MenuItem>
        <MenuItem onClick={this.handlelogOut}>
          <IconButton color="inherit">
            <ExitToAppIcon fontSize='small' />
          </IconButton>
          <p>Đăng xuất</p>
        </MenuItem>
      </Menu>
    );

    return (
      <React.Fragment>
        <div className={classes.root + " header"}>
          <AppBar position="static">
            <Toolbar>
              <AppSidebarToggler
                className="d-lg-none"
                // mobile
                children={
                  // <IconButton className={classes.button} aria-label="Delete">
                  <MenuIcon className={classes.menubutton + " icon-down-none"} />
                  // </IconButton>
                } />
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                <div className={classes.box_menu + ' logo-isofh'}>
                  {/* <a href={window.location.origin}>
                    <img src="/images/logo/avatar.png" className="logo-img" alt='isofh' />
                  </a> */}
                  <AppSidebarToggler
                    className="d-md-down-none"
                    children={
                      // <IconButton className={classes.button} aria-label="Delete">
                      <MenuIcon className={classes.menubutton + " icon-down-none"} />
                      // </IconButton>
                    }
                    display="lg" />
                </div>
              </Typography>
              {/* <div className="logo-csyt"><a href="#"><img src={(this.state.hospitalLogo||'').absoluteUrl()} alt=""/></a></div> */}
              <div className={classes.grow} />

              <div className={classes.sectionDesktop + " information"}>
                {/* <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}

                <span className="name-csyt-top item-right">{this.props.userApp.currentUser ? (this.props.userApp.currentUser || '').name : ""}</span>
                <IconButton
                  aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleProfileMenuOpen}
                  color="inherit"
                  className="icon-dropdown"
                >
                  <span className="user-icon">{this.props.userApp.currentUser ? <img width={100} height={100} src={(this.props.userApp.currentUser.avatar && this.props.userApp.currentUser.avatar.absoluteUrl() || '/avatar1.png')} alt="" /> : ''} </span>
                  {/* <img src="/icon/arrowPointToRight.png" alt="" /> */}
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
          {renderMobileMenu}
        </div>
      </React.Fragment>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    color: '#fff'
  },
  menubutton: {
    color: '#fff'
  },
  box_menu: {
    width: 175,
    height: 55,
    textAlign: 'center'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});
function mapStateToProps(state) {
  return {
    userApp: state.userApp
  };
}
export default withStyles(styles)(connect(mapStateToProps)(PrimarySearchAppBar));