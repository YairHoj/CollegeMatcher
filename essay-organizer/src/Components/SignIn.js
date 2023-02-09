import React from "react";
import GoogleSignIn from "./GoogleSignIn";
import { useEffect } from "react";
import "../UsersEssays.css";
import home from "../home.png";

function SignIn() {
  useEffect(() => {
    if (sessionStorage.getItem("user") != null) {
      window.location = sessionStorage.getItem("previousPage");
    }
  });
  return (
    <>
      <div id="page4">
        <div id="signindiv">
          <h1 id="signintext">Please sign in</h1>
          <GoogleSignIn />
          <a href="/">
            <img src={home} id="homebutton"></img>
          </a>
        </div>
      </div>
    </>
  );
}

export default SignIn;
