const { User } = require("../models");

async function attachCurrentUser(req, res, next) {
  try {
    const auth0Sub = req.auth?.payload?.sub;

    if (!auth0Sub) {
      return res.status(401).json({ message: "Authenticated user is required." });
    }

    const user = await User.findOne({
      where: { auth0Sub },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found. Please sync user first." });
    }

    req.currentUser = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = attachCurrentUser;