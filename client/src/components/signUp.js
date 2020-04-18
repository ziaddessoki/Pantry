import React from 'react';
import { fireAuth } from "../fireApi";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import SignUpForm from "./SignUpForm";

const signUp =(props) => {


  let handleSignUp = props=> (email, password) => {
        fireAuth
          .createUserWithEmailAndPassword(email, password)
          .catch(function(error) {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // ...
          });
        return this.props.history.push("/profile");
      };

    return(
    <div>
    

    <ButtonToolbar style={{
        
        marginLeft: "43%",
        fontFamily: "Bradley Hand, cursive"
      }}>
      {["Sign Up"].map(placement => (
        <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover
              style={{ color: "black", backgroundColor: "#bc7" }}
              id={`popover-positioned-${placement}`}
            >
              <Popover.Title
                style={{ fontFamily: "Bradley Hand, cursive" }}
                as="h3"
              >{`${placement}`}</Popover.Title>
              <Popover.Content
                style={{ fontFamily: "Bradley Hand, cursive" }}
              >
                <SignUpForm
                  onSubmit={handleSignUp(history)}
                  style={{ fontFamily: "Bradley Hand, cursive" }}
                />
              </Popover.Content>
            </Popover>
          }
        >
          <Button
            style={{
              backgroundColor: "#cd9093",
              fontFamily: "Bradley Hand, cursive",
              marginLeft: "7%"
            }}
            variant="primary"
          >
            {placement}
          </Button>
        </OverlayTrigger>
      ))}
    </ButtonToolbar>
    </div>
    )

}

export default signUp;
