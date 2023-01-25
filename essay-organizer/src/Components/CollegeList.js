import React, { useState, useEffect } from "react";
import { useRef } from "react";

import College from "./College";
import Axios from "axios";

let collegesArray = [];
let myCollegesList = [];

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

  // // Add college button
  // const addCollege = (college) => {
  //   console.log("executed.");
  //   console.log(college);
  //   myCollegesList.push(college)
  // };

  // Custom College Submit
  const [inputDATA, setInputData] = useState(" ");

  const addElementToArray = () => {
    const textInput = ref.current.value;
    myCollegesList.push(textInput);

    console.log(myCollegesList);
  };
  return (
    <div>
      <div className="search-header">
        <div className="search-text">Search:</div>
        <input id="search-box" onChange={filterBySearch} />
      </div>

      <div id="item-list">
        <ol>
          {/* {text.map((item, index) => {
            return (
              <div key={index}>
                <p key={item.id}>{item.name}</p>
              </div>
            );
          })} */}
          {filteredList.map((item, index) => (
            <li key={index}>
              {item}
              <button> Add college </button>
            </li>
          ))}
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
          </div>
        </ol>
      </div>
    </div>
  );
}

export default CollegeList;
