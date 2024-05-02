//admin login page

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../AuthContext";
import DateTime from "./utility/dateTime";

//Frontend
import CustomInput from "./frontend/CustomInput";
import Button from "./frontend/Button";
import Alert from "@mui/material/Alert";

//External CSS
import "../App.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); //Receiving Information Bundles
  const { login } = useAuth();

  const [isHovering, setIsHovering] = useState(false); //Login Btn

  // const { from, userDSP } = location.state || {
  //   from: { pathname: "/" },
  //   userDSP: null,
  // }; //Get Selection from "ProtectedRoute_DSP"
  var currentUser = location.state?.currentUser; //The selection led to the login page

  const handleChange_un = (e) => {
    setUsername(e.target.value);
  };

  const handleChange_pwd = (e) => {
    setPassword(e.target.value);
  };

  // handleChange = e => {
  //   // this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  // };

  const handleLogin = () => {
    if (login(username, password)) {
      if (currentUser === "test") {
        navigate("/dashboard");
      } else {
        navigate("/DSPMain", { replace: true, state: { currentUser } });
      }
    } else {
      alert("Invalid username or password!");
      <Alert severity="error">This is an error Alert.</Alert>;
    }
  };

  useEffect(() => {
    console.log("lol");
    //Catch Refresh Page
    if (sessionStorage.getItem("refreshed")) {
      console.log("ref");
    } else {
    }
  });

  /* Login Btn */
  const loginBtnStyle = {
    backgroundColor: isHovering ? "orange" : "white",
    marginTop: "1em",
    transition: "background-color 2.5s",
    cursor: "pointer",
    color: "black",
    paddingLeft: "0.2em",
    paddingTop: "0",
    paddingBottom: "0",
    borderRadius: "10%",
    boxShadow: "5px 10px #888888",
  };

  return (
    <div className="APP-OUTER">
      <div className="APP-MIDDLE">
        <div className="APP-COTNER">
          <div className="App-Header" style={{ paddingBottom: "0" }}>
            <h1 style={{ marginBottom: "0" }}>Oasis PHX</h1>
          </div>

          <div className="APP-Time">
            <DateTime></DateTime>
          </div>

          <div className="Admin-Login">
            <form className="form" style={{ paddingLeft: "0" }}>
              <CustomInput
                labelText="Username"
                id="email"
                formControlProps={{
                  fullWidth: true,
                }}
                handleChange={handleChange_un}
                type="text"
              />
              <CustomInput
                labelText="Password"
                id="password"
                formControlProps={{
                  fullWidth: true,
                }}
                handleChange={handleChange_pwd}
                type="password"
              />

              <Button
                type="button"
                // color="primary"
                // className="form__custom-button"
                onClick={handleLogin}
                style={loginBtnStyle}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)} //
              >
                <h2 style={{ marginTop: "0", marginBottom: "0" }}>Log in</h2>
              </Button>

              <Button
                type="button"
                // color="primary"
                // className="form__custom-button"
                onClick={handleLogin}
                style={loginBtnStyle}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)} //
              >
                <h2 style={{ marginTop: "0", marginBottom: "0" }}>Back</h2>
              </Button>
            </form>
          </div>

          {/* <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button> */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
