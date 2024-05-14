const {
	getMovies,
	getMovieById,
	getMoviesByCategory,
	getMoviesByName,
    getMoviesByPlatform,
	putMovie,
	postMovie,
	deleteMovie,
} = require("../controllers/movies");

const moviesRouter = require("express").Router();

moviesRouter.get("/name/:name", getMoviesByName)
moviesRouter.get("/category/:category",getMoviesByCategory)
moviesRouter.get("/platform/:platform", getMoviesByPlatform)
moviesRouter.get("/:id", getMovieById);
moviesRouter.get("/", getMovies);
moviesRouter.post("/", postMovie);
moviesRouter.put("/:id", putMovie);
moviesRouter.delete("/:id", deleteMovie);

module.exports = moviesRouter