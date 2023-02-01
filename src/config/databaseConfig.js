const mongoose = require('mongoose');

const { DB_CONNECTION_STRING } = require('../constants.js');

mongoose.set('strictQuery', false);

exports.initDatabase = function() {
    return mongoose.connect(DB_CONNECTION_STRING);
}



