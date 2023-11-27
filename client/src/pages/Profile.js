import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {

    let {id} = useParams();
    const [username, setUsername] = useState("");
    const [created, setCreated] = useState("");

    useEffect(() => {
        axios
        .get(`http://localhost:3001/auth/basicinfo/${id}`)
        .then((response) => {
            setUsername(response.data.username);
            setCreated(response.data.createdAt);
        });
    }, []);

    
    return (
    <div className='profilePageContainer'>
        <div className='basicInfo'>
            <h1>{username}</h1>
            <h3>has been cooking with us since {created}.</h3>
        </div>
        <div className='listOfRecipies'>

        </div>
    </div>
    )
}

export default Profile