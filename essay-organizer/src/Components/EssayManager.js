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
              onClick={changeCollege}
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
  async function changeCollege(e) {
    const prev = college;
    setCollege(e.target.id);
    if (college != prev) {
      setEssays([]);
    }
  }
  return (
    <>
      <div id="page">
        <ul id="listul">{collegeList}</ul>
        <h1 id="collegename">{college}</h1>
        <ul>{essayList}</ul>
      </div>
    </>
  );
}
export default EssayManager;
