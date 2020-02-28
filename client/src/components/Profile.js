import React, { Component } from "react";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";
import { fireAuth } from "../fireApi";

import API from '../utils/API';
import Public from "./Public"

class Profile extends Component {
  constructor(props) {
    super(props);
        this.state = {
        _id: this.props.activeUser.data._id,
        fBaseId: this.props.activeUser.data.fBaseId,
        pantry: this.props.activeUser.data.pantry,
        value: '',
        favRecipes: this.props.activeUser.data.favRecipes
      };
      this.onSubmit = this.onSubmit.bind(this);
  }
// this.handleInputChange = this.handleInputChange.bind(this);
// this.onChangePantry = this.onChangePantry.bind(this);
// console.log(this.state)



componentDidMount() {
  this.loadUser();
}

loadUser = (uid) => {
  API.getUser(uid)
    .then(res =>
      this.setState({ activeUser: this.props.activeUser.data })
    )
    .catch(err => console.log(err));
};

// onSubmit = event => {
//   // event.preventDefault();

  
// }

onChange = event => {
  this.setState({ value: event.target.value });
  console.log(this.state)
};

onSubmit = (event) => {
  event.preventDefault()

    const userPantry = {
      id: this.state._id,
      newPantry: this.state.value
    }
   // this.state.pantry.push(userPantry.newPantry)
   let dontMessWithState = new Array(...this.state.pantry   )
    dontMessWithState.push(userPantry.newPantry)
      console.log("MMMMMMM",this.state)
    API.addPantry(userPantry.id,{pantry: userPantry.newPantry})
    // .then(res => res.json({pantry:this.state.value}))
      .then(res => {
        //setState
        this.setState({pantry: dontMessWithState})
        //this.loadUser(this.state.fBaseId)
      })
      .catch(err => console.log(err));
  
};

onDeleteItem = (pantry,i) => {
  console.log(pantry)
  console.log("run")
  let newPantry = this.state.pantry.slice()
  newPantry.splice(i,1)
  
  

  API.deletePantry(this.state._id,{pantry: pantry})
  // .then(res => res.json({pantry:this.state.value}))
    .then(res => this.setState({pantry: newPantry}))
    .catch(err => console.log(err));

};
// onAddItem = () => {
//   this.setState(state => {
//     const pantry = [...state.pantry, state.value];
//     return {
//       pantry,
//       value: '',
//     };
//   });
// };


onLogOut(){
  window.location = "/"
}


render() {
  return (
    <React.Fragment>
      <Typography variant={"subtitle1"}>
        My name is <b>{this.props.displayName}</b>
      </Typography>
      <Typography variant={"subtitle1"}>
        My name is <b>{this.props.id}</b>
      </Typography>
      <Typography variant={"subtitle1"}>
        Name: <b>{this.props.activeUser.data.username}</b>
      </Typography>

      <Typography variant={"subtitle1"}>
        {/* Pantry: <b>{this.props.activeUser.data.pantry.join("\n ") + this.state.newPantry}</b> */}
        {/* this is working, back on after testing */}
        { this.state.pantry.map((pantry,i) => <li>{pantry}<p className="deleteItem" data-value={pantry} key ={i} onClick={() => {this.onDeleteItem(pantry,i)}}>X</p></li>)}
      </Typography>

      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.value}
          onChange={this.onChange}
          name="pantry"
          type="text"
          placeholder="Add to pantry"
        />
        <Button type="submit"

          // onClick={this.onAddItem()}
          // disabled={!this.state.value}
        >
          Submit Book
        </Button>

      </form>

      <Public/>

      <Button variant={"contained"} onClick={() => {fireAuth.signOut();this.onLogOut()}} >
        Logout
      </Button>
    </React.Fragment>
  );
}
}
export default Profile;