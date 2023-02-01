import React from "react";
import TextEditor from "./TextEditor";
import { useState, useEffect } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";

function EssayManager() {
  const [prompt, setPrompt] = useState("");
  const [countType, setCountType] = useState();
  const [count, setCount] = useState("");
  // const [college, setCollege] = useState();
  const [essays, setEssays] = useState([]);

  useEffect(() => {
    async function loadUser() {
      const querySnapshot = await getDocs(
        collection(
          db,
          JSON.parse(sessionStorage.getItem("user")).email,
          "College",
          "Essays"
        )
      );
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().text}`);
      });
    }
    loadUser();
  }, []);

  function handleAdd() {
    document.getElementById("form").hidden = false;
  }

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
      setCount(0);
      document.getElementById("countLabel").hidden = true;
      document.getElementById("count").hidden = true;
    }
    setCountType(e.target.value);
  }

  function handleCount(e) {
    setCount(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEssays(
      essays.concat(
        <TextEditor
          prompt={prompt}
          countType={countType}
          count={count}
          key={essays.length}
        />
      )
    );
    document.getElementById("form").hidden = true;
  }

  return (
    <>
      <button id="addEssay" onClick={handleAdd}>
        Add Essay
      </button>
      <div id="form" hidden>
        <h3>Add an essay</h3>
        <form>
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
          {/* <label for="college">College:</label>
        <select id="colleges" name="colleges">
          <option value="default" selected>
            Choose A College
          </option>
        </select> */}
          <input type="submit" value="Add" onClick={handleSubmit} />
        </form>
      </div>
      <div id="essays">{essays}</div>
    </>
  );
}

export default EssayManager;
