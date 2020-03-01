import React from 'react';
import ReactDOM from "react-dom";
import _ from "lodash";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import './App.css';
import Home from './components/Home';
import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import Public from './components/Public';
import { fireAuth } from "./fireApi";
import withAuthProtection from "./withAuthProtection";
import API from '../src/utils/API';
import SignUpForm from './components/SignUpForm';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const Wrapper = props => (
  <div style={{ maxWidth: 400, padding: 16, margin: "auto" }} {...props} />
);

const ProtectedProfile = withAuthProtection("/login")(Profile);

class App extends React.Component {
  constructor() {
    super();
    console.log("user", fireAuth.currentUser);
    this.state = {
      me: fireAuth.currentUser,
      activeUser: {}
    };
  }

  componentDidMount() {
    fireAuth.onAuthStateChanged(me => {
      console.log(me.email)
      API.saveUser({email:me.email, fBaseId:me.uid}).catch(err => console.log(err));



      API.getUser(me.uid).then(d => {
        this.setState({ activeUser: d })
        // returns user info and set it to new state 
        // console.log(this.state.activeUser)
      })
      this.setState({ me });
    });

  };



  handleSignIn = history => (email, password) => {
    return fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      return history.push("/profile");
    });
  };
  handleSignUp = history => (email, password) => {
    fireAuth.createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }
    );
    return history.push("/profile");
  };

  render() {
    const { me } = this.state;
    const email = _.get(me, "email");
    const id = _.get(me, "uid");
    const activeUser = this.state.activeUser
    return (
      <BrowserRouter>

          <Navbar bg="white" expand="lg">
          <Navbar.Brand href="/">Pantry</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
             <Nav.Link><Link to="/">Home</Link></Nav.Link>
             <Nav.Link><Link to="/login" style={{ marginRight: 16 }}>Login</Link></Nav.Link>
             <Nav.Link> <Link to="/profile">Profile</Link></Nav.Link>

              </Nav>
              </Navbar.Collapse>
              </Navbar>


        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Wrapper>
                {/* <Link to="/login" style={{ marginRight: 16 }}>
                  Login
                </Link>
                <Link to="/profile">Profile</Link> */}
                <Home />
              </Wrapper>
            )}
          />
          <Route
            path="/login"
            exact
            render={({ history }) => (
              <Wrapper>
                {/* <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link> */}
                <LoginForm onSubmit={this.handleSignIn(history)} />

                <ButtonToolbar>
                  {['Sign Up'].map(placement => (
                    <OverlayTrigger
                      trigger="click"
                      key={placement}
                      placement={placement}
                      overlay={
                        <Popover id={`popover-positioned-${placement}`}>
                          <Popover.Title as="h3">{`${placement}`}</Popover.Title>
                          <Popover.Content>
                            <SignUpForm onSubmit={this.handleSignUp(history)} me={me} displayName={email} id={id}/>
                          </Popover.Content>
                        </Popover>
                      }
                    >
                      <Button variant="primary">{placement}</Button>
                    </OverlayTrigger>
                  ))}
                </ButtonToolbar>
              </Wrapper>
            )}
          />
          <Route
            path="/profile"
            exact
            render={props => (
              <Wrapper>
                {/* <Link to="/">Home</Link> */}
                <ProtectedProfile {...props} me={me} displayName={email} id={id} activeUser={activeUser} />
              </Wrapper>
            )}
          />
          <Route
            path="/public"
            exact
            render={() => (
              <Wrapper>
                {/* <Link to="/">Home</Link> */}
                <Public />
              </Wrapper>
            )}
          />
        </Switch>

      </BrowserRouter>
    );
  }
}
export default App;
