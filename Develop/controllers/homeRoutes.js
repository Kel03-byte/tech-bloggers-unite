const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/comment', (req, res) => {
    res.render('comment_posts');
});

module.exports = router;
