const router = require('express').Router();

const authService = require('../services/authService');
const { AUTH_COOKIE_NAME } = require('../constants');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.get('/login', (req, res) => {
    res.render('auth/login')
});

router.post('/register', async (req, res) => {
    const {name, username, password, repeatPassword} = req.body;

    if(password !== repeatPassword) {
        res.locals.error = 'Password mismatch';

        return res.render('/register');
    }

    try {
        authService.register({
            name,
            username,
            password,
            repeatPassword
        });
    
        let token = await authService.login({ username, password });

        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/');
    } catch(err) {
        // TODO: retrun error
    }

});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });

        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/');
    }catch(err) {
        //TODO: return proper notification
        res.end();
    }
});

module.exports = router;