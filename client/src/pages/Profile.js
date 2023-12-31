import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Favorite from '@mui/icons-material/Favorite';
import { AuthContext } from '../helpers/AuthContext';


function Profile() {

    let {id} = useParams();
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [created, setCreated] = useState("");
    const [listOfRecipes, setListsOfRecipes] = useState([]);
    const [likedRecipes, setLikedRecipes] = useState([]);
    const {authState} = useContext(AuthContext);

    useEffect(() => {
        axios
        .get(`http://localhost:3001/auth/basicinfo/${id}`)
        .then((response) => {
            setUsername(response.data.username);
            setCreated(response.data.createdAt);
        });

        axios
        .get(`http://localhost:3001/recipes/byUserId/${id}`)
        .then((response) =>{
            setListsOfRecipes(response.data);
        });
    }, []);


    return (
    <div className='profilePageContainer'>
        <div className='basicInfo'>
            <h1>{username}</h1>
            {authState.username === username && (
                <button onClick={() => {navigate("/changepassword")}}> Change Password </button>
            )}
            <h3>has been cooking with us since {created}.</h3>
        </div>
        <div className='listOfRecipies'>
            <h1>A list of their recipes include:</h1>
            {listOfRecipes.map((value, key) => { 
                return (
                    <div key={key} className="recipe">
                        <div className="title" onClick={() => {navigate(`/recipe/${value.id}`)}}>{value.title}</div>
                        <div className="body" onClick={() => {navigate(`/recipe/${value.id}`)}}>{value.stepsText}</div>
                        <div className="footer">
                            <div className='username'>{value.username}</div>
                            <div className='buttons'>
                                <Favorite                          
                                    className={likedRecipes.includes(value.id) ? "unlikeBttn": "likeBttn"}/>
                                <label>{value.Likes.length}</label>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
    )
}

export default Profile