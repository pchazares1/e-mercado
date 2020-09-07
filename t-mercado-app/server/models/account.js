const mongoose = require('mongoose');

// RFC 2822

const matchEmail = validate => {
    if (validate === accountSchema.email) return validate;
}

const matchPassword = validate => {
    if(validate === accountSchema.password) return validate;
}

const accountSchema = mongoose.Schema({
    fname: {
        type: String,
        required: [true, 'First name is required']
    },
    lname: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minlength: [3, 'Email cannot be less than 3 letters'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Not a valid email']
    },
    cemail: {
        type: String,
        required: [true, 'Confirmation email is required'],
        minlength: 3,
        validate: [matchEmail, 'Must match your email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min: [8, 'Password cannot be less than 8 letters']
    },
    cpassword: {
        type: String,
        required: [true, 'Confirmation password is required'],
        min: 8,
        validate: [matchPassword, 'Must match your password']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Account', accountSchema);