import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Recipe() {
    let {id} = useParams();
    const [recipeObject, setRecipeObject] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3001/recipes/byId/${id}`).then((response)=>{
            setRecipeObject(response.data);
        });
    })
  
    return (
        <div className='recipePage'>
            <div className='leftSide'>
                <div className='recipeSection'>
                    <div className='title'>{recipeObject.title}</div>
                    <div className='stepsText'>{recipeObject.stepsText}</div>
                    <div className='footer'>{recipeObject.username}</div>
                </div>
            </div>
            <div className='rightSide'>
                <div>Ingredients Section</div>
            </div>
            <div className='commentsSection'>
                <div>Comment Section</div>
            </div>
        </div>
    )
}

export default Recipe