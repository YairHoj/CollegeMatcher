import React from "react";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

function TextEditor(props) {
  const [text, setText] = useState(props.text);
  let prompt = props.prompt;
  let countType = props.countType;
  let count = props.count;
  let college = props.college;

  async function handleSave() {
    try {
      await setDoc(
        doc(
          db,
          JSON.parse(sessionStorage.getItem("user")).email,
          college,
          "essays",
          `${prompt}`
        ),
        {
          text,
          countType,
          count,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <h3>{prompt}</h3>
      {/* <h6>{college}</h6> */}
      <textarea
        name={prompt}
        rows={30}
        cols={50}
        value={text}
        onChange={handleChange}
      ></textarea>
      <p>
        {count} {countType}
      </p>
      <button id="save" onClick={handleSave}>
        Save
      </button>
    </>
  );
}

export default TextEditor;
