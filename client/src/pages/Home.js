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
    return (
        <div>
            {listOfRecipes.map((value, key) => { 
                return (
                <div className="recipe" onClick={() => {navigate(`/recipe/${value.id}`)}}>
                    <div className="title">{value.title}</div>
                    <div className="body">{value.stepsText}</div>
                    <div className="footer">{value.username}</div>
                </div>
                );
            })};
        </div>
    )
}

export default Home