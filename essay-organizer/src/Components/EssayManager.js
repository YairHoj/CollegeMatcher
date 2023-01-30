import React from "react";

function EssayManager() {
  function handleAdd() {
    document.getElementById("form").hidden = false;
  }
  function handleChange() {
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
  }
  return (
    <>
      <button id="addEssay" onClick={handleAdd}>
        Add Essay
      </button>
      <div id="form" hidden>
        <h3>Add an essay</h3>
        <form>
          <label for="prompt">Prompt:</label>
          <input type="text" id="prompt" name="prompt" />
          <br />
          <fieldset onChange={handleChange}>
            <legend>Count Type</legend>
            <input
              type="radio"
              id="wordCount"
              name="countType"
              value="Word Count"
            />
            <label for="wordCount">Word Count</label>
            <br />
            <input
              type="radio"
              id="charCount"
              name="countType"
              value="Character Count"
            />
            <label for="charCount">Character Count</label>
            <br />
            <input
              type="radio"
              id="noCount"
              name="countType"
              value="No Count"
            />
            <label for="noCount">No Count</label>
            <br />
          </fieldset>
          <label for="count" id="countLabel" hidden>
            Count:{" "}
          </label>
          <input type="text" id="count" name="count" hidden />
          <br />
          {/* <label for="college">College:</label>
        <select id="colleges" name="colleges">
          <option value="default" selected>
            Choose A College
          </option>
        </select> */}
          <input type="submit" value="Add" />
        </form>
      </div>
    </>
  );
}

export default EssayManager;
