import React from "react";
import Typography from "@material-ui/core/Typography";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Image from 'react-bootstrap/Image';
import "./componentstyle.css";

// import img from "../images/"

class Home extends React.Component {
    render() {
        return <div>
            <h1>Welcome to Pantry</h1>
            <div className="jumbotronContainer"> 
            <Jumbotron className="jumbotron"  >
            </Jumbotron>
            </div>
        </div>;
    }
}

export default Home;