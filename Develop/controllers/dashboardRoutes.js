const router = require('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
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

router.get('/edit/:id', withAuth, async (req, res) => {
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
        res.render('edit_posts', { posts, loggedIn: req.session.loggedIn }
        );
    }
    catch (error) {
        res.status(500).json(error.message);
    };
});

router.get('/new', withAuth, async (req, res) => {
    try {
        res.render('new_post', { loggedIn: req.session.loggedIn }
        );
    }
    catch (error) {
        res.status(500).json(error.message);
    };
});

module.exports = router;