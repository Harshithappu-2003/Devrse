const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {

    try {
    // Validation of data
    validateSignUpData(req);

    const {firstName, lastName, email, password, phone, address, city, state, country, zip, age, skills } = req.body;


    // Encrypting password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);


    // Saving the user to the database

    // Creating a new instance of the User model
    const user = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        phone,
        address,
        city,
        state,
        country,
        zip,
        age,
        skills
});


    await user.save();
    res.send('User Added successfully!');
} catch (err) {
    res.status(400).send("ERROR :" + err.message);
}
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {

            // Create a JWT token
            const token = await user.getJWT();

            // Add the token to the cookie and send the  response back to user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiration
            });
            res.send("Login successful!!!");
        } else {
            throw new Error("Invalid Credentials!!");
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});



module.exports = authRouter;