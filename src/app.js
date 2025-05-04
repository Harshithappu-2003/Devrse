const express = require('express'); // Import express

const app = express(); // Create an instance of express

app.use("/test", (req, res) => {
    res.send('Hello World!');
});

app.use("/Hello", (req, res) => {
    res.send('Hello From the server!');
});

app.listen(3000, () => { // Start the server on port 3000
    console.log('Server is running on port 3000....');
});