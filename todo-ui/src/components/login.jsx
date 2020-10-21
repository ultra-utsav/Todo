import React, { useState } from "react";
import { connect,useDispatch,useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {setUser} from "../redux/user/userAction";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit =  () => {
    const user = { email, password };
    props.setUser(user);
  }

  if (props.user.authorized) {
    return <Redirect to="/index" />;
  }

  return (

    <div className="App">
      <center>
        <h2>
          <strong>L</strong>ogin
          </h2>
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
          <div>
            <button className="btn btn-success my-2 my-sm-0 btn-sm" onClick={handleSubmit}> Submit</button>
          </div>    
        {/* <div>
            <a  href="/">SignUp</a>
          </div> */}
      </center>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user : state.user
  }
}

export default connect(mapStateToProps,{setUser})(Login);
