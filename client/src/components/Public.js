import React, { useEffect, useState } from "react";
import RecipeCardComponenet from "./RecipeCardComponenet";
import AddIngredient from "./AddIngredient"

const Public = () => {
    const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('')

    useEffect(() => {
        console.log("Effect has been run");
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=2&apiKey=${API_KEY}`);
        const data = await response.json();
        setRecipes(data);
        console.log(data)
    }
  
    function myCallBack(rSearch){
            // console.log(rSearch);
            setQuery(rSearch);
            setSearch('');
    }
    console.log(recipes)
    return (
        
        <div className="App">
            <AddIngredient  callbackFromParent={myCallBack} />
            
            {recipes.map(recipe => (
                <RecipeCardComponenet
                    key={recipe.title}
                    title={recipe.title}
                    image={recipe.image}
                    id={recipe.id}
                />
               
            ))}
        </div>
    )
}
export default Public;