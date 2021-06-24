// Post Route to create a Comment

const router = require("express").Router();
const { Comment } = require("../../models");

router.get("/", async (request, response) => {
    try {
        const commentData = await Comment.findAll({
        });
        response.status(200).json(commentData);
    } catch (error) {
        console.log(error.message);
        response.status(500).json(error.message);
    }
});

// Create a new Comment
router.post('/', async (request, response) => {
    try {
        if (request.session) {
            const commentData = await Comment.create({
                comment_text: request.body.comment_text,
                post_id: request.body.post_id,
                user_id: request.session.user_id,
            });

            response.status(200).json(commentData);
        }
    } catch (error) {
        response.status(500).json(error.message);
    }
});
module.exports = router;