const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const recipeRouter = require('./routes/Recipes');
app.use("/recipes", recipeRouter);
const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter);


db.sequelize.sync().then(()=>{
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});


