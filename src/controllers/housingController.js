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
    let isAvailable = housing.availablePieces > 0;
    let isRented = housing.tenants.some(x => x._id == req.user?._id);


    res.render('housing/details', { ...housingData, isOwner, tenants, isAvailable, isRented })
});

router.get('/:housingId/rent', async (req, res) => {
    
    await housingService.addTenant(req.params.housingId, req.user._id);

    res.redirect(`/housing/${req.params.housingId}`)
});

router.get('/:housing/delete', async (req, res) => {
    await housingService.delete(req.params.housing);

    res.redirect('/housing');
});

router.get('/:housingId/edit', async (req, res) => {
    housing = await housingService.getOne(req.params.housingId);

    res.render('housing/edit', { ...housing.toObject() })
})


module.exports = router;