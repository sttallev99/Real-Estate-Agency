const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUND = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_ROUND)
        .then(hash => {
            this.password = hash;

            next();
        })
});

userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password)
});

const User = mongoose.model('User', userSchema);

module.exports = User;