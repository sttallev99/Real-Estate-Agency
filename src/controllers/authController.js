const router = require('express').Router();

const authService = require('../services/authService.js');
const { AUTH_COOKIE_NAME } = require('../constants.js');
const { isGuest, isAuth } = require('../middleware/authMiddleware.js')


router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try{
        let token = await authService.login({ username, password });

        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/')
    }catch(err) {
        console.log(err)
        // TODO: return error response
    }
    
})

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { name, username, password, repeatPassword } = req.body;

    if(password !== repeatPassword) {
        res.locals.error = 'Password mismatch!';

        return res.render('auth/register')
    }

    try {
        await authService.register({
            name,
            username,
            password,
            repeatPassword
        });

        res.redirect('/')
    }catch(err) {
        res.send(err.message);
        res.end();
        // TODO: return error response 
    }

});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    
    res.redirect('/')
})


module.exports = router;
