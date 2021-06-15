const router = require('express').Router();
const commentRoutes = require('./comment');
const postRoutes = require('./post');
const userRoutes = require('./user');

router.use('/comments', commentRoutes);
router.use('/post', postRoutes);
router.use('/users', userRoutes);

module.exports = router;