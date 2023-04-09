const mongoose = require('mongoose');
// const crypto = require('crypto');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name !'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name !'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please Provide your email !'],
        validate: [validator.isEmail, 'Please Enter a valid Email !'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide your password !'],
        minLength: [8, 'Password should contain 8 letter or more and 32 letter or less'],
        maxLength: [32, 'Password should contain 8 letter or more and 32 letter or less'],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!'
        },
    },
    todos: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: 'todos'
        }],
    },
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('Users', userSchema);

module.exports = User;