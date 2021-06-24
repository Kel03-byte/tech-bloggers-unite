// Home Route mapping - what the user will see when on the Home Page!

const router = require("express").Router();
const { Post, User, Comment } = require('../models');

router.get("/", async (request, response) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
      attributes: [
        'id',
        'post_title',
        'post_content',
        'created_at'
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    response.render("homepage", {
      posts,
      loggedIn: request.session.loggedIn
    });
  } catch (error) {
    response.status(500).json(error.message);
  }
});

// Render Sign Up Page
router.get("/signup", (request, response) => {
  response.render("signup")
});

// Render Log In Page
router.get("/login", (request, response) => {
  response.render("login")
});

router.get('/post/:id', async (request, response) => {
  try {
      const postData = await Post.findByPk(request.params.id, {
          where: {
              id: request.params.id,
          },
          attributes: [
              'id',
              'post_title',
              'post_content',
              'created_at'
          ],
          include: [
              {
                  model: User,
                  attributes: ['username'],
              },
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
                      attributes: ['username'],
                  },
              },
          ],
      });
      if (!postData) {
          response.status(404).json({ message: 'No post found with that id' });
          return;
      }
      const post = postData.get({ plain: true });
      response.render('singlepost', { post, loggedIn: request.session.loggedIn });
  } catch (err) {
      console.log(error);
      response.status(500).json(error.message);
  }
});

module.exports = router;