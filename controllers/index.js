const router = require('express').Router();

//router directions for frontend and backend api
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);


module.exports = router;