module.exports = (sequelize, DataTypes) => {

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

        return Recipes
};