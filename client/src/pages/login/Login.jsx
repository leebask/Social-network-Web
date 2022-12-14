import { useContext, useRef } from "react";
import "./login.css";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  userSelector,
  fetchSelector,
  signIn,
} from "../../redux/slices/userSlice";
import { useEffect } from "react";
import userApi from "../../api/userApi";
import { notify, ToastContainer } from "../../utility/toast";
import { Link } from "react-router-dom";

export default function Login() {
  const username = useRef();
  const password = useRef();
  const dispatch = useDispatch();

  let isFetching = useSelector(fetchSelector);
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(
      signIn({
        username: username.current.value,
        password: password.current.value,
      })
    );
  };

  const google = () => {
    // window.open("http://localhost:8080/api/auth/google", "_self");
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media</h3>
          <span className="loginDesc">
            Kết nối bạn bè và thế giới quanh bạn qua Social Media.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="username"
              // type="username"
              required
              className="loginInput"
              ref={username}
            />
            <input
              placeholder="password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="secondary" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <Link to={"/forgot-password"} style={{ textDecoration: "none" }}>
              <div className="showMoreBtn loginForgot">
                <p>Quên mật khẩu</p>
              </div>
            </Link>
            <Link
              to={"/register"}
              style={{ textDecoration: "none" }}
              className="loginRegisterButton"
            >
              <button className="loginRegisterbtn">Create a New Account</button>
            </Link>
          </form>
          {/* <button
            className="loginButtonGoogle"
            onClick={google}
            disabled={isFetching}
          >
            {isFetching ? (
              <CircularProgress color="secondary" size="20px" />
            ) : (
              "Log In By Google"
            )}
          </button> */}
        </div>
      </div>
    </div>
  );
}
