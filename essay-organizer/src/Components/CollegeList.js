import React, { useState, useEffect } from "react";
import College from "./College";

function CollegeList() {
  const [text, setText] = useState([]);
  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      return setText(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      {text.map((item, index) => {
        return (
          <div key={index}>
            <College name={item.name} />
          </div>
        );
      })}
    </div>
  );
}

export default CollegeList;
