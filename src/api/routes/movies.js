const upload = require("../../middlewares/file");
const {
	getMovies,
	getMovieById,
	/* getMoviesByCategoryAndPlatform, */
	/* getMoviesByCategory, */
	/* getMoviesByName, */
    /* getMoviesByPlatform, */
	putMovie,
	postMovie,
	deleteMovie,
	getMoviesByFilters,
} = require("../controllers/movies");

const moviesRouter = require("express").Router();


moviesRouter.get('/search/:name?/:platform?/:category?', getMoviesByFilters);
/* moviesRouter.get("/name/:name", getMoviesByName) */
/* moviesRouter.get("/category/:category",getMoviesByCategory) */
/* moviesRouter.get("/platform/:platform", getMoviesByPlatform) */
/* moviesRouter.get("/platform_category/:platform/:category", getMoviesByCategoryAndPlatform) */
moviesRouter.get("/:id", getMovieById);
moviesRouter.get("/", getMovies);
moviesRouter.post("/", upload.single("image"),postMovie);
moviesRouter.put("/:id", upload.single("image"),putMovie);
moviesRouter.delete("/:id", deleteMovie);

module.exports = moviesRouter