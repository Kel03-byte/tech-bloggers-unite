// User Route to find and create a User

const router = require("express").Router();
const { User } = require("../../models");

// Get all Users
router.get("/", async (request, response) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    response.status(200).json(userData);
  } catch (error) {
    console.log(error.message);
    response.status(500).json(error.message);
  }
});

// Create a new User (sign up)
router.post('/', async (request, response) => {
  try {
      const userData = await User.create({
          username: request.body.username,
          password: request.body.password,
      });
      request.session.save(() => {
          request.session.user_id = userData.id;
          request.session.username = userData.username;
          request.session.loggedIn = true;

          response.status(200).json({user: userData, message: "You are now signed up!"});
      });
  } catch (error) {
      console.log(error.message);
      response.status(500).json(error.message);
  }
});

// Login
router.post("/login", async (request, response) => {
  try {
    const userData = await User.findOne({
      where: {
        username: request.body.username,
      },
    });

    if (!userData) {
      response.status(400).json({ message: "Incorrect username or password" });
      return;
    }

    const validPassword = await userData.checkPassword(request.body.password);

    if (!validPassword) {
      response.status(400).json({ message: "Incorrect username or password" });
      return;
    }

    request.session.save(() => {
      request.session.loggedIn = true;
      request.session.username = userData.username;
      request.session.user_id = userData.id;

      response.status(200).json({ user: userData, message: "Logged In" });
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json(error.message);
  }
});

// Logout
router.post("/logout", (request, response) => {
  if (request.session.loggedIn) {
    request.session.destroy(() => {
      response.status(204).end();
    });
  } else {
    response.status(404).end();
  }
});

module.exports = router;