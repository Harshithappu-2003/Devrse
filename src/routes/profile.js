const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");



profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {

        const user = req.user;// Assuming user is set in the request by the userAuth middleware

        res.send(user);
    } catch (err) {
        res.status(401).send("Unauthorized: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user; // Assuming user is set in the request by the userAuth middleware

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save(); // Save the updated user document

        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully`,
            data: loggedInUser,
        });

    } catch (err) {
        res.status(400).json({ error: "ERROR : " + err.message });
    }
});

module.exports = profileRouter;