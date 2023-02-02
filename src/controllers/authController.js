const router = require('express').Router();

const authService = require('../services/authService.js');
const { AUTH_COOKIE_NAME } = require('../constants.js')


router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { name, username, password } = req.body;

    try{
        let token = await authService.login({ username, password });

        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/')
    }catch(err) {
        console.log(err)
        // TODO: return error response
    }
    
})

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
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
        // TODO: return error response 
    }

})


module.exports = router;
