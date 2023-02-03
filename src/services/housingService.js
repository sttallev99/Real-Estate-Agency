const Housing = require('../models/Housing.js');

exports.create = (housingData) => Housing.create(housingData);