import React from "react";
import topwave from "../wavebluetop.jpg";
import "../App.css";
import FeatureComp from "./FeatureComp";
import snap from "../Snap.png";
import target from "../target.png";
import file from "../file.png";
import check from "../check.png";
import bottomwave from "../Vector.jpg";

function Features() {
  const setuptext = (
    <p>
      Free and<br></br>Easy Setup
    </p>
  );
  const targettext = (
    <p>
      Effortless<br></br>
      Navigation
    </p>
  );
  const filetext = (
    <p>
      Simple File<br></br>
      Manager
    </p>
  );
  const checktext = (
    <p>
      Save Your<br></br>
      Progress
    </p>
  );
  return (
    <div>
      <img src={topwave} id="wave1"></img>
      <div id="featuresdiv">
        <h1>Our Features</h1>
        <div id="featureselementsdiv">
          <FeatureComp image={snap} text={setuptext} />
          <FeatureComp image={target} text={targettext} />
          <FeatureComp image={file} text={filetext} />
          <FeatureComp image={check} text={checktext} class="lastcomponent" />
        </div>
      </div>
      <img src={bottomwave} id="wave2"></img>
    </div>
  );
}

export default Features;
