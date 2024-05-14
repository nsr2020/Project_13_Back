const moviesRouter = require("./movies");
const platformsRouter = require("./platforms");
const usersRouter = require("./users");

const mainRouter = require("express").Router()

mainRouter.use("/movies", moviesRouter)
mainRouter.use("/platforms", platformsRouter)
mainRouter.use("/users", usersRouter)

module.exports = mainRouter;    