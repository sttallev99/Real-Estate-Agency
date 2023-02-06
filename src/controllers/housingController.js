const router = require('express').Router();

const housingService = require('../services/housingService.js');

router.get('/', async (req, res) => {
    let housings = await housingService.getAll();

    res.render('housing', { housings })
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', async (req, res) => {
    await housingService.create({...req.body, owner: req.user._id});

    res.redirect('/housing')
});

router.get('/:housingId', async (req, res) => {
    let housing = await housingService.getOne(req.params.housingId);

    let isOwner = housing.owner == req.user?._id;

    let tenants = housing.getTenants();

    let housingData = housing.toObject();

    res.render('housing/details', { ...housingData, isOwner, tenants })
});

module.exports = router;