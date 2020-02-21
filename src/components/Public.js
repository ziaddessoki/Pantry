import React, { useEffect, useState } from "react";
import RecipeCardComponenet from "./RecipeCardComponenet";

const Public = () => {
    const API_KEY =;
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

    const updateSearch = e => {
        setSearch(e.target.value)

    }

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="App">
            {/* <ItemsComponent/> */}

            <form onSubmit={getSearch} className="Search-Form">
                <input className="Search-Bar" type="text" value={search}
                    onChange={updateSearch} />
                <button className="Search-Button" type="submit">
                    ADD INGRIDIENT
                </button>
                
            </form>
            {/* <Ingridient /> */}
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