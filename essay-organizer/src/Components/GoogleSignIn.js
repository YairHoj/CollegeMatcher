import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";

function GoogleSignIn() {
  const [loggedIn, setLoggedIn] = useState(false);
  async function handleCallbackResponse(response) {
    let userObject = jwt_decode(response.credential);
    sessionStorage.setItem("user", JSON.stringify(userObject));
    document.getElementById("signInDiv").hidden = true;
    setLoggedIn(true);
    try {
      await setDoc(
        doc(db, JSON.parse(sessionStorage.getItem("user")).email, "user"),
        {
          user: sessionStorage.getItem("user"),
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
        size: "large",
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
          Sign Out
        </button>
      )}
    </>
  );
}

export default GoogleSignIn;
