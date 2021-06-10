const router = require('express').Router();
const commentRoutes = require('./comment');
const postRoutes = require('./post');
const userRoutes = require('./user');

router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;