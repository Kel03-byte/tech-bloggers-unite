const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');

router.post('/', async (req, res) => {
    try {
        const newUser = req.body;
        newUser.password = await bcrypt.hash(req.body.password, 10);
        const userData = await User.create(newUser);
        res.status(200).json(userData);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            res.status(400).json({ message: 'Login failed. Please try again!' });
            return;
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        );
        if (!validPassword) {
            res.status(400).json({ message: 'Login failed. Please try again!' });
            return;
        }
        res.status(200).json({ message: 'You are now logged in!' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;