import React from "react";
import { useState, useEffect } from "react";
import CollegeEssays from "./CollegeEssays";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase";
import TextEditor from "./TextEditor";

function EssayManager() {
  const [college, setCollege] = useState();
  const [collegeList, setColleges] = useState([]);
  const [essayList, setEssays] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      sessionStorage.setItem(
        "previousPage",
        "http://localhost:3000/essaymanager"
      );
      window.location = "http://localhost:3000/signIn";
    }
  });
  useEffect(() => {
    async function loadUser() {
      const colleges = await getDocs(
        collection(db, JSON.parse(sessionStorage.getItem("user")).email)
      );
      colleges.forEach((doc) => {
        if (doc.id != "user") {
          setColleges((current) => [
            ...current,
            <div
              className="collegedivclass"
              id={doc.id}
              key={doc.id}
              onClick={() => changeCollege(doc.id)}
            >
              <CollegeEssays name={doc.id} />
            </div>,
          ]);
        }
      });
    }
    loadUser();
  }, []);
  useEffect(() => {
    async function loadEssays() {
      setEssays([]);
      const essays = await getDocs(
        collection(
          db,
          JSON.parse(sessionStorage.getItem("user")).email,
          `${college}`,
          "essays"
        )
      );
      essays.forEach((doc) => {
        if (doc.id != "exists") {
          setEssays((current) => [
            ...current,
            <li key={doc.id}>
              <TextEditor
                prompt={doc.id}
                text={doc.data().text}
                count={doc.data().count}
                countType={doc.data().countType}
                college={college}
              />
            </li>,
          ]);
        }
      });
    }
    if (college != undefined) {
      loadEssays();
    }
  }, [college]);
  async function changeCollege(id) {
    setCollege(id);
  }
  return (
    <>
      {collegeList.length > 0 ? (
        <div id="page3">
<<<<<<< HEAD
          <ul id="listul">
            {collegeList}
            <h6>
              Note: New essays will only show up <br></br>when the college is
              clicked again
            </h6>
          </ul>

          <ul id="essaylist">
            <h1 id="collegename">{college}</h1>
            {essayList}
          </ul>
=======
          <ul id="listul">{collegeList}</ul>
          <div id="essaylistdiv">
            <h1 id="collegename">{college}</h1>
            <ul id="essaylist">{essayList}</ul>
          </div>
          <h6>
            *New essays will only show up when the college is clicked again
          </h6>
          <h1 id="collegename">{college}</h1>
          <ul>{essayList}</ul>
>>>>>>> cc252faf3b7a8062b500973a66a0c05ba7f983e3
        </div>
      ) : (
        <h1 id="nocolleges">No Colleges in List</h1>
      )}
    </>
  );
}
export default EssayManager;
