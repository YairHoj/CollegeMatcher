import React from "react";
import "../Looking.css";
import arrow from "../Arrow.svg";
import topwave from "../wave-3.jpg";

function Looking() {
  return (
    <div id="lookingdiv">
      <h1>Looking to find a college?</h1>
      <h2>Try our college browser here!</h2>
      <img src={arrow}></img>
      <a href="/browse" id="browsebutton">
        Get Started
      </a>
      <img src={topwave} id="wave3"></img>
    </div>
  );
}

export default Looking;
