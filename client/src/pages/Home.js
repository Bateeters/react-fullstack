import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
    const[listOfRecipes, setListOfRecipes] = useState([]);

    useEffect(()=> {
      axios.get("http://localhost:3001/recipes").then((response)=>{
        setListOfRecipes(response.data);
      });
    }, []); 
    return (
        <div>
            {listOfRecipes.map((value, key) => { 
                return (
                <div className="recipe">
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