const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.get('/test', (req, res) => {
    res.send('change test');
});

router.get('/', (req, res) => {
    res.render('landing');
});

router.get('/notes', (req, res) => {
    res.render('notes');
});

module.exports = router;