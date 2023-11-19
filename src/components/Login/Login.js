import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Card from "../../shared/components/FrontendTools/Card";
import loginPic from "../../Assets/login.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../Slices/AuthSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const PasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (isValid) {
      fetch(`http://localhost:8000/user`)
        .then((res) => {
          return res.json();
        })
        .then((users) => {
          const user = users.find((user) => user.email === email);
          if (!user) {
            setEmailError("Please Enter a valid Email");
          } else {
            if(user.flag===1){
              toast.warning('You are blocked by admin');
              
            } else {
            if (user.password === password) {
              toast.success("Success");
              dispatch(login(user));
              navigate("/");
            } else {
              setPasswordError("Please Enter Valid Password");
            }
          }
          }
        })
        .catch((err) => {
          console.error("Error:" + err.message);
        });
    }
  };

  return (
    <div className="login-container">
      <Card>
        <h1 style={{ color: "#06bbcc", textDecorationLine: "underline" }}>
          Login Form
        </h1>
        <div className="image-container">
          <img src={loginPic} alt="login" className="login-image" />
        </div>
        <form onSubmit={SubmitHandler}>
          <div className="form-group">
            <div className="form-input">
              <label htmlFor="email">Email Address:</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={emailChangeHandler}
                autoComplete="off"
              />
              <div className="error-message">{emailError}</div>
            </div>
            <div className="form-input">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={PasswordChangeHandler}
              />
              <div className="error-message">{passwordError}</div>
            </div>
            <div className="submitBtn">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
