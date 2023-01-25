import React, { useState, useEffect } from "react";
import College from "./College";
import Axios from "axios";

let collegesArray = [];
let i = 0;
function CollegeList() {
  const [text, setText] = useState([]);
  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:5001/api", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
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
          {/* <div id="new-college">
            <p>Dont see your college? Add a custom college here:</p>
            <form>
              {" "}
              <input id="custom-college">Add college</input>
            </form> */}
          {/* </div> */}
        </ol>
      </div>
    </div>
  );
}

export default CollegeList;
