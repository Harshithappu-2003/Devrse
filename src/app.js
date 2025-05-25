// const express = require('express'); // Import express
// const connectDB =require("./config/database"); // Import the database connection
// const app = express(); // Create an instance of express
// const User = require("./models/user"); // Import the User model

// app.post("/signup", async (req, res) => {
//     const user = new User({
//       firstName : "Harshith",
//       lastName : "P",
//       address : "123, 1st cross, 2nd main",
//       email : "harshithparam20@gmail.com",
//       password : "Harshith@123",
//       phone : "1234567890",
//     }); // Create a new user instance

//     await user.save()
//     res.send("User created successfully");
// });


// connectDB().then(() => {
//     console.log("MongoDB connected successfully");
//     app.listen(3000, () => { // Start the server on port 3000
//     console.log('Server is running on port 3000....');
// });
// }
// ).catch((err) => {
//     console.log("MongoDB connection failed", err);
// }
// );


const express = require('express');
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const user = require('./models/user');
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");


// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req, res) => {

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

app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
    try {

        const user = req.user;// Assuming user is set in the request by the userAuth middleware

        res.send(user);
    } catch (err) {
        res.status(401).send("Unauthorized: " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    // Sending a connection request to another user

    console.log("Sending connection request to user");

    res.send(user.firstName + " sent the connection request!");
})




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