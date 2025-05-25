const express = require('express');
const app = express();
const connectDB = require("./config/database");

// const user = require('./models/user');

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

// Importing routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

// Using routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => {
        console.log('Server is running on port 3000....');
    });
}).catch((err) => {
    console.log("MongoDB connection failed", err);
});
































    // creating a new user instance of the model
    // const user = new User({
    //   firstName : "Ms ",
    //   lastName : "dhoni",
    //   address : "123, 1st cross, 2nd main",
    //   email : "msdhoni@gmail.com",
    //   password : "Msdhoni@123", 
    //   phone : "7204673504",
    //   age: 44,
    //   zip: "560001",
    //   country: "India",
    //   state: "Jharkhand",
    //   city: "Ranchi"
    // });




    // app.patch("/user", async (req, res) => {
    //     const userId = req.body.userId;
    //     const data = req.body;
    //     try{
    //         await user.save();
    //         res.send("User created successfully");
    //     } catch (err) {
    //         res.status(500).send("Error creating user: " + err.message);
    //     }



    //     console.log(data);
//     try {
//         const ALLOWED_UPDATES = ["photoUrl", "password", "age", "skills", "about", "gender"];

//         const isUpdateAllowed = Object.keys(data).every((k) => {
//             return ALLOWED_UPDATES.includes(k);
//         });
        
//         if(!isUpdateAllowed) {
//             throw new Error("Invalid update fields");
//         }

//         const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//             returnDocument: "after",
//             runValidators: true,

//         });
//         console.log(user);
//         res.send("User updated successfully");
//     } catch (err) {
//         res.status(400).send("UPDATE FAILED: " + err.message);
//     }
// });