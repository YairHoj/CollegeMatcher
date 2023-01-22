import React from "react";
import "../App.css";
import logo from "../logo.png";

function Nav() {
  return (
    <div className="flex-container">
      <div className="logodiv">
        <img className="logo" src={logo} />
        <h1 className="logotext">EssayHub</h1>
      </div>
      <div className="linkdiv">
        <h2 className="home">Home</h2>
        <h2 className="browsecolleges">Browse Colleges</h2>
        <h2 className="essaymanager">Essay Manager</h2>
        <div className="buttondiv">
          <a href="-" className="Login">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}

export default Nav;
