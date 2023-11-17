const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");

// Post Request
router.post("/", async (req, res) =>{
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash,
        });
        res.json("SUCCESS");
    });
});


router.post('/login', async (req,res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: {username: username}});

    if (!user) {
        return res.json ({error: "User Does Not Exist"});
    }
    
    bcrypt.compare (password, user.password).then((match)=>{
        if(!match) {
            return res.json({error:"Wrong Username Password Combination"});
        }

        return res.json("LOGGED IN!");
    });
});

module.exports = router;