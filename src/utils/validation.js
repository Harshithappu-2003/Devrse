const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    let errors = [];

    // First name
    if (!firstName) {
        errors.push("First name is required");
    } else {
        if (firstName.length < 4 || firstName.length > 30) {
            errors.push("First name must be between 4 and 30 characters");
        }
        if (!/^[A-Za-z\s]+$/.test(firstName)) {
            errors.push("First name can contain only letters and spaces");
        }
    }

    // Last name
    if (!lastName) {
        errors.push("Last name is required");
    } else {
        if (lastName.length < 1 || lastName.length > 30) {
            errors.push("Last name must be between 1 and 30 characters");
        }
        if (!/^[A-Za-z\s]+$/.test(lastName)) {
            errors.push("Last name can contain only letters and spaces");
        }
    }

    // Email
    if (!email) {
        errors.push("Email is required");
    } else if (!validator.isEmail(email)) {
        errors.push("Invalid email format");
    }

    // Password
    if (!password) {
        errors.push("Password is required");
    } else {
        if (!validator.isLength(password, { min: 8 })) {
            errors.push("Password must be at least 8 characters long");
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
            errors.push("Password must include uppercase, lowercase, number, and special character");
        }
    }

    // Final error check
    if (errors.length > 0) {
        throw new Error(errors.join(" | "));
    }
};

module.exports = {
    validateSignUpData,
};
