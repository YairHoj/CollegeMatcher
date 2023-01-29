import React from "react";
import "../App.css";
import headingimage from "../students_schoool_footer2.png";

export default function Heading() {
  return (
    <>
      <div className="container">
        <div className="headingdiv">
          <h1 className="mainheading">
            F*ck the Common App. Be more organized and efficient using our Essay
            Manager.
          </h1>
          <img src={headingimage} className="image"></img>
        </div>
      </div>
    </>
  );
}
