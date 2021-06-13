const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('dashboard');
});

router.get('/new', (req, res) => {
    res.render('new_post');
});

router.get('/edit', (req, res) => {
    res.render('edit_posts');
});

module.exports = router;