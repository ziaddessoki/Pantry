import React, {Component} from "react";
// import _ from "lodash";
import { BrowserRouter, Route, Link } from "react-router-dom";
import classes from "./App.css";
import Home from "./components/Home";
import Profile from "./components/Profile";
import LoginForm from "./components/LoginForm";

import { fireAuth } from "./fireApi";
import withAuthProtection from "./withAuthProtection";
import API from "./utils/API";
import SignUpForm from "./components/SignUpForm";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";



const ProtectedProfile = withAuthProtection("/login")(Profile);

class App extends Component {
 
    
   state = {
      userFB: "",
      activeUser: null,
      newUid:''
    };
  
  
  componentDidMount() {
    fireAuth.onAuthStateChanged(currentUser => {
     this.setState({ userFB : currentUser })
     API.getUser(currentUser.uid)
      .then(userDB => {this.setState({ activeUser: userDB.data })})
      .catch(err =>console.log(err));
    })
    
  }

  handleSignIn = history => (email, password) => {
    return fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      return history.push("/profile");
    });
  };

  handleSignUp = history => (email, password) => {
   fireAuth.createUserWithEmailAndPassword(email, password)
      .then(user=>{API.saveUser({ email: email, fBaseId: user.user.uid})})
      .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode,errorMessage)
        })
   return history.push("/profile");
  };

  onLogOut() {
    window.location = "/";
  }

  render() {
    const { userFB } = this.state;
   //logOut hide/show
    let logoutButton = null;
     if (this.state.activeUser){
      logoutButton =
       <Button variant={"contained"}
          onClick={() => { fireAuth.signOut(); this.onLogOut()}}
          className={classes.Icon}>
            Logout
       </Button> 

    }


  const popover = history =>(
    <Popover className={classes.Popover}  id={`popover-basic`} >
        <Popover.Title as="h3">{`Sign Up`}</Popover.Title>
              <Popover.Content>
                  <SignUpForm onSubmit={this.handleSignUp(history)}/>
              </Popover.Content>
      </Popover>
                      
  )
    return (
      <BrowserRouter>

        <Navbar expand="lg" style={{ backgroundColor: "#cd9093",height:"60px" }}>

          <Navbar.Brand className={classes.NavIcon} href="/" > Pantry </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Link to="/" className={classes.Icon}>  Home </Link>
                <Link to="/login" className={classes.Icon}> Login </Link>
                <Link to="/profile" className={classes.Icon}> Profile </Link>
            </Nav>
               {logoutButton}
         </Navbar.Collapse>
        </Navbar>

       
        
          <Route path="/" exact component={Home}/>

          <Route path="/login"
            render={({ history }) => (
              <div>
                <LoginForm onSubmit={this.handleSignIn(history)} />

                <ButtonToolbar className={classes.ButtonToolbar}>
                   <OverlayTrigger trigger="click" placement='top' overlay={popover(history)} >
                      <Button className={classes.SignUpBtn} >Sign Up</Button>
                    </OverlayTrigger>
                </ButtonToolbar>
                </div>
            )}
          />



          <Route path="/profile" 
            render={props => (<ProtectedProfile {...props} me={userFB} /> )}/>
     
      </BrowserRouter>
      
);
  }
}
export default App;
