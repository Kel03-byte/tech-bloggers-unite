// Dashboard Route mapping - what the user will see when on the Dashboard page!

const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Render Dashboard Page
router.get("/", withAuth, async (request, response) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: request.session.user_id,
            },
            include: [{ model: User }],
            attributes: [
                'id',
                'post_title',
                'post_content',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC'],
            ],
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        response.render("dashboard", {
            posts,
            user_id: request.session.user_id,
            loggedIn: request.session.loggedIn
        });
    } catch (error) {
        response.status(500).json(error.message);
    }
});

// Render New Post Page
router.get('/new', withAuth, async (request, response) => {
    try {
        response.render('newpost', { loggedIn: request.session.loggedIn });
    } catch (error) {
        console.log(error);
        response.status(500).json(error.message);
    }
});

// Render Edit Post Page
router.get('/edit/:id', withAuth, async (request, response) => {
    try {
        const postData = await Post.findByPk(request.params.id, {
            where: {
                id: request.params.id,
            },
            include: [{ model: User }],
            attributes: [
                'id',
                'post_title',
                'post_content',
                'created_at'
            ],
        });
        const post = postData.get({ plain: true });
        response.render("editpost", {
            post,
            loggedIn: request.session.loggedIn
        });
    } catch (error) {
        response.status(500).json(error.message);
    }
});

module.exports = router;