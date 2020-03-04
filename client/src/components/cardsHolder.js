import React from "react";
import { Container} from "react-bootstrap";
import HowItWorksCards from "./cards"


function HowItWorks() {
    return(
        <Container>
        {/* <h1>How It Works</h1> */}
        <HowItWorksCards />
      </Container>
    )
}


export default HowItWorks;
