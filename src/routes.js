const router = require('express').Router();

const { route } = require('./controllers/homeController');
const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const housingController = require('./controllers/housingController');

router.use(homeController);
router.use(authController);
router.use('/housing', housingController);

module.exports = router;