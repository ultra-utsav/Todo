import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
const cookie = new Cookies();
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState("--");

  const handleSubmit = () => {
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify({ email, password }),
    };

    fetch("http://localhost:8085/login/", requestOptions).then((res) => {
      if (res.status == 200) {
        console.log("Login Successfully!");
        setAuthenticated(true);
      }
    });
  };

  useEffect(() => {
    setToken(cookie.get("token"));
  });

  if (Authenticated) {
    return <Redirect to="#" />;
  }

  return (
    <div className="App">
      <p>wsdfasdf</p>
      <strong>{token}</strong>
      <center>
        <form type="post" onSubmit={handleSubmit}>
          <h2>
            <strong>L</strong>ogin
          </h2>
          <div className="form-group">
            {Authenticated && (
              <div className="alert alert-success" role="alert">
                Login Successfully
              </div>
            )}
          </div>

          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              className="btn btn-success my-2 my-sm-0 btn-sm"
              type="submit"
            />
          </div>
        </form>
      </center>
    </div>
  );
};

export default Login;
