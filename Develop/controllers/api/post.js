const router = require('express').Router();
const Post = require('../../models/Post');
const withAuth = require('../../utils/auth');

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
        res.json(posts);
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
            post.get({ plain: true }));
        res.json(posts);
    }
    catch (error) {
        res.status(500).json(error.message);
    };
});

module.exports = router;