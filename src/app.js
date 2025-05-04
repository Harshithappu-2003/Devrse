const express = require('express'); // Import express

const app = express(); // Create an instance of express

app.use("/user", (req, res) => {
    res.send("HAHAHAHAHAHA");
});

// This will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({ firstName: "Harshith", lastName: "P" });
}); 

app.post("/user", (req, res) => {
    // saving data to db
    res.send("Data successfully saved to the database");
});

app.delete("/user", (req, res) => {
    // deleting data from db
    res.send("Data successfully deleted from the database");
});

// this will match all the http method API calls to /test
app.use("/test", (req, res) => {
    res.send('Hello World!');
});


app.listen(3000, () => { // Start the server on port 3000
    console.log('Server is running on port 3000....');
});