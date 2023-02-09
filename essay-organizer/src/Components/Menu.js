import React from "react";
import "../App.css";
import x from "../xicon.png";
import GoogleSignIn from "./GoogleSignIn";

function Menu(props) {
  function handleClick(e) {
    e.preventDefault();
    let menu = document.getElementById("menu2");
    menu.style.display = "none";
    let page = document.getElementById(props.page);
    page.style.display = props.display1;
    let nav = document.getElementById("outercontainer");
    nav.style.display = "block";
  }
  return (
    <>
      <div id="menu2" className="menu2">
        <div className="menuitems">
          <a href="/" className="navtext2" id="text1">
            Home
          </a>
          <a href="/browse" className="navtext2" id="text">
            Browse Colleges
          </a>
          <a href="/essaymanager" className="navtext2" id="text">
            Essay Manager
          </a>
          <div className="buttondiv2"></div>
          <button id="xbutton" onClick={handleClick}>
            <img src={x} id="x" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Menu;
