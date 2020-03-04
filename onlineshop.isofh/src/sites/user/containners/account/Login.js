import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import userProvider from '../../../../data-access/user-provider';
import dataCacheProvider from '../../../../data-access/datacache-provider';
import constants from '../../../../resources/strings';
import 'react-toastify/dist/ReactToastify.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.checkUsed = this.props.location.state
    this.state = {
      username: '',
      password: '',
    }
  }

  componentWillMount() {
    this.checkUserLogin();
  }

  checkUserLogin() {
    if (this.checkUsed) {
      toast.error("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên!", {
        position: toast.POSITION.TOP_RIGHT
      });
      this.props.dispatch({ type: constants.action.action_user_logout, value: {} })
      localStorage.removeItem("_" + constants.key.storage.current_account_login);
      localStorage.removeItem("_" + constants.key.storage.current_account);
    } else if (this.props.userApp.currentUser && this.props.userApp.currentUser.id) {
      window.location.href = "/admin";
    }
  }
  login() {
    const { username, password } = this.state;
    if (!username || !password) {
      toast.error("Vui lòng nhập username/password! ", {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      userProvider.login(username.trim(), password.trim()).then(s => {
        switch (s.code) {
          case 0:
            let user = s.data.user;
            this.props.dispatch({ type: constants.action.action_user_login, value: user })
            dataCacheProvider.save("", constants.key.storage.current_account_login, user)
            dataCacheProvider.save("", constants.key.storage.current_account, user).then(s => {
              setTimeout(() => {
                this.props.history.push("/admin");
              }, 500);
            });
            break;
          case 1:
            toast.error("Thông tin đăng nhập không chính xác, vui lòng kiểm tra lại!", {
              position: toast.POSITION.TOP_RIGHT
            });
            break;
          case 3:
            toast.error("Tài khoản đã bị inactive. Vui lòng liên hệ với Admin! ", {
              position: toast.POSITION.TOP_RIGHT
            });
            break;
          default:
            toast.error("Đăng nhập thất bại!", {
              position: toast.POSITION.TOP_RIGHT
            });
        }
      }).catch(e => {
      })
    }

  }

  render() {
    const { username, password } = this.state;
    return (
      <div>
        <div className="ykhn-home-banner ykhn-priceList-banner">
          <div className="home-banner priceList-banner" style={{ background: "url('../images/banner/layer1.png')" }}>
          </div>
        </div>
        <div className="ykhn-login">
          <div className="container">
            <form className="ykhn-login-info">
              <h1 className="login-title">ĐĂNG NHẬP</h1>
              <div className="login-inner">
                <label className="login-inner-title">Email hoặc đăng nhập</label>
                <input className="login-input" type="text"
                  value={username}
                  onChange={(event) => this.setState({ username: event.target.value })}></input>
              </div>
              <div className="login-inner">
                <label className="login-inner-title">Mật khẩu</label>
                <input className="login-input" type="password"
                  value={password}
                  onChange={(event) => this.setState({ password: event.target.value })}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      this.login()
                    }
                  }}>
                </input>
              </div>
              <div className="login-info-item">
                {/* <a href="#" className="forgot-pass">Quên mật khẩu?</a> */}
                <button type="button" className="login-button" onClick={() => { this.login() }}>ĐĂNG NHẬP</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userApp: state.userApp
  };
}
export default connect(mapStateToProps)(Login);