import React from "react";
<<<<<<< HEAD

import Jumbotron from "react-bootstrap/Jumbotron";
import jumbo from "../images/jumbo.png";
import { textAlign } from "@material-ui/system";
=======
import Jumbotron from "react-bootstrap/Jumbotron";
import jumbo from "../images/jumbo.png";
>>>>>>> f8827b352c391cd2420f65c5927147cb9a8e5086
function Jumbo() {
  return (
    <div>
      <Jumbotron
        style={{
          width: "900px",
          height: "400px",
          backgroundColor: "#bc7",
          borderRadius: "6%",
<<<<<<< HEAD
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
=======
          marginTop: "8%",
          marginLeft: "18%"
        }}
      >
        <h1 style={{ fontFamily: "Bradley Hand, cursive", fontSize: "30pt" }}>
          Welcome to Pantry!
        </h1>
        <p style={{ fontFamily: "Bradley Hand, cursive", fontSize: "16pt" }}>
          Life is hectic.Pantry is a customizable cooking <br/> experience that allows
          our users to make delicious <br/> food without too much thought. Pantry
          provides <br/> access to hundreds of recipes depending on the <br/> groceries you
          have access to at home. Whether you <br/> are a college student with a tight
          budget or someone <br/> with a passion for food, Pantry makes cooking fun <br/>
          again by making your day to day a little easier.
>>>>>>> f8827b352c391cd2420f65c5927147cb9a8e5086
        </p>
        <img
          src={jumbo}
          alt=""
          width="350px"
          style={{
            marginLeft: "490px",
<<<<<<< HEAD
            marginTop: "-210px",
=======
            marginTop: "-400px",
>>>>>>> f8827b352c391cd2420f65c5927147cb9a8e5086
            borderRadius: "10%"
          }}
        />
      </Jumbotron>
    </div>
  );
}
<<<<<<< HEAD
export default Jumbo;
=======
export default Jumbo;
>>>>>>> f8827b352c391cd2420f65c5927147cb9a8e5086
