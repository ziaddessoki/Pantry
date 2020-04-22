import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import InstructionsComponent from "./InstructionsComponent";
import API from '../utils/API';



const RecipeCardComponent = ({ title, image, id, userID,addFav }) => {
    const [recipesInstructions, setRecipeInstructions] = useState([])
    const [query, setQuery] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

    useEffect(() => { getRecipesInstructions() }, [query]);

    const getRecipesInstructions = async () => {
        const response = await fetch(`https://api.spoonacular.com/recipes/${query}/information?includeNutrition=false&apiKey=033ca393208146a0977e6ee214636992
        `);
        const data = await response.json();
        setRecipeInstructions(data);
        console.log(response);
    }

    const getSearch = e => {
        e.preventDefault();
        setQuery(e.target.value);

        handleShow();
    }

    const saveRecipe = () => {
        console.log(query)
        console.log(recipesInstructions.title)
        console.log(recipesInstructions.image)
        console.log(recipesInstructions.instructions)
        API.addFav(userID, {favRecipes:{
            title: recipesInstructions.title,
            image: image,
            recipesInstructions:recipesInstructions.instructions,

        }})
        .then(window.location = "/profile").catch(err => console.log(err));
        console.log(userID)
        console.log(recipesInstructions.instructions)
    } 


    return (
            <Card style={{ width: '18rem', backgroundColor:'#cd9093',margin:"1%", display:"inline-block", textAlign:"center"}}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    
                    <Button onClick={getSearch} value={id} 
                    style={{backgroundColor:'#bc7',color:'black',fontFamily: "Bradley Hand, cursive"}} >
                        Get Recipe Instructions</Button>
                </Card.Body>

                <Modal show={show} onHide={handleClose} style={{color:'black',fontFamily: "Bradley Hand, cursive"}}>
                    <Modal.Header closeButton>
                        <Modal.Title >Instructions for: {title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InstructionsComponent style={{backgroundColor:'#bc7',color:'black',fontFamily: "Bradley Hand, cursive"}}
                         instructions={recipesInstructions.instructions} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
          </Button>
                        <Button variant="primary" onClick={saveRecipe }>
                            Save Recipe
          </Button>
                    </Modal.Footer>
                </Modal>
            </Card>

    )
}
export default RecipeCardComponent;


