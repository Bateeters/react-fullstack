import React, { useContext } from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Favorite from '@mui/icons-material/Favorite';
import { AuthContext } from '../helpers/AuthContext';

function Home() {
    const[listOfRecipes, setListOfRecipes] = useState([]);
    const [likedRecipes, setLikedRecipes] = useState([]);
    const { authState } = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(()=> {

        if (!authState.status){
            navigate("/login");
        } else {
            axios
            .get("http://localhost:3001/recipes",
                { headers: {accessToken: localStorage.getItem('accessToken')}}
            ).then((response)=>{
                setListOfRecipes(response.data.listOfRecipes);
                setLikedRecipes(response.data.likedRecipes.map((like)=>{return like.RecipeId}));
            });
        };
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

            if (likedRecipes.includes(recipeId)) {
                setLikedRecipes(likedRecipes.filter((id) => {return id !== recipeId}))
            } else {
                setLikedRecipes([...likedRecipes, recipeId]);
            }
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
                        <Favorite                          
                            onClick={() =>{
                                likeRecipe(value.id);
                            }}
                            className={likedRecipes.includes(value.id) ? "unlikeBttn": "likeBttn"}/>
                        <label>{value.Likes.length}</label>
                    </div>
                </div>
                );
            })};
        </div>
    )
}

export default Home