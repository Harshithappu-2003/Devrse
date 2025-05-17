const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://harshith_p:Harshith%40123@devrse.sbe1lil.mongodb.net/devrse?retryWrites=true&w=majority&appName=Devrse");
};

module.exports = connectDB;




