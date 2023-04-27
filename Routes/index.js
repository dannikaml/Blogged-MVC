const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');

router.use('/', homeRoutes);
router.use('/', blogRoutes);
router.use('/', userRoutes);


module.exports = router;