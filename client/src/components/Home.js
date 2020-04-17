import React from "react";

import  Jumbo  from "./jumbotron"
import HowItWorks from "./cardsHolder";
import Footer from "./footer"


class Home extends React.Component {
    render() {
        return (
            <div >
              <Jumbo/>
              <HowItWorks/>
              <Footer/>
            </div>
          );
    }
  }
  
  export default Home;