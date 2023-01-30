import React from "react";

function textEditor(props) {
  let prompt = props.prompt;
  let countType = props.countType;
  let count;
  let school = props.school;
  if (countType == "Word Count") {
    count = props.count;
  } else if (countType == "Character Count") {
    count = props.count;
  } else {
    count = 0;
  }
  return (
    <>
      <h3>{prompt}</h3>
      <h6>{school}</h6>
      <textarea
        name={prompt}
        rows={30}
        cols={50}
        value={text}
      ></textarea>
      <p>{count}</p>
    </>
  );
}

export default textEditor;
