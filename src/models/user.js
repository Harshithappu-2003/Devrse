const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        // index: true, // Indexing for faster search
        minLength: 4,
        maxLength: 30,
        match: [/^[A-Za-z\s]+$/, 'First name can contain only letters'],
    },
    lastName: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        match: [/^[A-Za-z\s]+$/, 'Last name can contain only letters'],
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format");
            }
        },
    },
    password: { // always hash passwords before storing them
        // Use a library like bcrypt to hash passwords before saving them
        // and compare them during login
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol");
            }
        }, // Do not store plain passwords in production! Use hashing.

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
        enum: {
            values:["male", "female", "others"],
            message: `{VALUE} is not a valid gender type`
        },
        // validate(value) {
        //     const genders = ["male", "female", "others"];
        //     if (!genders.includes(value)) {
        //         throw new Error("Invalid gender");
        //     }
        // },
        type: String,
        required: false
    },

    photoUrl: {
        type: String,
        default: "https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL format");
            }
        },
        match: [/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/, 'Please enter a valid image URL'],
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
    }
);


userSchema.index({firstName: 1});
userSchema.index({gender: 1});

userSchema.methods.getJWT = async function () {
    const user = this;
    
    const token = await jwt.sign({_id: this._id}, "DEVRSE@COMMUNITY$@2025", {expiresIn: "1d"});
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bycrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
};

module.exports = mongoose.model('User', userSchema);




