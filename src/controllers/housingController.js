const router = require('express').Router();

const housingService = require('../services/housingService.js');

router.get('/', (req, res) => {
    res.render('housing')
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', async (req, res) => {
    await housingService.create(req.body);

    res.redirect('/housing')
})

module.exports = router;