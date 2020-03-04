import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import jumbo from "../images/jumbo.png";
import { textAlign } from "@material-ui/system";
function Jumbo() {
  return (
    <div>
      <Jumbotron
        style={{
          width: "900px",
          height: "400px",
          backgroundColor: "#bc7",
          borderRadius: "6%",
          marginTop:"8%",
          marginLeft:"18%",
          
          
        }}
      >
        <h1 style={{fontFamily:"Bradley Hand, cursive", fontSize:"30pt"}} >Welcome to Pantry!</h1>
        <p style={{fontFamily:"Bradley Hand, cursive", fontSize:"16pt"}}>
          Pantry was designed to make cooking easier
          <br /> and more effienct. With access to hundreds <br /> of different
          recipe types, Pantry caters to <br /> anyone from college students on
          a budget, <br /> to those who just love cooking.
        </p>
        <img
          src={jumbo}
          alt=""
          width="350px"
          style={{
            marginLeft: "490px",
            marginTop: "-210px",
            borderRadius: "10%"
          }}
        />
      </Jumbotron>
    </div>
  );
}
export default Jumbo;
