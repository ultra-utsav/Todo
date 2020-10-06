import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Authenticated, setAuthenticated] = useState(false);

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

  if (Authenticated) {
    return <Redirect to="#" />;
  }

  return (
    <div className="App">
      <form type="post" onSubmit={handleSubmit}>
        <h2>
          <strong>L</strong>ogin
        </h2>
        <div className="form-group">
          {!Authenticated && (
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
          <input className="btn btn-primary btn-sm" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
