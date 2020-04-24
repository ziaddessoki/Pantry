import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import RecipeCardComponent from "./RecipeCardComponent";
import Spinner from 'react-bootstrap/Spinner'
import { fireAuth } from "../fireApi";
import API from '../utils/API';
import classes from './Profile.css';
import Footer from './footer'


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
     this.setState({ fire : currentUser, fBaseId:currentUser.uid })
     API.getUser(currentUser.uid)
      .then(userDB => {
        this.setState({ 
          dbdb: userDB.data,
          _id:userDB.data._id,
          pantry:userDB.data.pantry,
          favRecipes:userDB.data.favRecipes },
        )});
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
  onAdd =(recipe)=>{
    console.log(recipe)
    let newFavRecipeUI = new Array(...this.state.favRecipes)
    newFavRecipeUI.push(recipe)
    this.setState({ favRecipes: newFavRecipeUI })
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
        <h1 className={classes.Testing}> Welcome {this.state.fire.email?this.state.fire.email.split("@",1):null}!</h1>
        <h5 style={{ textAlign: "center" }}>Mongo ID:{this.state.dbdb._id}</h5>
        <h5 style={{ textAlign: "center" }}>fireBase ID:{this.state.fire.uid}</h5>
        
        
      {/* pantry add and display */}
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
            // className={classes.AddPantryBtn} 
            type="submit"  
            variant="dark"
              style={{
                fontWeight:"900",
                borderRadius:"50%",
                fontFamily: "'Cairo', sans-serif",
                backgroundColor: "#cd9093",
                margin: "2% auto",
              }}> + </Button>
          </form>


          {/* displaying Pantry */}
          <h3> Current Pantry: </h3>
          <ul 
          style={{listStyleType: "none",
            margin: "5px auto",
            padding: "0"}}
          // className={classes.UnorderedList}
          >
          {this.state.pantry.map((pantry, i) => (
            pantry? <li className={classes.PantryList} data-value={pantry} key={i}>
              {pantry}{" "}
              <i class="fas fa-times fa-xs" style={{color:"red"}}></i>
             </li>: 
              <Spinner animation="border" />
            
          ))}</ul>
        </aside>


            {/* Recipe Jumbotron */}
        <div className={classes.RecipeDiv}>
          <Button
            style={{
              margin: "25px auto",
              textAlign: "center",
              fontFamily: "'Cairo', sans-serif",
              backgroundColor: "#cd9093",
            }}
            variant="dark"
            type="submit"
            onClick={event => {this.CurrentPantry(event);}}>Search Recipes</Button>


            <br/>

          {this.state.recipesSearchResult.map(recipe => (
            recipe?<RecipeCardComponent
              addFavOnUI={this.onAdd}
              userID={this.state._id}
              key={recipe.title}
              title={recipe.title}
              image={recipe.image}
              id={recipe.id}
            />:<p className={classes.CardAlt}>Look Up and Save Delicious Recipes!!</p>
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
                  height="12px"
                  width="12px"
                  alt="delete"
                 ></img>{" "}
              </button>
              
            </div>
          ))}
        </div>
        <Footer/>
      </React.Fragment>
    );
  }
}
export default Profile;
