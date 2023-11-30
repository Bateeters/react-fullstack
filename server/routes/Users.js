const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");
const {validateToken} = require('../middlewares/AuthMiddleware')

const {sign} = require('jsonwebtoken');

// Post Request
router.post("/", async (req, res) =>{
    // Get username and password from request body
    const {username, password} = req.body;

    // has the password with a salt round of 10
    bcrypt.hash(password, 10).then((hash)=>{
        // create a new user with the hashed password
        Users.create({
            username: username,
            password: hash,
        });

        // respond with success message
        res.json("SUCCESS");
    });
});


router.post('/login', async (req,res) => {
    // get username and password from request body
    const { username, password } = req.body;

    // find user in the username database
    const user = await Users.findOne({ where: {username: username}});

    // check if user exists
    if (!user) {
        return res.json ({error: "User Does Not Exist"});
    }
    
    // compare the provided password with the password in the database
    bcrypt.compare (password, user.password).then((match)=>{
        // check if password matches
        if(!match) {
            return res.json({error:"Wrong Username Password Combination"});
        }

        // create and set access token
        const accessToken = sign({username: user.username, id: user.id}, "importantsecret" );
        return res.json({token: accessToken, username: username, id:user.id});
    });
});

router.get('/auth', validateToken, (req,res) => {
    // Check if there is a valid user object in the request
    res.json(req.user)
})

router.get('/basicinfo/:id', async (req, res)=>{
    const id = req.params.id;

    const basicInfo = await Users.findByPk(id, {
        attributes: {
            exclude:['password']
        }
    });
    
    res.json(basicInfo);
});

router.put('/changepassword', validateToken, async (req, res) => {
    const {oldPassword, newPassword} = req.body
    const user = await Users.findOne({where: {username: req.user.username}})

    bcrypt.compare(oldPassword, user.password).then( async (match)=>{
        if (!match) res.json({error: "Wrong Password"})

        bcrypt.hash(newPassword, 10).then((hash) => {
            Users.update({password: hash}, {where: {username: req.user.username}})
            res.json("Password Changed")
        }) 

    })
});

module.exports = router;