import React, { useEffect, useState } from "react";
import RecipeCardComponenet from "./RecipeCardComponenet";
// import IngredientContainer from "./ingredientContainer";
import Public from "./Public"
class AddIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ingredients: [], text: '' };
        this.removeIngredient = this.removeIngredient.bind(this);
    }
    AddIngredient(e) {
        e.preventDefault();
        this.setState({ 
            ingredients: [ this.state.text, ...this.state.ingredients ],
            text: ''
        });
    }
    removeIngredient(i){
        let ingredients = this.state.ingredients.slice();
        ingredients.splice(i, 1);
        this.setState({
            ingredients
        });
    }
    updateValue(e) {
        this.setState({ text: e.target.value})
    }
     recipeSearch(e){
        e.preventDefault();
        const rSearch=this.state.ingredients.join()
        this.props.callbackFromParent(rSearch)
        // this.props.onSubmitOf(rSearch)
    }
    render() {
        return(
            <div style={{backgroundColor:"silver",width:"300px"}}>
                <form onSubmit = {(e) => this.AddIngredient(e)}>
                    <input
                        placeholder="Add Ingredient"
                        value={this.state.text}
                        onChange={(e) => {this.updateValue(e)}}
                        style={{ float: "left", backgroundColor: "white" }}
                    />
                    <button >Add Ingredient</button>
                    
                </form>
                <IngredientList ingredients={this.state.ingredients} removeIngredient={this.removeIngredient}/>
                <button onClick={(e)=> this.recipeSearch(e)} type="submit" >search Recipe</button>
            </div>
        );
    }
}
class IngredientList extends React.Component {
    removeItem(i) {
        this.props.removeIngredient(i);
    }
    render() {
        return(
            <div>
            <ul>
                { this.props.ingredients.map((ingredient,i) => {
                    return <li >{ ingredient } <button onClick={() => { this.removeItem(i)}} key={i} >x</button></li>
                })}
            </ul>
            </div>
        );
    }
}
export default AddIngredient;




