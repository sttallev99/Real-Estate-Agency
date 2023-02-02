const { AUTH_COOKIE_NAME, JWT_SECRET } = require('../constants.js');
const { verify } = require('../utils/jwt.js');

exports.auth = function(req, res, next) {
    let token = req.cookies[AUTH_COOKIE_NAME];

    if(token) {
        verify(token, JWT_SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                next();
            })
            .catch(err => {
                res.clearCookie(AUTH_COOKIE_NAME);
                //res.status(401).render('404');
                res.redirect('/auth/login');
            })
    } else {
        next();
    }
}