const { sign } = require('../utils/jwt.js')
const User = require('../models/User.js');
const { JWT_SECRET } = require('../constants.js')


exports.login = async ({ username, password }) => {
    let user = await User.findOne({username});

    if(!user) {
        throw new Error('Invalid username or password ');
    }

    let isValid = await user.validatePassword(password);

    if(!isValid) {
        throw new Error('Invalid username or password ');
    }

    let payload = {
        _id: user._id,
        name: user.name,
        username: user.username
    }

    let token = await sign(payload, JWT_SECRET);

    return token;

}

exports.register = (userData) => User.create(userData);