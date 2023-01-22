import React from "react";
import "../App.css";
import logo from "../logo.png";

function Nav() {
  return (
    <div className="navdiv">
      <img className="logo" src={logo} />
      <h1 className="logotext">EssayHub</h1>
      <h2 className="home">Home</h2>
    </div>
  );
}

export default Nav;
