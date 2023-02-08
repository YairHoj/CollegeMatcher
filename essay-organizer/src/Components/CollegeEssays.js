import React from "react";
import AddEssay from "./AddEssay";

function CollegeEssays(props) {
  return (
    <>
      <h5 id={props.name}>{props.name}</h5>
      <AddEssay college={props.name} />
    </>
  );
}

export default CollegeEssays;
