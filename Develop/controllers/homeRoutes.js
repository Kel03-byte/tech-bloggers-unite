//const { Post, User, Comment } = require('../models');
const Post = require('../models/Post')
const User = require('../models/User')
const Comment = require('../models/Comment')
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'post_title',
                'post_content',
                'created_at',
            ],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username', 'id']
                }
            ]
        });
        const posts = postData.map((post) =>
            post.get({ plain: true }))
        res.render('homepage', { posts, loggedIn: req.session.loggedIn }
        );
    }
    catch (error) {
        res.status(500).json(error.message);
    };
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            attributes: [
                'id',
                'post_title',
                'post_content',
                'created_at',
            ],
            include: [
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username', 'id']
                }
            ]
        });
        const posts = postData.map((post) =>
            post.get({ plain: true }))
        res.render('comment_posts', { posts, loggedIn: req.session.loggedIn }
        );
    }
    catch (error) {
        res.status(500).json(error.message);
    };
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
  });

// router.get('/', async (req, res) => {

//     res.render('homepage');
// });

// router.get('/signup', (req, res) => {
//     res.render('signup');
// });

// router.get('/login', (req, res) => {
//     res.render('login');
// });

module.exports = router;
