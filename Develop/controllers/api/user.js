const router = require('express').Router();
const User = require('../../models/User');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        request.session.save(() => {
            request.session.loggedIn = true;
            res.status(200).json(userData);
        });
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

router.post('./logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        response.status(404).end();
    }
});

module.exports = router;