import "./App.css";
import Nav from "./Components/Nav";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

function App() {
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
      theme: "outline",
      size: "large",
    });
  }, []);
  return (
    <div className="App">
      <Nav />
      <div id="signInDiv"></div>
      {loggedIn && (
        <div>
          <img src={JSON.parse(localStorage.getItem("user")).picture}></img>
          <h3>{JSON.parse(localStorage.getItem("user")).name}</h3>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
}

export default App;
