import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

function Index () {
  const [authorized,setAuthorized] = useState(false);
  useEffect(()=>{
    const requestOptions = {
      method: "get",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      credentials: "include",
    };
    fetch("http://localhost:8085/authenticate",requestOptions)
    .then((res)=>{
      if(res.status === 200)
        setAuthorized(true);
    })
  });
  
  if(!authorized)
    return <Redirect to="/login" />
  return <div>
    <a  href="/login">
      <button
        className="btn btn-outline-success my-2 my-sm-0 btn-sm"
        type="submit"
      >
      Login
      </button>
    </a>
  </div>;
  
}

export default Index;
