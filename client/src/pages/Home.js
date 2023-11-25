import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Home() {
    const[listOfRecipes, setListOfRecipes] = useState([]);
    let navigate = useNavigate();

    useEffect(()=> {
      axios.get("http://localhost:3001/recipes").then((response)=>{
        setListOfRecipes(response.data);
      });
    }, []); 

    const likeRecipe = (recipeId) => {
        axios
        .post("http://localhost:3001/likes", 
            {RecipeId: recipeId}, 
            { headers: {accessToken: localStorage.getItem('accessToken')}}
        ).then((response)=> {
            setListOfRecipes(listOfRecipes.map((recipe)=>{
                if (recipe.id === recipeId){
                    if (response.data.liked) {
                        return {...recipe, Likes: [...recipe.Likes, "newLike"]}
                    } else {
                        const likesArray = recipe.Likes
                        likesArray.pop()
                        return {...recipe, Likes: likesArray}
                    }
                } else {
                    return recipe;
                }
            }))
        });
    };

    return (
        <div>
            {listOfRecipes.map((value, key) => { 
                return (
                <div key={key} className="recipe">
                    <div className="title" onClick={() => {navigate(`/recipe/${value.id}`)}}>{value.title}</div>
                    <div className="body" onClick={() => {navigate(`/recipe/${value.id}`)}}>{value.stepsText}</div>
                    <div className="footer">{value.username}
                        <button onClick={() => {likeRecipe(value.id)}}>
                        Like
                        </button>
                        <label>{value.Likes.length}</label>
                    </div>
                </div>
                );
            })};
        </div>
    )
}

export default Home