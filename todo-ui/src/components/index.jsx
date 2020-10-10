import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Profile from "./profile";

function Index (props) {
  const [showComponent,setShowComponent] = useState(false);
  
  const _onButtonClick=()=> {
    setShowComponent(true);
  }

  useEffect(() => {
    let requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    };
    fetch("http://localhost:8085/authenticate",requestOptions)
      .then((res)=>{
        if(res.status === 200)
          props.setAuthorized(true);
          return res.json();
      }).
      then((data)=>{
        if(data)
          props.setName(data.name);
      });
  }, props);

  if(!props.authorized)
    return <Redirect to="/login" />
  if(showComponent)
    return <Redirect to="/profile" />
  return <div>
    
      <button
        className="btn btn-outline-success my-2 my-sm-0 btn-sm"
        type="submit"
        onClick={_onButtonClick}
      >
      My Profile
      </button>
  </div>;
  
}

export default Index;
