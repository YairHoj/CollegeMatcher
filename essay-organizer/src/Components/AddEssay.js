import React from "react";
import Popup from "reactjs-popup";
import { useState } from "react";
import { db } from "../Firebase";
import { setDoc, doc } from "firebase/firestore";

function AddEssay(props) {
  const [prompt, setPrompt] = useState("");
  const [countType, setCountType] = useState();
  const [count, setCount] = useState("");
  const college = props.college;

  function handlePrompt(e) {
    setPrompt(e.target.value);
  }

  function handleCountType(e) {
    if (
      document.getElementById("wordCount").checked ||
      document.getElementById("charCount").checked
    ) {
      document.getElementById("countLabel").hidden = false;
      document.getElementById("count").hidden = false;
    } else {
      document.getElementById("countLabel").hidden = true;
      document.getElementById("count").hidden = true;
    }
    setCountType(e.target.value);
  }

  function handleCount(e) {
    setCount(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await setDoc(
        doc(
          db,
          JSON.parse(sessionStorage.getItem("user")).email,
          college,
          "essays",
          prompt
        ),
        {
          text: "",
          countType: countType,
          count: count,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <Popup id="popup" trigger={<button>Add Essay</button>} modal>
      {
        <div id="form">
          <form>
            <h3>Add an essay for {college}</h3>
            <label>Prompt:</label>
            <input type="text" value={prompt} onChange={handlePrompt} />
            <br />
            <fieldset onChange={handleCountType}>
              <legend>Count Type</legend>
              <input
                type="radio"
                name="countType"
                id="wordCount"
                value="Word Count"
              />
              <label>Word Count</label>
              <br />
              <input
                type="radio"
                name="countType"
                id="charCount"
                value="Character Count"
              />
              <label>Character Count</label>
              <br />
              <input
                type="radio"
                name="countType"
                id="noCount"
                value="No Count"
              />
              <label>No Count</label>
              <br />
            </fieldset>
            <label id="countLabel" hidden>
              Count:
            </label>
            <input
              type="text"
              value={count}
              id="count"
              onChange={handleCount}
              hidden
            />
            <br />
            <input type="submit" value="Add" onClick={handleSubmit} />
          </form>
        </div>
      }
    </Popup>
  );
}

export default AddEssay;
