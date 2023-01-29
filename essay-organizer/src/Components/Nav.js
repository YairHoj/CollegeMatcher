import React from "react";
import "../App.css";
import logo from "../logo.png";
import GoogleSignIn from "./GoogleSignIn";
import burger from "../Hamburger_icon.svg.png";

function Nav() {
  function handleClick(e) {
    e.preventDefault();
    let menu = document.getElementById("menu2");
    menu.style.display = "flex";
    menu.style.alignItems = "center";
    menu.style.justifyContent = "center";
    let page = document.getElementById("page");
    page.style.display = "none";
  }
  return (
    <div>
      <div className="flex-container">
        <a href="/" className="logoroute">
          <div className="logodiv">
            <img className="logo" src={logo} />
            <h1 className="logotext">EssayHub</h1>
          </div>
        </a>

        <div className="linkdiv">
          <a href="/" className="navtext" id="home">
            Home
          </a>
          <a href="/browse" className="navtext" id="browsecolleges">
            Browse Colleges
          </a>
          <a href="/essaymanager" className="navtext" id="essaymanager">
            Essay Manager
          </a>
          <div className="buttondiv">
            <GoogleSignIn />
          </div>
          <button className="burgerbutton" onClick={handleClick}>
            <img src={burger} className="burgerimage"></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
