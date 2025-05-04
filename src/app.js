const express = require('express'); // Import express

const app = express(); // Create an instance of express


app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Harshith", lastName: "P" });
});


app.listen(3000, () => { // Start the server on port 3000
    console.log('Server is running on port 3000....');
});