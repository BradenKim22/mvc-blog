const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashBoard = require('./dashboard');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashBoard);

module.exports = router;