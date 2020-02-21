import React from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { fireAuth } from "../fireApi";

const Profile = ({ displayName = "Unknown" }) => (
    <React.Fragment>
      <Typography variant={"subtitle1"}>
        My name is <b>{displayName}</b>
      </Typography>
      <Button variant={"contained"} onClick={() => fireAuth.signOut()}>
        Logout
      </Button>
    </React.Fragment>
  );
export default Profile;