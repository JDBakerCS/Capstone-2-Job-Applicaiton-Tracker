const express = require("express")
const { User } = require("../models")
const checkJwt = require("../middleware/auth0");
const router = express.Router();

router.post("/sync", checkJwt, async (req, res, next) => {
    try {
        console.log("USERS SYNC ROUTE - NEW VERSION");
        console.log(req.body);
        const auth0Sub = req.auth.payload.sub;
        const { username, email } = req.body;

        if (!username || !email) {
            return res
                .status(400)
                .json({ message: "username and email are required." });
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