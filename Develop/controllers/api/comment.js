const router = require('express').Router();
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll()
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create(req.body, {
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });
        res.status(200).json(commentData);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router;