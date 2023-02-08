import React, { Component } from "react";

export class CollegeComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="listcontainer">
        <div id="listwrapper">{this.props.content}</div>
      </div>
    );
  }
}

export default CollegeComp;
