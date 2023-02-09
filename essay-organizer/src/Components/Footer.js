import React from "react";
import footerimg from "../footerimg.svg";
import "../Footer.css";

function Footer() {
  return (
    <div>
      <div id="footerdiv">
        <img src={footerimg}></img>
        <h1>
          Ditch the Common App and <br></br>manage your applications <br></br>
          easier.
        </h1>
      </div>
      <div id="copyrightdiv">
        <h5 id="copyright">Copyright © 2023 EssayHub</h5>
      </div>
    </div>
  );
}

export default Footer;
