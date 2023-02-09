import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import College from "./College";
import "../Browse.css";
import search from "../search.svg";
import plus from "../plus.png";
import CollegeComp from "./CollegeComp";

let collegesArray = [];
let myCollegesList = [];
let firstExec = true;

let i = 0;

function CollegeList() {
  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      sessionStorage.setItem("previousPage", "http://localhost:3000/browse");
      window.location = "http://localhost:3000/signIn";
    }
  });

  const ref = useRef(null);
  const [inputData, setInputData] = useState(" ");

  const [text, setText] = useState([]);
  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:5001/api", {
        method: "GET",
      });
      const data = await response.json();
      // console.log(data);
      for (let q = 0; i < 3202; i++) {
        collegesArray.push(data[i].name);
      }

      return setText(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  // for (let i = 0; i < 3201; i++) {
  //   collegesArray.pop();
  // }

  // Search and filter function
  const [filteredList, setFilteredList] = new useState(collegesArray);

  function handleChange(e) {
    setInputData(e.target.value);
  }

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...collegesArray];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    // Trigger render with updated values
    setFilteredList(updatedList);
  };

  // Add college button

  // Custom College Submit

  const addElementToArray = async () => {
    const textInput = inputData;
    myCollegesList.push(textInput);
    if (hasDuplicates(myCollegesList)) {
      console.log("Duplicate elements found.");
      alert("You have already added this college");
      myCollegesList.pop();
    } else {
      console.log("No Duplicates found.");
    }
    myCollegesList.sort();
    console.log(myCollegesList);
    try {
      await setDoc(
        doc(db, JSON.parse(sessionStorage.getItem("user")).email, textInput),
        {
          collegeName: textInput,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    try {
      await setDoc(
        doc(
          db,
          JSON.parse(sessionStorage.getItem("user")).email,
          textInput,
          "essays",
          "exists"
        ),
        {
          exists: true,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setInputData("");
  };

  const onClick = async (college) => {
    myCollegesList.push(college.item);
    if (hasDuplicates(myCollegesList)) {
      console.log("Duplicate elements found.");
      alert("You have already added this college");
      myCollegesList.pop();
    } else {
      console.log("No Duplicates found.");
    }
    myCollegesList.sort();
    console.log(myCollegesList);
    try {
      await setDoc(
        doc(db, JSON.parse(sessionStorage.getItem("user")).email, college.item),
        {
          collegeName: college.item,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    try {
      await setDoc(
        doc(
          db,
          JSON.parse(sessionStorage.getItem("user")).email,
          college.item,
          "essays",
          "exists"
        ),
        {
          exists: true,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Checks for duplicate colleges in college list
  function hasDuplicates(arr) {
    return new Set(arr).size !== arr.length;
  }

  return (
    <div id="page3">
      <div className="search-header">
        <div className="search-text">Find your college</div>
        <div className="search-container">
          <div className="search-image">
            <img src={search}></img>
          </div>
          <input
            className="search-box"
            onChange={filterBySearch}
            onInput={console.log("input detected")}
            placeholder={"Browse Colleges..."}
          />
        </div>
      </div>

      <div id="item-list">
        <div id="addown">
          <div id="addown2">
            {/* <label htmlFor="new-college">
                Don't see your college? Add your own custom college here:{" "}
              </label>
              <input type="text" id="custom-college" name="CustomCollege" />{" "}
              <button> Add college </button> */}
            <p> Don't see your college? Add your own custom college here: </p>
            <div id="search-wrapper">
              <div className="search-container">
                <div className="search-image">
                  <button onClick={addElementToArray} className="search-image">
                    <img src={plus}></img>
                  </button>
                </div>
              </div>
              <input
                className="search-box"
                placeholder="Enter College"
                onChange={handleChange}
                value={inputData}
              />
            </div>
          </div>
          <br />
        </div>
        <ol>
          <CollegeComp
            content={filteredList.map((item, index) => (
              <div className="collegecompwrapper">
                <li key={index} className="li">
                  {item}{" "}
                  <button
                    id={item}
                    className="collegebutton"
                    onClick={() => {
                      onClick({ item });
                    }}
                  >
                    {" "}
                    Add
                  </button>
                </li>
              </div>
            ))}
          />
        </ol>
      </div>
    </div>
  );
}
export { myCollegesList };
export default CollegeList;
