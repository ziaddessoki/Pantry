import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
// import Footer from './footer'
// import SignUp from './signUp';

class LoginForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      submitting: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { email, password } = this.state;
    if (onSubmit) {
      this.setState({ submitting: true });
      onSubmit(email, password);
    }
  };

  handleChange = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    const { email, password, submitting } = this.state;
    return (
      <React.Fragment>
        <Typography variant="h5" style={{textAlign:"center",  fontFamily: "'Cairo', sans-serif",fontWeight:"600", fontSize:"20pt", margin:"7% auto", }}>
          Please Login or Create A New Account
        </Typography>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "400px",
            backgroundColor: "rgba(107, 170, 117, 0.788)",
            borderRadius: "6%",
            margin:'auto',
            // marginTop:"12%",
          }}
          onSubmit={this.handleSubmit}
        >
          <TextField
            style={{ 
              margin:24,
              }}
            variant={"outlined"}
            required
            type={"email"}
            label={"Email"}
            value={email}
            onChange={this.handleChange("email")}
          />
          <TextField
            style={{ margin: 24, }}
            variant={"outlined"}
            required
            type={"password"}
            label={"Password"}
            value={password}
            onChange={this.handleChange("password")}
          />
          
          <Button
          style={{
            fontFamily: "'Cairo', sans-serif", fontSize:"16pt",
            backgroundColor: "#cd9093",
            marginBottom:"3%",
            marginLeft:"12%",
            width:"300px",
            color:"white"

           }}
            type={"submit"}
            variant={"contained"}
          >
            {submitting ? (
              <CircularProgress
                style={{ color: "#fff" }}
                color={"inherit"}
                size={16}
              />
            ) : (
              "Log In"
            )}
          </Button>
       
          {/* <SignUp/>     */}
       
        </form>
        
              
      </React.Fragment>
      
    );
  }
}

export default LoginForm;
