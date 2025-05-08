const express = require('express'); // Import express

const app = express(); // Create an instance of express

const { adminAuth, userAuth } = require("./middlewares/auth");


// Handle Auth Middleware for all GET POST,... requests
app.use("/admin", adminAuth );
app.use("/user", userAuth);

app.get("/admin/getALLData", (req, res) => {
    res.send("All Data Sent");
});

app.get("/user/getUserData", (req, res) => {
    res.send("User Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted a user");
});


app.listen(3000, () => { // Start the server on port 3000
    console.log('Server is running on port 3000....');
});