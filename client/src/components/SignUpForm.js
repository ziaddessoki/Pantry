import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";


class SignUpForm extends React.Component {
  constructor() {
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
    alert("thank you for signing up, now you can login")
    console.log(this.state.email, this.props.id)
  };

  handleChange = key => e => {
    this.setState({ [key]: e.target.value });
  };

  render() {
    const { email, password, submitting } = this.state;
    return (
      <React.Fragment>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={this.handleSubmit}
        >
          <TextField
            style={{ marginBottom: 24 }}
            variant={"outlined"}
            required
            type={"email"}
            label={"Email"}
            value={email}
            onChange={this.handleChange("email")}
          />
          <TextField
            style={{ marginBottom: 24 }}
            variant={"outlined"}
            required
            type={"password"}
            label={"Password"}
            value={password}
            onChange={this.handleChange("password")}
          />
          <Button
            type={"submit"}
            fullWidth
            variant={"contained"}
            style={{fontfamily:"Bradley Hand, cursive",backgroundColor:"#cd9093"}}
          >
          
            {submitting ? (
              <CircularProgress
                style={{ color: "#fff" }}
                color={"inherit"}
                size={16}
              />
            ) : (
                "Submit"
              )}
          </Button>
        </form>
        {/* <Typography variant={"subtitle1"}>
          My ID is <b>{this.props.id}</b>
        </Typography> */}
      </React.Fragment>
    );
  } 
}

export default SignUpForm;