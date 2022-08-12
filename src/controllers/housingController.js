const router = require('express').Router();

const housingService = require('../services/housingService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', async(req, res) => {
    const housings = await housingService.getAll();
    res.render('housing', { housings });
});

router.get('/create',isAuth, (req, res) => {
    res.render('housing/create');
});

router.post('/create',isAuth,  async(req, res) => {

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

async function isOwner(req, res, next) {
    let housing = await housingService.getOne(req.params.id);

    if(housing.owner == req.user._id) {
        res.redirect(`/housing/${req.params.id}/details`);
    } else {
        next();
    }
}

router.get('/:id/rent',isOwner, async (req, res) => {
    await housingService.addTenant(req.params.id, req.user._id);

    res.redirect(`/housing/${req.params.id}/details`);
});

router.get('/:id/delete', isntOwner, async(req, res) => {
    await housingService.delete(req.params.id);

    res.redirect('/housing')
});

router.get('/:id/edit', isntOwner, async(req, res) => {
    let housing = await housingService.getOne(req.params.id);

    res.render('housing/edit', { ...housing.toObject() })
});

router.post('/:id/edit', isntOwner, async(req, res) => {
    await housingService.updateHousing(req.params.id, req.body);

    res.redirect(`/housing/${req.params.id}/details`);
});

async function isntOwner(req, res, next) {
    let housing = await housingService.getOne(req.params.id);

    if(housing.owner !== req.user._id) {
        next();
    } else {
        res.redirect(`/housing/${req.params.id}/details`);
    }
}

module.exports = router;