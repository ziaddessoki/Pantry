import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import RecipeCardComponenet from "./RecipeCardComponenet";
import Typography from "@material-ui/core/Typography";
import API from "../utils/API";

class Profile extends Component {
  constructor(props) {
    console.log("props that have ID" + props);
    super(props);
    this.state = {
      recipes: [""],
      _id: this.props.activeUser.data._id,
      fBaseId: this.props.activeUser.data.fBaseId,
      pantry: this.props.activeUser.data.pantry,
      value: "",
      favRecipes: this.props.activeUser.data.favRecipes
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  // componentDidMount() {
  //   this.loadUser();
  // }
  // loadUser = (uid) => {
  //   API.getUser(uid)
  //     .then(res =>
  //       this.setState({ activeUser: this.props.activeUser.data })
  //     )
  //     .catch(err => console.log(err));
  // };
  onChange = event => {
    this.setState({ value: event.target.value });
  };
  // Addind to the Pantry
  onSubmit = event => {
    event.preventDefault();
    event.target.reset();

    const userPantry = {
      id: this.state._id,
      newPantry: this.state.value
    };
    let dontMessWithState = new Array(...this.state.pantry);
    dontMessWithState.push(userPantry.newPantry);

    API.addPantry(userPantry.id, { pantry: userPantry.newPantry })
      .then(res => {
        this.setState({ pantry: dontMessWithState });
      })
      .catch(err => console.log(err));
  };

  //add to Fav on UI
  // onadd =()=>{
  //   let dontMessWithState = new Array(...this.state.favRecipes)
  //   dontMessWithState.push(userPantry.newPantry)
  // }

  // Deleting from Pantry
  onDeleteItem = (pantry, i) => {
    let newPantry = this.state.pantry.slice();
    newPantry.splice(i, 1);
    API.deletePantry(this.state._id, { pantry: pantry })
      .then(res => this.setState({ pantry: newPantry }))
      .catch(err => console.log(err));
  };

  onDeleteRecipe = (title, i) => {
    let newFav = this.state.favRecipes.slice();
    newFav.splice(i, 1);

    API.deleteFav(this.state._id, { title: title })
      .then(res => this.setState({ favRecipes: newFav }))
      .catch(err => console.log(err));
  };

  onLogOut() {
    window.location = "/";
  }

  // looking up API for recipes
  CurrentPantry = async event => {
    event.preventDefault();
    const rSearch = this.state.pantry.join();
    console.log(rSearch);
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${rSearch}&number=10&apiKey=60d9128af34b4f85baab35d9135e7ff3`
    );
    const data = await response.json();
    this.setState({ recipes: data });
    console.log(this.state.recipes);
  };

  render() {
    return (
      <React.Fragment>
        <h1
          style={{
            textAlign: "center",
            marginTop: "2%",
            fontFamily: "Bradley Hand, cursive",
            fontSize: "30pt"
          }}
        >
          {" "}
          Welcome {this.props.displayName}!
        </h1>
        <Typography variant={"subtitle1"}>
          <h5 style={{ textAlign: "center" }}>ID:{this.props.id}</h5>
        </Typography>

        <aside
          style={{
            textAlign: "center",
            width: "250px",
            float: "left",
            backgroundColor: "#bc7",
            borderRadius: "10%"
          }}
        >
          <form onSubmit={this.onSubmit}>
            <input
              value={this.state.value}
              onChange={this.onChange}
              style={{
                fontFamily: "Bradley Hand, cursive",
                fontSize: "16pt",
                borderRadius: "10%",
                marginTop: "4%"
              }}
              name="pantry"
              type="text"
              placeholder="Add to pantry"
            />
            <Button
              type="submit"
              input
              variant="contained"
              style={{
                fontFamily: "Bradley Hand, cursive",
                backgroundColor: "#cd9093",
                marginTop: "2%",
                borderRadius: "6%"
              }}
            >
              Add Ingridient
            </Button>
          </form>
          <h3
            style={{
              fontFamily: "Bradley Hand, cursive",
              textDecoration: "underline"
            }}
          >
            Current Pantry:
          </h3>
          {this.state.pantry.map((pantry, i) => (
            <li
              style={{
                textAlign: "center",
                fontFamily: "Bradley Hand, cursive"
              }}
              className="deleteItem"
              data-value={pantry}
              key={i}
              onClick={() => {
                this.onDeleteItem(pantry, i);
              }}
            >
              {pantry}{" "}
              <img
                src="https://image.flaticon.com/icons/svg/1345/1345874.svg"
                height="15px"
                width="15px"
                alt="delete"
              ></img>{" "}
            </li>
          ))}
        </aside>

        <div
          style={{
            width: "900px",
            height: "400px",
            backgroundColor: "#bc7",
            marginLeft: "20%",
            borderRadius: "6%",
            textAlign: "center",
            overflow: "hidden",
            overflowY: "scroll"
          }}
        >
          <Button
            style={{
              position: "relative",
              marginLeft: "40%",
              textAlign: "center",
              fontFamily: "Bradley Hand, cursive",
              backgroundColor: "#cd9093",
              borderRadius: "6%",
              marginRight: "40%",
              marginTop:"2%"
            }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={event => {
              this.CurrentPantry(event);
            }}
          >
            Search Recipes
          </Button>
          {this.state.recipes.map(recipe => (
            <RecipeCardComponenet
              saveRecipe={this.saveRecipe}
              userID={this.state._id}
              key={recipe.title}
              title={recipe.title}
              image={recipe.image}
              id={recipe.id}
            />
          ))}
        </div>
        <div
          style={{
            backgroundColor: "#bc7",
            width: "600px",
            display: "inline-block",
            fontFamily: "Bradley Hand, cursive",
            marginTop: "20%",
            borderRadius: "6%",
            marginLeft: "30%"
          }}
        >
          <h3 style={{ textAlign: "center", textDecoration: "underline" }}>
            Saved Recipes
          </h3>
          {this.state.favRecipes.map((favRecipes, i) => (
            <div className="favorite" data-value={favRecipes} key={i}>
              <img
                style={{
                  textAlign: "center",
                  borderRadius: "10%",
                  marginLeft: "23%"
                }}
                src={favRecipes.image}
              ></img>
              <h4 style={{ textAlign: "center" }}>{favRecipes.title} </h4>
              <br />
              <p style={{ textAlign: "center", margin: "3%" }}>
                {" "}
                {favRecipes.recipesInstructions}
              </p>
              <Button
                onClick={() => {
                  this.onDeleteRecipe(favRecipes.title, i);
                }}
              >
                <img
                  src="https://image.flaticon.com/icons/svg/1345/1345874.svg"
                  height="50px"
                  width="50px"
                  alt="delete"
                ></img>{" "}
              </Button>
              <hr></hr>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
export default Profile;
