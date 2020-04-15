import React from "react";
import Typography from "@material-ui/core/Typography";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
// import "./componentstyle.css";
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