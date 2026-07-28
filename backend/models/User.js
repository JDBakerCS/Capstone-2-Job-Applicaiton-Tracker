const { DataTypes } = require("sequelize")
const db = require("../db")

const User = db.define(
    "User",
    {
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