const {DataTypes} = require('sequelize')
const db = require("../db")

const JobApplication = db.define(
    "JobApplication", 
    {
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        tableName: "JobApplication",
    }

)

module.exports = JobApplication;