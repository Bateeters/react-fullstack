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

router.get('/byUserId/:id', async (req,res) => {
    const id = req.params.id;
    const listOfRecipes = await Recipes.findAll({
        where: {UserId: id},
        include: [Likes],
    });
    res.json(listOfRecipes);
});

// Post Request
router.post("/", validateToken, async (req, res) =>{
    const recipe = req.body;
    recipe.username = req.user.username;
    recipe.UserId = req.user.id;
    await Recipes.create(recipe);
    res.json(recipe);
});

router.put("/title", validateToken, async (req, res) =>{
    const {newTitle, id} = req.body;
    await Recipes.update({title: newTitle},{where: {id: id}});
    res.json(newTitle);
});

router.put("/recipeText", validateToken, async (req, res) =>{
    const {newText, id} = req.body;
    await Recipes.update({stepsText: newText},{where: {id: id}});
    res.json(newText);
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