const { route } = require('./homeController');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('housing');
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', (req, res) => {
    console.log(req.body);

    res.redirect('/');
});

module.exports = router;