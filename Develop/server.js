// Dependencies
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const sessionMiddleware = require("express-session");
const chalk = require("chalk");
const helpers = require('./utils/helpers');

// Stores all session data once user is signed in
const SequelizeStore = require("connect-session-sequelize")(
  sessionMiddleware.Store
);

const routes = require("./controllers");
const sequelize = require("./config/connection");


// Set up Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Used to store session data
const sessionMiddlewareConfiguration = {
  secret: process.env.SECRET, // Key to the session
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(sessionMiddleware(sessionMiddlewareConfiguration));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware to display CSS and JS files for displaying and functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Sets up the server to start listening at a port
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(chalk.magenta(`Now listening at port ${PORT}`))
  );
});