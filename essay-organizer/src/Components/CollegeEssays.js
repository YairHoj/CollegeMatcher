import React from "react";
import AddEssay from "./AddEssay";
import "../UsersEssays.css";

function CollegeEssays(props) {
  return (
    <>
      <div className="useressay">
        <h5 id={props.name}>{props.name}</h5>
        <AddEssay id="addessaybutton" college={props.name} />
      </div>
    </>
  );
}

export default CollegeEssays;
