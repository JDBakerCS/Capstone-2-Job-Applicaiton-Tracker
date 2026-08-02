const express = require("express")
const {User} = require("../models")

const router = express.Router();

router.post("/sync", async (req, res, next) => {
    try {
        const { auth0Sub, username, email } = req.body;
        if (!auth0Sub || !username || !email) {
            return res
                .status(400)
                .json({ message: "auth0Sub, username, and email are required." })
        }
        const [user] = await User.findOrCreate({
            where: { auth0Sub },
            defaults: {
                username,
                email,
            }
        })
        res.json(user);
    } catch (error) {
        next(error);

    }
});

module.exports = router;