const JobApplication = require("./JobApplication");
const User = require("./User")

User.hasMany(JobApplication, {
    foreignKey: "userId",
    as: "applications",
    onDelete: "CASCADE",
})
JobApplication.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
})

module.exports = {
    User,
    JobApplication,
};