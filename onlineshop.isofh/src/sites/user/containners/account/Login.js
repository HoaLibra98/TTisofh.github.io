import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./css/main.scss";
import "./css/util.css";
import { toast } from "react-toastify";
import userProvider from "../../../../data-access/userProvider";
import dataCacheProvider from "../../../../data-access/datacache-provider";
import constants from "../../../../resources/strings";
import "react-toastify/dist/ReactToastify.css";
// import bg_login from '../../../../../public/bg_login.png'
function LoginScreen(props) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
 const onLogin = () => {
    if (!username || !password) {
      toast.error("Vui lòng nhập username/password! ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      userProvider
        .login(username.trim(), password.trim())
        .then((s) => {
          debugger
          switch (s.code) {
            case 0:
              let user = s.data.user;
              // props.dispatch({
              //   type: constants.action.action_user_login,
              //   value: user,
              // });
              dataCacheProvider.save("",constants.key.storage.current_account_login,user);
              dataCacheProvider.save("", constants.key.storage.current_account, user);
              setTimeout(() => {
                props.history.push("/admin");
              }, 500);
              break;
            case 1:
              toast.error(
                "Thông tin đăng nhập không chính xác, vui lòng kiểm tra lại!",
                {
                  position: toast.POSITION.TOP_RIGHT,
                }
              );
              break;
            case 3:
              toast.error(
                "Tài khoản đã bị inactive. Vui lòng liên hệ với Admin! ",
                {
                  position: toast.POSITION.TOP_RIGHT,
                }
              );
              break;
            default:
              toast.error("Đăng nhập thất bại!", {
                position: toast.POSITION.TOP_RIGHT,
              });
          }
        })
        .catch((e) => {});
    }
  }

  useEffect(() => {
    if (props.userApp) {
      window.location.href = "/admin";
    }
  }, []);

  const onKeyDown = (e) => {
    if (e.nativeEvent.code === "Enter") {
      onLogin();
    }
  };

  return (
    <div className="login-page">
      <div
        className="container-login100"
        // style={{ backgroundImage: bg_login }}
      >
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <div className="login100-form validate-form">
            <span className="login100-form-title p-b-49">
              <img
                // src={require("@images/logoBo.png")}
                alt=""
                style={{ paddingBottom: 20 }}
              />
              <br />
              ĐĂNG NHẬP
            </span>
            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is reauired"
            >
              <span className="label-input100">Tài khoản</span>
              <input
                className="input100"
                type="text"
                name="username"
                value={username}
                placeholder="Nhập tài khoản"
                onKeyDown={onKeyDown}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <span className="label-input100">Mật khẩu</span>
              <input
                className="input100"
                type="password"
                name="pass"
                value={password}
                placeholder="Nhập mật khẩu"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={onKeyDown}
              />
            </div>

            <div className="text-right p-t-8 p-b-31"></div>
            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button onClick={onLogin} className="login100-form-btn">
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    userApp: state.userApp,
  }),
  {
    // onLogin: authAction.onLogin,
  }
)(LoginScreen);
