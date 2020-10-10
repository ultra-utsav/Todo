import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        props.setAuthorized(true);
        return res.json();       
      }
    }).then((data)=>{
      props.setName(data.name);
    });
    
  };

  if (props.authorized) {
    return <Redirect to="/index" />;
  }

  return (
    <div className="App">
      <center>
          <h2>
            <strong>L</strong>ogin
          </h2>
          <div className="form-group">
            {props.authorized && (
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
              onClick={handleSubmit}
            />
          </div>
          {/* <div>
            <a  href="/">SignUp</a>
          </div> */}
      </center>
    </div>
  );
};

export default Login;
