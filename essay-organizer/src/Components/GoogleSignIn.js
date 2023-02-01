import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function GoogleSignIn() {
  const [loggedIn, setLoggedIn] = useState(false);
  function handleCallbackResponse(response) {
    let userObject = jwt_decode(response.credential);
    sessionStorage.setItem("user", JSON.stringify(userObject));
    document.getElementById("signInDiv").hidden = true;
    setLoggedIn(true);
    window.location.reload();
  }
  function handleSignOut() {
    sessionStorage.clear();
    document.getElementById("signInDiv").hidden = false;
    setLoggedIn(false);
    window.location.reload();
  }
  useEffect(() => {
    /* global google */
    if (sessionStorage.getItem("user") == null) {
      google.accounts.id.initialize({
        client_id:
          "933680585770-10606er9mo2jh42q4kqv34nk2aeoh7pn.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        type: "standard",
        shape: "pill",
        theme: "outline",
        text: "signin",
        size: "medium",
        logo_alignment: "left",
      });
    } else {
      setLoggedIn(true);
      document.getElementById("signInDiv").hidden = true;
    }
  }, []);
  return (
    <>
      <div id="signInDiv"></div>
      {loggedIn && (
        <button id="signOut" onClick={handleSignOut}>
          <h1 id="signOutText">Sign Out</h1>
        </button>
      )}
    </>
  );
}

export default GoogleSignIn;
