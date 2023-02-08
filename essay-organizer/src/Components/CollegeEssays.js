import React from "react";
import AddEssay from "./AddEssay";

function CollegeEssays(props) {
  return (
    <>
      <h5>{props.name}</h5>
      <AddEssay college={props.name}/>
    </>
  );
}

export default CollegeEssays;
