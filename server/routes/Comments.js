const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const {validateToken} = require('../middlewares/AuthMiddleware');

router.get("/:recipeId", async (req, res) => {
    const recipeId = req.params.recipeId;

    // Go to Comments table and find all instances where RecipeId column matches the recipeId const
    const comments = await Comments.findAll({where: {RecipeId: recipeId}});
    res.json(comments);
});

router.post("/", validateToken, async (req, res) =>{
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
});

module.exports = router;