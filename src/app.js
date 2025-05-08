const express = require('express'); // Import express

const app = express(); // Create an instance of express


app.get("/user", (req, res) => {
    res.send("User Data Retrieved");
});


app.use("/",(err, req, res, next)=> {
  if (err) {
    console.error(err.stack); // Log the error stack trace
    res.status(500).send('Something broke!'); // Send a 500 response
  }
});

app.listen(3000, () => { // Start the server on port 3000
    console.log('Server is running on port 3000....');
});