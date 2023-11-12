const express = require('express');
const router = express.Router();
const { Recipes } = require('../models');

// Get Request
router.get("/", async (req, res) => {
    const listOfRecipes = await Recipes.findAll();
    res.json(listOfRecipes);
});

router.get('/byId/:id', async (req,res) => {
    const id = req.params.id;
    const recipe = await Recipes.findByPk(id);
    res.json(recipe);
});

// Post Request
router.post("/", async (req, res) =>{
    const recipe = req.body;
    await Recipes.create(recipe);
    res.json(recipe);
});

module.exports = router;