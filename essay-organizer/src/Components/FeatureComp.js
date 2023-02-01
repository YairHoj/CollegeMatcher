import React, { Component } from "react";
import "../FeatureComp.css";

export class FeatureComp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="featurecomp" className={this.props.class}>
        <img src={this.props.image}></img>
        {this.props.text}
      </div>
    );
  }
}

export default FeatureComp;
