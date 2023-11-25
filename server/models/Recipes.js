module.exports = (sequelize, DataTypes) => {

    // Setting up columns in Recipes table
    const Recipes = sequelize.define("Recipes", {
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        stepsText:{
            type: DataTypes.STRING,
            allowNull: false
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Associating each recipe with its comments
    Recipes.associate = (models) => {
        Recipes.hasMany(models.Comments, {
            onDelete: "cascade", // If recipe is deleted, all comments related will be deleted also
        });

        Recipes.hasMany(models.Likes, {
            onDelete: "cascade", // If recipe is deleted, all likes related are deleted
        });
    };

    return Recipes
};