const jwt = require('jsonwebtoken');
const util = require('util');

exports.sign = util.promisify(jwt.sign);
exports.veryfy = util.promisify(jwt.verify);

