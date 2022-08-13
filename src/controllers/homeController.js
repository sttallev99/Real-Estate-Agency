const router = require('express').Router();

const housingService = require('../services/housingService');

router.get('/', async (req, res) => {
    const housings = await housingService.getTopHouses()
    res.render('home', { housings });
});

router.get('/search', async(req, res) => {
    if(!req.query.text) {
        res.render('search');
    } else {
        const housings = await housingService.search(req.query.text);
        res.render('search', { housings });
    }
});

// router.post('/search', async(req, res) => {
//     console.log(req.query)
//     //const housings = await housingService.search(req.query.text);

//     res.redirect('/search')
// });

module.exports = router;