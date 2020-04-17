import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { Card } from "react-bootstrap";


function Cards() {
  return (
    <div style={{ textAlign: "center", margin: "5%", marginTop:"15%" }}>
      <Card style={{ width: "18rem", display: "inline-block", margin: "5%",borderRadius:"10%", fontFamily:"Bradley Hand, cursive",backgroundColor: "#bc7"  }}>
        <Card.Img
          variant="top"
          src="https://image.flaticon.com/icons/svg/35/35640.svg"
          height="200px"
          width="180px"
        />
        <Card.Title style={{fontSize:"20pt"}}>Add Ingredients To Pantry</Card.Title>
      </Card>
      <Card style={{ width: "18rem", display: "inline-block", margin: "5%",borderRadius:"10%", fontFamily:"Bradley Hand, cursive",backgroundColor: "#bc7"  }}>
        <Card.Img
          variant="top"
          src="https://image.flaticon.com/icons/svg/348/348770.svg"
          height="200px"
          width="180px"
        />
        <Card.Title style={{fontSize:"20pt"}}>Search Recipes <br></br> List</Card.Title>
      </Card>
      <Card style={{ width: "18rem", display: "inline-block", margin: "5%",borderRadius:"10%", fontFamily:"Bradley Hand, cursive",backgroundColor: "#bc7"  }}>
        <Card.Img
          variant="top"
          src="https://image.flaticon.com/icons/svg/1647/1647880.svg"
          height="200px"
          width="180px"
        />
        <Card.Title style={{fontSize:"20pt"}}>Save Recipes</Card.Title>
      </Card>
      
      </div>
  );
}

export default Cards;
