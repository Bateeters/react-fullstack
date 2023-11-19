import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Recipe() {
    let {id} = useParams();
    const [recipeObject, setRecipeObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        // Get data for specific recipe
        axios.get(`http://localhost:3001/recipes/byId/${id}`).then((response)=>{
            setRecipeObject(response.data);
        });

        // return list of all comments related to specific recipe
        axios.get(`http://localhost:3001/comments/${id}`).then((response) =>{
            setComments(response.data);
        });
    }, []);
  
    const addComment = () => {
        axios
        .post("http://localhost:3001/comments", {
            commentBody: newComment, 
            RecipeId: id, 
        },
        {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            },
        }
        
        )
        .then((response)=>{
            if (response.data.error) {
                console.log(response.data.error);
            } else {
                const commentToAdd = {commentBody: newComment, username: response.data.username};    
                setComments([...comments, commentToAdd]);
                setNewComment("");
            }
        });
    };

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
                <div className='addCommentContainer'>
                    <input 
                    type='text' 
                    placeholder='Comment...' 
                    autoComplete='off' 
                    value={newComment}
                    onChange={(event)=>{setNewComment(event.target.value)}}/>
                    

                    <button onClick={addComment}> Add Comment </button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className='comment'> 
                                {comment.commentBody}
                                <label> - {comment.username}</label>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    )
}

export default Recipe