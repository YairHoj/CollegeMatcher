import React from "react";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

function TextEditor(props) {
  const [text, setText] = useState(props.text);
  const [currCount, setCurrCount] = useState();
  const [color, setColor] = useState();
  let prompt = props.prompt;
  let countType = props.countType;
  let currentCount = props.currentCount;
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
    let textBox = e.target.value;
    console.log(countType);
    if (countType == "Word Count") {
      let wordArr = textBox.split(" ");
      let wordCount = 0;
      // Word Count Variable ^
      for (let word of wordArr) {
        if (/[a-zA-Z0-9]/.test(word)) wordCount += 1;
      }
      currentCount = wordCount;
      setCurrCount(currentCount);
    }

    if (countType == "Character Count") {
      let currentChars = textBox.length;
      // Character Count Variable^
      currentCount = currentChars;
      setCurrCount(currentCount);
    }
    if (currentCount >= Number(count) + 1) {
      setColor("red");
    } else {
      setColor("green");
    }
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
      <p style={{ color: color }}>
        {currCount} / {count} {countType}{" "}
      </p>

      <button id="save" onClick={handleSave}>
        Save
      </button>
    </>
  );
}

export default TextEditor;
