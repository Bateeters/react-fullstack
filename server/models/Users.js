module.exports = (sequelize, DataTypes) => {

    // Setting up columns in Recipes table
    const Users = sequelize.define("Users", {
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Associating each recipe with its comments
    Users.associate = (models) => {
        Users.hasMany(models.Likes, {
            onDelete: "cascade", 
        });
    };

    return Users;
};