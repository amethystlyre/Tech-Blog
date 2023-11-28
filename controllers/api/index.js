const router = require('express').Router();

//routes for user and post backend data
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);


module.exports = router;
