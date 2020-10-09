import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");
  const [Registered, setRegistered] = useState(false);

  const handleSubmit = () => {
    if (
      name &&
      password &&
      email &&
      confpassword &&
      password === confpassword
    ) {
      const requestOptions = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      };

      fetch("http://localhost:8085/register/", requestOptions).then((res) => {
        if (res.status == 200) {
          console.log("Registered  Successfully!");
          setRegistered(true);
        }
      });
    }
  };

  if (Registered) {
    return <Redirect to="#" />;
  }

  return (
    <div className="App">
      <center>
        <form type="post" onSubmit={handleSubmit}>
          <h2>
            <strong>S</strong>ign-Up
          </h2>

          <div className="form-group">
            <input
              name="name"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
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
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              name="confpassword"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setconfPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              className="btn btn-success my-2 my-sm-0 btn-sm"
              type="submit"
            />
          </div>
          <div>
            <a  href="/login">Already have an Account?</a>
          </div>
        </form>
      </center>
    </div>
  );
};

export default Register;
