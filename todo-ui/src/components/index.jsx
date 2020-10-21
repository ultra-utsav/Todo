import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// import "./index.css";
function Index (props) {
  const [showComponent,setShowComponent] = useState(false);
  
  const _onButtonClick = () => {
    setShowComponent(true);
  }

  if(!props.user.authorized)
    return <Redirect to="/" />
  if(showComponent) {
    return <Redirect to="/profile" />
  }
    
    
  return (
  <div className="App bgimg" style={{marginTop:"15%"}}>
    <div >
      <div >
        <h1 class="w3-jumbo w3-animate-top">DONT BE YOURSELF FREE</h1>
        <hr class="w3-border-grey" style={{margin:"auto",width:"40%"}} />
        <p class="w3-large w3-center">Track your todos with TODOS</p>
        </div>
    </div>
    <div>
      <button
        className="btn btn-outline-success my-2 my-sm-0 btn-sm"
        onClick={_onButtonClick}
      >
      My Todos
      </button>
    </div>
  </div>
  );
}

const mapStateToProps = state=> {
  return {
    user : state.user
  }
}

export default connect(mapStateToProps)(Index);
