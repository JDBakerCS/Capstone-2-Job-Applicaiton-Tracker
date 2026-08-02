const express = require("express")
const { User } = require("../models")

const router = express.Router();

router.post("/sync", async (req, res, next) => {
    try {
        console.log("USERS SYNC ROUTE - NEW VERSION");
        console.log(req.body);
        const { auth0Sub, username, email } = req.body;

        if (!auth0Sub || !username || !email) {
            return res
                .status(400)
                .json({ message: "auth0Sub, username, and email are required." })
        }
        let user = await User.findOne({
            where: { auth0Sub },
        })
        if (!user) {
            user = await User.findOne({
                where: { email },
            })
        }
        if (user) {
            user.auth0Sub = auth0Sub;
            user.username = username;
            user.email = email;

            await user.save();

            return res.json(user);
        }

        user = await User.create({
            auth0Sub,
            username,
            email,
        });

        res.json(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;