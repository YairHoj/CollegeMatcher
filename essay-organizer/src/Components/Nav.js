import React from "react";
import "../App.css";
import logo from "../logo.png";
import GoogleSignIn from "./GoogleSignIn";

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
        <a href="/essayManager">
          <h2 className="essaymanager">Essay Manager</h2>
        </a>
        <GoogleSignIn />
      </div>
    </div>
  );
}

export default Nav;
