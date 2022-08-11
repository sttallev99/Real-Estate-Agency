const router = require('express').Router();

const housingService = require('../services/housingService');

router.get('/', async(req, res) => {
    const housings = await housingService.getAll();
    res.render('housing', { housings });
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', async(req, res) => {

    try {
        await housingService.create({ ...req.body, owner: req.user._id });
        res.redirect('/housing');
    } catch(err) {
        console.log(err);
    }

});

router.get('/:id/details', async(req, res) => {
    let housing = await housingService.getOne(req.params.id);
    let housingData = housing.toObject();
 
    let isOwner = housingData.owner == req.user?._id;

    let tenants = housing.getTenants();

    let isAvailable = housing.availablePieces > 0;
    let isRentedByYou = housing.tenants.some(x => x._id == req.user?._id);

    res.render('housing/details', { ...housingData, isOwner, tenants, isAvailable, isRentedByYou })
});

router.get('/:id/rent', async (req, res) => {
    await housingService.addTenant(req.params.id, req.user._id);

    res.redirect(`/housing/${req.params.id}/details`);
});

router.get('/:id/delete', async(req, res) => {
    await housingService.delete(req.params.id);

    res.redirect('/housing')
});

router.get('/:id/edit', async(req, res) => {
    let housing = await housingService.getOne(req.params.id);

    res.render('housing/edit', { ...housing.toObject() })
});

router.post('/:id/edit', async(req, res) => {
    await housingService.updateHousing(req.params.id, req.body);

    res.redirect(`/housing/${req.params.id}/details`);
});

module.exports = router;