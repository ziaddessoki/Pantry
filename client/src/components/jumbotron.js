import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import jumbo from "../images/jumbo.png";

function Jumbo() {
  return (
    <div>
      <Jumbotron
        style={{
          width: "80%",
          height: "400px",
          backgroundColor: " rgba(107, 170, 117, 0.751)",
          borderRadius: "10%",
          margin:'8% auto',
          position:"relevant"
        }}
      >
        <h1 style={{ fontFamily: "'Cairo', sans-serif", fontSize: "30pt" ,color:"white"}}>
          Welcome to Pantry!
        </h1>
        <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: "14pt",position:"absolute",color:"white",
            top:"43%",
            left:"12%" }}>
          Life is hectic.Pantry is a customizable cooking <br/> experience that allows
          our users to make delicious <br/> food without too much thought. Pantry
          provides <br/> access to hundreds of recipes depending on the <br/> groceries you
          have access to at home. Whether you <br/> are a college student with a tight
          budget or someone <br/> with a passion for food, Pantry makes cooking fun <br/>
          again by making your day to day a little easier.
        </p>
        <img
          src={jumbo}
          alt=""
          width="350px"
          style={{
            position:"absolute",
            top:"32%",
            right:"12%",
            // marginLeft: "490px",
            // marginTop: "-400px",
            borderRadius: "10%"
          }}
        />
      </Jumbotron>
    </div>
  );
}
export default Jumbo;
