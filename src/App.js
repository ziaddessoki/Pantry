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

const Wrapper = props => (
  <div style={{ maxWidth: 400, padding: 16, margin: "auto" }} {...props} />
);

const ProtectedProfile = withAuthProtection("/login")(Profile);

class App extends React.Component {
  constructor() {
    super();
    console.log("user", fireAuth.currentUser);
    this.state = {
      me: fireAuth.currentUser
    };
  }

  componentDidMount() {
    fireAuth.onAuthStateChanged(me => {
      this.setState({ me });
    });
  }

  handleSignIn = history => (email, password) => {
    return fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      return history.push("/profile");
    });
  };

  render() {
    const { me } = this.state;
    const email = _.get(me, "email");
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Wrapper>
                <Link to="/login" style={{ marginRight: 16 }}>
                  Login
                </Link>
                <Link to="/public" style={{ marginRight: 16 }}>
                  Public
                </Link>
                <Link to="/profile">Profile</Link>
                <Home />
              </Wrapper>
            )}
          />
          <Route
            path="/login"
            exact
            render={({ history }) => (
              <Wrapper>
                <Link to="/">Home</Link>
                <LoginForm onSubmit={this.handleSignIn(history)} />
              </Wrapper>
            )}
          />
          <Route
            path="/profile"
            exact
            render={props => (
              <Wrapper>
                <Link to="/">Home</Link>
                <ProtectedProfile {...props} me={me} displayName={email} />
              </Wrapper>
            )}
          />
          <Route
            path="/public"
            exact
            render={() => (
              <Wrapper>
                <Link to="/">Home</Link>
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
