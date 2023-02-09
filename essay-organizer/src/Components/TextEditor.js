import React from "react";
import { useState, useEffect } from "react";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase";

function TextEditor(props) {
  const [text, setText] = useState(props.text);
  let prompt = props.prompt;
  let countType = props.countType;
  let currentCount = props.currentCount;
  let count = props.count;
  let college = props.college;
  const [typing, setTyping] = useState(false);
  const [saved, setSaved] = useState("Not Saved");

  useEffect(() => {
    if (!typing) {
      handleSave();
    }
  }, [typing]);

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
    setSaved("Saved");
  }

  function handleChange(e) {
    setSaved("Not Saved");
    handleTyping();
    setText(e.target.value);
    let textBox = e.target.value;
    console.log(currentCount);
    if (countType == "Words") {
      let wordArr = textBox.split(" ");
      let wordCount = 0;
      // Word Count Variable ^
      for (let word of wordArr) {
        if (/[a-zA-Z0-9]/.test(word)) wordCount += 1;
      }
      currentCount = wordCount;
    }

    if (countType == "Characters") {
      let currentChars = textBox.length;
      // Character Count Variable^
      currentCount = currentChars;
    }
  }

  function handleTyping() {
    let stillTyping;
    if (!typing) {
      setTyping(true);
      stillTyping = setTimeout(() => {
        setTyping(false);
      }, 3000);
    } else {
      clearTimeout(stillTyping);
      stillTyping = setTimeout(() => {
        setTyping(false);
      }, 3000);
    }
  }

  async function handleDelete() {
    await deleteDoc(
      doc(
        db,
        JSON.parse(sessionStorage.getItem("user")).email,
        college,
        "essays",
        `${prompt}`
      )
    );
    window.location.reload();
  }

  return (
    <>
      <h3>{prompt}</h3>
      <textarea
        name={prompt}
        rows={30}
        cols={50}
        value={text}
        onChange={handleChange}
      ></textarea>
      <p>
        {currentCount} / {count} {countType}{" "}
      </p>
      <button id="delete" onClick={handleDelete}>
        Delete
      </button>
      <h4>{saved}</h4>
    </>
  );
}

export default TextEditor;
