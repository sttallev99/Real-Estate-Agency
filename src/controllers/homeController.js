const router = require('express').Router();

const housingService = require('../services/housingService');

router.get('/', async (req, res) => {
    const housings = await housingService.getTopHouses();

    res.render('home', { housings });
});

module.exports = router;
