import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import RecipeCardComponent from "./RecipeCardComponent";

import { fireAuth } from "../fireApi";
import API from '../utils/API';
import classes from './Profile.css';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesSearchResult: [""],
      _id: '',
      fBaseId: '',
      pantry: [],
      value: "",
      favRecipes: [],
      fire:"",
      dbdb:"",
    };
    this.onSubmit = this.onSubmit.bind(this);
  }



  componentDidMount() {
    fireAuth.onAuthStateChanged(currentUser => {
      console.log(currentUser)
     this.setState({ fire : currentUser, fBaseId:currentUser.uid })
     API.getUser(currentUser.uid)
      .then(userDB => {
        this.setState({ 
          dbdb: userDB.data,
          _id:userDB.data._id,
          pantry:userDB.data.pantry,
          favRecipes:userDB.data.favRecipes },
        console.log(userDB),)});
      console.log(this.state.activeUser)
      // .catch(err =>console.log(err));
    })
    
  }

  onChange = event => {
    this.setState({ value: event.target.value });
  };
// Adding to the Pantry
  onSubmit = (event) => {
    event.preventDefault()
    this.setState({value:""})
    
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

  // add to Fav on UI
  onAdd =()=>{
    console.log(this.props.recipesInstructions)
    // let dontMessWithState = new Array(...this.state.favRecipes)
    // dontMessWithState.push(userPantry.newPantry)
  }

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
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${rSearch}&number=10&apiKey=60d9128af34b4f85baab35d9135e7ff3`
    );
    const data = await response.json();
    this.setState({ recipesSearchResult: data });
    console.log(this.state.recipesSearchResult);
  };

  render() {
    
    return (
      <React.Fragment>
        <h1 className={classes.Testing}> Welcome {this.state.fire.email}!</h1>
        <h5 style={{ textAlign: "center" }}>Mongo ID:{this.state.dbdb._id}</h5>
        <h5 style={{ textAlign: "center" }}>fireBase ID:{this.state.fire.uid}</h5>
        
        

        <aside className={classes.PantryBox}>
          <form onSubmit={this.onSubmit}>
            <input value={this.state.value}
              onChange={this.onChange}
              className={classes.PantryInput}
              name="pantry"
              type="text"
              placeholder="Add to pantry"
            />
            <Button 
            className={classes.AddPantryBtn} 
            type="submit"  
            // variant="primary"
              // style={{
              //   fontFamily: "Bradley Hand, cursive",
              //   backgroundColor: "#cd9093",
              //   marginTop: "2%",
              //   borderRadius: "6%"
              // }}
            >
              Add Ingredient
            </Button>
          </form>


          {/* displaying Pantry */}
          <h3> Current Pantry: </h3>
          {this.state.pantry.map((pantry, i) => (
            <li className={classes.PantryList} data-value={pantry} key={i}
              >
              {pantry}{" "}
              <img onClick={() => { this.onDeleteItem(pantry, i) }}
              src="https://image.flaticon.com/icons/svg/1345/1345874.svg"
                height="15px"
                width="15px"
                alt="delete"
              ></img>
            </li>
          ))}
        </aside>


            {/* Recipe Jumbotron */}
        <div className={classes.RecipeDiv}>
          <Button
            // style={{
            //   position: "relative",
            //   marginLeft: "40%",
            //   textAlign: "center",
            //   fontFamily: "Bradley Hand, cursive",
            //   backgroundColor: "#cd9093",
            //   borderRadius: "6%",
            //   marginRight: "40%",
            //   marginTop:"2%"
            // }}
            className={classes.AddPantryBtn}
            variant="dark"
            // variant="contained"
            // color="primary"
            type="submit"
            onClick={event => {
              this.CurrentPantry(event);
            }}
          >
            Search Recipes
          </Button>


          {this.state.recipesSearchResult.map(recipe => (
            recipe?<RecipeCardComponent
              saveRecipe={this.saveRecipe}
              userID={this.state._id}
              key={recipe.title}
              title={recipe.title}
              image={recipe.image}
              id={recipe.id}
            />:null
          ))}
        </div>




        <div  className={classes.SavedJumbo} >
          <h3>Saved Recipes</h3>
          {this.state.favRecipes.map((favRecipes, i) => (
            
            <div className={classes.Favorite}  data-value={favRecipes} key={i}>
              <img className={classes.FavRecipeImg} alt="favRecipes" src={favRecipes.image}></img>
              <h4 className={classes.FavRecipeTitle}>{favRecipes.title} </h4>
              <br />
              <p className={classes.FavRecipeTitle}>{favRecipes.recipesInstructions}</p>

              <button className={classes.FavDelBtn}
                onClick={() => { this.onDeleteRecipe(favRecipes.title, i)}}>
                <img src="https://image.flaticon.com/icons/svg/1345/1345874.svg"
                  height="15px"
                  width="15px"
                  alt="delete"
                 ></img>{" "}
              </button>
              
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
export default Profile;
