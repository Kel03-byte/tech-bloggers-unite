// Post Route to find and create a Post

const router = require("express").Router();
const { Post } = require("../../models");

// Create a new Post
router.post('/', async (request, response) => {
    try {
        const postData = await Post.create({
            post_title: request.body.post_title,
            post_content: request.body.post_content,
            user_id: request.session.user_id
        });
        request.session.save(() => {
            request.session.post_id = postData.id;
            request.session.loggedIn = true;

            response.status(200).json({ postData, message: "Your post has been created!" });
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json(error.message);
    }
});

// Edit a Post
router.put('/:id', async (request, response) => {
    try {
        const postData = await Post.update({
            post_title: request.body.post_title,
            post_content: request.body.post_content,
        },
            {
                where: {
                    id: request.params.id,
                },
            });
        if (!postData) {
            response.status(404).json({ message: 'Unable to find that post' });
            return;
        }
        response.status(200).json({ message: `Updated post id #${request.params.id}` });
    } catch (error) {
        response.status(500).json(error.message);
    }
});

// Delete a Post
router.delete('/:id', async (request, response) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: request.params.id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'Unable to find that post' });
            return;
        }

        response.status(200).json({ message: `Post id #${request.params.id} has been removed` });
    } catch (error) {
        response.status(500).json(error.error.message);
    }
});

module.exports = router;