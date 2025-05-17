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
const user = require('./models/user');
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.post("/signup", async (req, res) => {
    // Creating a new instance of the User model
const user = new User(req.body);

try {
    await user.save();
    res.send('User Added successfully!');
} catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
}
});


//Get user by email
app.get("/user", async (req, res) => {
    const email = req.body.email;

    try {
        console.log(email);
        const user = await User.findOne({ email: email }).exec();
        if(!user){
            res.status(404).send("User not found");
        } else {
            res.send(user);
        }
    }
    catch (err) {
        res.status(400).send("Error fetching user: " + err.message);
    }
});

// Feed API - GET/feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try {
        const user = await User.find({});
        res.send(user);
    } catch (err) {
        res.status(400).send("something went wrong");
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        // const user = await User.findByIdAndDelete({ _id: userId });
        const user = await User.findByIdAndDelete(userId);

        res.send("User deleted successfully");
    } catch (err) {
        res.status(500).send("Error deleting user: " + err.message);
    }
})

// Update data of the user
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    console.log(data);
    try {
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true,

        });
        console.log(user);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("UPDATE FAILED: " + err.message);
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


    // try{
    //     await user.save();
    //     res.send("User created successfully");
    // } catch (err) {
    //     res.status(500).send("Error creating user: " + err.message);
    // }
