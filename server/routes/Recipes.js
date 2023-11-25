const express = require('express');
const router = express.Router();
const { Recipes, Likes } = require('../models');

const {validateToken} = require('../middlewares/AuthMiddleware');

// Get Request
router.get("/", validateToken, async (req, res) => {
    const listOfRecipes = await Recipes.findAll({include: [Likes]});
    const likedRecipes = await Likes.findAll({where: {UserId: req.user.id}});
    res.json({listOfRecipes: listOfRecipes, likedRecipes: likedRecipes});
});

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id;
    const recipe = await Recipes.findByPk(id);
    res.json(recipe);
});

// Post Request
router.post("/", validateToken, async (req, res) =>{
    const recipe = req.body;
    recipe.username = req.user.username;
    await Recipes.create(recipe);
    res.json(recipe);
});

router.delete("/:recipeId", validateToken, async (req, res) =>{
    const recipeId = req.params.recipeId;

    await Recipes.destroy({
        where: {
            id: recipeId,
        },
    });

    res.json("RECIPE DELETED");

})

module.exports = router;