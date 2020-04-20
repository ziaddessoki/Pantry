import React, {Component} from "react";
import _ from "lodash";
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
import Footer from './components/footer'

const Wrapper = props => (
  <div style={{ maxWidth: "100%", padding: 16, margin: "auto" }} {...props} />
);

const ProtectedProfile = withAuthProtection("/login")(Profile);

class App extends Component {
 
    
   state = {
      me: fireAuth.currentUser,
      activeUser: null
    };
  
  

  isSomeoneSignedIn = () => {
    if (this.state.activeUser) {
      return (
        <ProtectedProfile
          {...this.state.props}
          me={this.state.me}
          displayName={this.state.email}
          id={this.state.id}
          activeUser={this.state.activeUser}
        />
      );
    } else {
      return <ProtectedProfile />;
    }
  };

  componentDidMount() {
    fireAuth.onAuthStateChanged(me => {
      console.log(me.email);
      API.saveUser({ email: me.email, fBaseId: me.uid })
      .catch(err =>console.log(err));

      API.getUser(me.uid)
      .then(d => {this.setState({ activeUser: d })});
      this.setState({ me });
    });
  }

  handleSignIn = history => (email, password) => {
    return fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      return history.push("/profile");
    });
  };

  handleSignUp = history => (email, password) => {
    fireAuth
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ...
      });
    return history.push("/profile");
  };

  onLogOut() {
    window.location = "/";
  }

  render() {
    const { me } = this.state;
    const email = _.get(me, "email");
    const id = _.get(me, "uid");
    const activeUser = this.state.activeUser;
    

    let logoutButton = null;

  if (this.state.activeUser){
    logoutButton = <Button variant={"contained"}
    onClick={() => {
      fireAuth.signOut();
      this.onLogOut();
    }}
    className={classes.Icon}
  >
    Logout
  </Button> 

  }


  const popover = history =>(
    <Popover
                          style={{ color: "black", backgroundColor: "yellow" }}
                          id={`popover-positioned-Sign Up`}
                        >
                          <Popover.Title
                            style={{ fontFamily: "Bradley Hand, cursive" }}
                            as="h3"
                          >{`Sign Up`}</Popover.Title>
                          <Popover.Content>
                            <SignUpForm
                              onSubmit={this.handleSignUp(history)}
                              style={{ fontFamily: "Bradley Hand, cursive" }}
                            />
                          </Popover.Content>
                        </Popover>
                      
  )
    return (
      <BrowserRouter>

        <Navbar expand="lg" style={{ backgroundColor: "#cd9093" }}>

          <Navbar.Brand style={{ fontFamily: "Bradley Hand, cursive", fontSize: "30pt" }} href="/" > Pantry </Navbar.Brand>
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
              <Wrapper>
                
                <LoginForm onSubmit={this.handleSignIn(history)} />

                <ButtonToolbar className={classes.ButtonToolbar}>
                   <OverlayTrigger trigger="click" placement='top'
                      overlay={ popover(history) }
                    >
                      <Button className={classes.SignUpBtn} variant="primary">Sign Up</Button>
                    </OverlayTrigger>
                </ButtonToolbar>
              </Wrapper>
            )}
          />



          <Route path="/profile" 
            render={props => (<ProtectedProfile {...props} me={me} displayName={email} id={id} activeUser={activeUser}/> )}/>
     
      </BrowserRouter>
      
);
  }
}
export default App;
