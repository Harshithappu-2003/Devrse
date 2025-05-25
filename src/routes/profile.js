const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
    try {

        const user = req.user;// Assuming user is set in the request by the userAuth middleware

        res.send(user);
    } catch (err) {
        res.status(401).send("Unauthorized: " + err.message);
    }
});

module.exports = profileRouter;