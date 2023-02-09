import React from "react";
import AddEssay from "./AddEssay";
import "../UsersEssays.css";
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase";

function CollegeEssays(props) {
  async function handleDelete() {
    const essays = await getDocs(
      collection(
        db,
        JSON.parse(sessionStorage.getItem("user")).email,
        `${props.name}`,
        "essays"
      )
    );
    essays.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    await deleteDoc(
      doc(db, JSON.parse(sessionStorage.getItem("user")).email, props.name)
    );
    if (props.name == sessionStorage.getItem("college")) {
      sessionStorage.removeItem("college");
    }
    window.location.reload();
  }
  return (
    <>
      <div className="useressay">
        <h5 id={props.name}>{props.name}</h5>
        <div id="addanddelete">
          <AddEssay id="addessaybutton" college={props.name} />
          <button id="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default CollegeEssays;
