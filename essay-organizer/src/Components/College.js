import React, { Component } from "react";

export class College extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
    };
  }
  render() {
    return <div>College Name: </div>;
  }
}

export default College;
