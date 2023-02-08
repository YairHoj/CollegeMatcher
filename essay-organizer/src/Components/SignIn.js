import React from "react";
import GoogleSignIn from "./GoogleSignIn";
import { useEffect } from "react";

function SignIn() {
  useEffect(() => {
    if (sessionStorage.getItem("user") != null) {
      window.location = sessionStorage.getItem("previousPage");
    }
  });
  return (
    <>
      <h1>Please Sign In</h1>
      <GoogleSignIn />
    </>
  );
}

export default SignIn;
