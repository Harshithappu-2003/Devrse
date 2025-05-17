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
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.post("/signup", async (req, res) => {
    // creating a new user instance of the model
    const user = new User({
      firstName : "Harshith",
      lastName : "P",
      address : "123, 1st cross, 2nd main",
      email : "873@gmail.com",
      password : "Harshith@123", 
      phone : "1234567890",
      age: 23,
      zip: "560001",
      country: "India",
      state: "Karnataka",
      city: "Bangalore"
    });


    try{
        await user.save();
        res.send("User created successfully");
    } catch (err) {
        res.status(500).send("Error creating user: " + err.message);
    }

});

connectDB().then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => {
        console.log('Server is running on port 3000....');
    });
}).catch((err) => {
    console.log("MongoDB connection failed", err);
});


