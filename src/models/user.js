const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30,
        match: [/^[A-Za-z\s]+$/, 'First name can contain only letters'],
    },
    lastName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 30,
        match: [/^[A-Za-z\s]+$/, 'Last name can contain only letters'],
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],// Do not store plain passwords in production! Use hashing.

    },

    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
        validate(value) {
            if (value.length < 10 || value.length > 10) {
                throw new Error("Phone number must be 10 digits");
            }
        }
    },

    address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true,
        trim: true
    },

    state: {
        type: String,
        required: true,
        trim: true,
    },

    country: {
        type: String,
        required: true,
        trim: true,
    },

    age: {
        type: Number,
        min:18,
        max: 100,
        required: true,
        },
    
    zip: {
        type: String,
        match: [/^\d{6}$/, 'Please enter a valid 6-digit PIN code'],
        required: false
    },

    gender:{
        validate(value) {
            const genders = ["male", "female", "others"];
            if (!genders.includes(value)) {
                throw new Error("Invalid gender");
            }
        },
        type: String,
        required: false
    },

    photoUrl: {
        type: String,
        default: "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
        required: false
    },

    about: {
        type: String,
        default: "This is a default about of the user",
        maxlength: 300,
        required: false,
    },
    
    skills: {
        type: [String],
        validate: {
            validator: function (arr) {
                return arr.length > 0;
            },
            message: "At least one skill must be specified"
        }
    },
},
    {
        timestamps: true,
    });


module.exports = mongoose.model('User', userSchema);




