import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function GoogleSignIn() {
  const [loggedIn, setLoggedIn] = useState(false);
  function handleCallbackResponse(response) {
    let userObject = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(userObject));
    document.getElementById("signInDiv").hidden = true;
    setLoggedIn(true);
  }
  function handleSignOut() {
    localStorage.removeItem("user");
    document.getElementById("signInDiv").hidden = false;
    setLoggedIn(false);
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "663727590805-3bnfgputoi2a1t0dt40m9aeim6pnemuc.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      type: "standard",
      shape: "pill",
      theme: "outline",
      text: "signin",
      size: "large",
      logo_alignment: "left",
    });
  }, []);
  return (
    <>
      <div id="signInDiv"></div>
      {loggedIn && (
        <button id="signOut" onClick={handleSignOut}>
          Sign Out
        </button>
      )}
    </>
  );
}

export default GoogleSignIn;
