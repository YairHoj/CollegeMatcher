import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import College from "./College";

let collegesArray = [];
let myCollegesList = [];
let firstExec = true;

let i = 0;

function CollegeList() {
  const ref = useRef(null);

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

  const [inputDATA, setInputData] = useState(" ");

  const addElementToArray = async () => {
    const textInput = ref.current.value;
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
    <div>
      <div className="search-header">
        <div className="search-text">Search:</div>
        <input id="search-box" onChange={filterBySearch} />
      </div>

      <div id="item-list">
        <ol>
          <div>
            <div>
              {/* <label htmlFor="new-college">
                Don't see your college? Add your own custom college here:{" "}
              </label>
              <input type="text" id="custom-college" name="CustomCollege" />{" "}
              <button> Add college </button> */}
              <p> Don't see your college? Add your own custom college here: </p>
              <input
                placeholder="Enter College"
                onChange={(item) => setInputData(item)}
                ref={ref}
              />
              <button onClick={addElementToArray}>Add College</button>
            </div>
            <br />
          </div>
          {/* {text.map((item, index) => {
            return (
              <div key={index}>
                <p key={item.id}>{item.name}</p>
              </div>
            );
          })} */}
          {filteredList.map((item, index) => (
            <li key={index}>
              {item}{" "}
              <button
                id={item}
                onClick={() => {
                  onClick({ item });
                }}
              >
                {" "}
                Add college
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
export { myCollegesList };
export default CollegeList;
