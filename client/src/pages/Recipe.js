import React, {useContext, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Recipe() {
    let {id} = useParams();
    const [recipeObject, setRecipeObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);

    let navigate = useNavigate();

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
                accessToken: localStorage.getItem("accessToken"),
            },
        }
        
        )
        .then((response)=>{
            if (response.data.error) {
                console.log(response.data.error);
            } else {
                const commentToAdd = {commentBody: response.data.commentBody, username: response.data.username, id: response.data.id};    
                setComments([...comments, commentToAdd]);
                setNewComment("");
            }
        });
    };

    const deleteComment = (id) => {
        axios
        .delete(`http://localhost:3001/comments/${id}`, {
            headers: { accessToken: localStorage.getItem('accessToken') },
        })
        .then(()=>{
            setComments(
                comments.filter((val)=> {
                    return val.id !== id;
                })
            );
        });
    };

    const deleteRecipe = (id) => {
        axios
        .delete(`http://localhost:3001/recipes/${id}`,
            {headers: {accessToken: localStorage.getItem("accessToken")}})
        .then(()=>{
            navigate('/')
        })
    };

    const editRecipe = (option) => {
        if (option === "title"){
            let newTitle = prompt("Enter New Title:");
            axios.put("http://localhost:3001/recipes/title", {newTitle: newTitle, id: id},
            {headers: {accessToken: localStorage.getItem("accessToken")}})

            setRecipeObject({...recipeObject, title: newTitle})

        } else { // change to "else if" statements if changing to edit individual steps
            let newRecipeText = prompt("Enter New Steps:");
            axios.put("http://localhost:3001/recipes/recipeText", {newText: newRecipeText, id: id},
            {headers: {accessToken: localStorage.getItem("accessToken")}})

            setRecipeObject({...recipeObject, stepsText: newRecipeText})
        }


    }

    return (
        <div className='recipePage'>

            <div className='leftSide'>
                <div className='recipeSection'>
                    <div className='title'>{recipeObject.title} 
                        {authState.username === recipeObject.username && (
                            <EditIcon onClick={()=>{
                                if (authState.username === recipeObject.username) {
                                    editRecipe("title");
                            }}}> 
                            Edit Title
                            </EditIcon>
                        )}
                    </div>
                    <div className='stepsText'>{recipeObject.stepsText}
                    {authState.username === recipeObject.username && (
                            <EditIcon onClick={()=>{
                                if (authState.username === recipeObject.username) {
                                    editRecipe("steps");
                            }}}> 
                            Edit Steps
                            </EditIcon>
                        )}
                    </div>
                    <div className='footer'>{recipeObject.username}
                        {authState.username === recipeObject.username && (
                            <DeleteIcon onClick ={()=>{
                                deleteRecipe(recipeObject.id);
                            }}> Delete </DeleteIcon>
                        )}
                    </div>
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
                                {authState.username === comment.username && (
                                    <button onClick={() => {deleteComment(comment.id);}}> 
                                        X 
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Recipe