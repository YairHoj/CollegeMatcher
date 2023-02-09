import React from "react";
import { useState, useEffect } from "react";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase";
import "../UsersEssays.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NotificationManager } from "react-notifications";

function TextEditor(props) {
  const [text, setText] = useState(props.text);
  const [currCount, setCurrCount] = useState();
  const [color, setColor] = useState();
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

  let actualCount;

  useEffect(() => {
    let textBox = text;
    console.log(countType);
    if (countType == "Word Count") {
      let wordArr = textBox.split(" ");
      let wordCount = 0;
      // Word Count Variable ^
      for (let word of wordArr) {
        if (/[a-zA-Z0-9]/.test(word)) wordCount += 1;
      }
      actualCount = wordCount;
      currentCount = wordCount + " /";

      setCurrCount(currentCount);
    }

    if (countType == "Character Count") {
      let currentChars = textBox.length;
      // Character Count Variable^
      actualCount = currentChars;

      currentCount = currentChars + " /";
      setCurrCount(currentCount);
    }
    if (actualCount >= Number(count) + 1) {
      setColor("red");
    } else {
      setColor("0099ff");
    }
  }, []);
  function handleChange(e) {
    setSaved("Not Saved");
    handleTyping();
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
      actualCount = wordCount;

      currentCount = wordCount + " /";
      setCurrCount(currentCount);
    }

    if (countType == "Character Count") {
      let currentChars = textBox.length;
      // Character Count Variable^
      actualCount = currentChars;

      currentCount = currentChars + " /";
      setCurrCount(currentCount);
    }
    if (actualCount >= Number(count) + 1) {
      setColor("red");
    } else {
      setColor("#0099ff");
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
      <h3 id="prompth3">Prompt: {prompt}</h3>
      {/* <h6>{college}</h6> */}
      <textarea
        name={prompt}
        rows={30}
        cols={50}
        value={text}
        onChange={handleChange}
        id={prompt}
      ></textarea>
      <p id="wordcount" style={{ color: color }}>
        {currCount} {count} {countType}{" "}

      </p>
      <div id="essaybuttons">
            <button id="save" onClick={handleDelete}>
        Delete
      </button>
        <CopyToClipboard
          text={text}
          onCopy={() =>
            NotificationManager.success(
              "Successfully copied to clipboard.",
              "Success!",
              3000
            )
          }
        >
          <button id="save">Copy to clipboard</button>
        </CopyToClipboard>
        <h4 id="autosave">{saved}</h4>
      </div>
    </>
  );
}

export default TextEditor;
