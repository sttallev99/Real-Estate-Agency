const router = require('express').Router();

const authService = require('../services/authService.js')

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {
    console.log(req.body);
    res.end();
})

router.get('/login', (req, res) => {
    res.render('auth/login');
});

module.exports = router;
