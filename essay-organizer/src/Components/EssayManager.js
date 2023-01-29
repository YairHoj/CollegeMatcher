import React from "react";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
import Nav from "./Nav";

function EssayManager() {
  const [text, setText] = useState("");
  useEffect(() => {
    const loadText = async () => {
      let userExists = false;
      let userText;
      const query = await getDocs(collection(db, "essay"));
      query.forEach((doc) => {
        if (
          doc.data().email == JSON.parse(sessionStorage.getItem("user")).email
        ) {
          userExists = true;
          userText = doc.data().text;
        }
      });
      if (userExists) {
        setText(userText);
      }
    };
    loadText();
  }, []);
  const handleChange = (event) => {
    setText(event.target.value);
  };
  const save = async () => {
    let userExists = false;
    let docId;
    const query = await getDocs(collection(db, "essay"));
    query.forEach((doc) => {
      if (
        doc.data().email == JSON.parse(sessionStorage.getItem("user")).email
      ) {
        userExists = true;
        docId = doc.id;
        console.log(doc.data().text);
      }
    });
    if (userExists) {
      const docRef = doc(db, "essay", docId);
      const data = {
        text: text,
        email: JSON.parse(sessionStorage.getItem("user")).email,
      };
      await setDoc(docRef, data);
    } else {
      try {
        const docRef = await addDoc(collection(db, "essay"), {
          text: text,
          email: JSON.parse(sessionStorage.getItem("user")).email,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  return (
    <>
      <Nav />
      {sessionStorage.getItem("user") === null ? (
        <div>
          <h1>Please Sign In</h1>
        </div>
      ) : (
        <div>
          <textarea
            name="essay"
            rows={30}
            cols={50}
            value={text}
            onChange={handleChange}
          ></textarea>
          <button onClick={save}>Save</button>
        </div>
      )}
    </>
  );
}

export default EssayManager;
