const { DataTypes } = require("sequelize")
const db = require("../db")

const User = db.define(
    "User",
    {
        auth0Sub: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "user",
    }
);
module.exports = User