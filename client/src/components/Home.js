import React from "react";
import  Jumbo  from "./jumbotron"
import HowItWorks from "./cardsHolder";



class Home extends React.Component {
    render() {
      return (
        <div >
          <Jumbo/>
          <HowItWorks/>
        </div>
      );
    }
  }
  
  export default Home;