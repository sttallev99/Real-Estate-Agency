const router = require('express').Router();

const authService = require('../services/authService');
const { AUTH_COOKIE_NAME } = require('../constants');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');

router.get('/register', isGuest,  (req, res) => {
    res.render('auth/register');
});

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login')
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);

    res.redirect('/');
});

router.post('/register', isGuest, async (req, res) => {
    const {name, username, password, repeatPassword} = req.body;

    if(password !== repeatPassword) {
        res.locals.error = 'Password mismatch';

        return res.render('/register');
    }

    try {
        await authService.register({
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

router.post('/login', isGuest, async(req, res) => {
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