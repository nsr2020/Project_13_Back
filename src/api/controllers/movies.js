const { deleteFile } = require("../../utils/deleteFile");
const Movie = require("../models/movies");

const getMovies = async (req, res, next) => {
	try {
		const movies = await Movie.find();
		return res.status(200).json(movies);
	} catch (error) {
		return res.status(400).json("Error en la solicitud");
	}
};
const getMovieById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const movie = await Movie.findById(id);
		return res.status(200).json(movie);
	} catch (error) {
		return res.status(400).json("Error en la solicitud");
	}
};

const getMoviesByFilters = async (req, res, next) => {
	try {
		const { name, category, platform } = req.params;
		let query = {};

		if (name && name !== "*") {
			query.name = { $regex: new RegExp(name, "i") };
		}

		if (category && category !== "*") {
			query.category = category;
		}

		if (platform && platform !== "*") {
			query.platform = platform;
		}

		const movies = await Movie.find(query);

		if (movies.length === 0) {
			return res
				.status(404)
				.json({
					error:
						"No se encontraron películas para los criterios especificados.",
				});
		}

		return res.status(200).json(movies);
	} catch (error) {
		console.error(error);
		return res.status(400).json("Error en la solicitud");
	}
};

const postMovie = async (req, res, next) => {
	try {
		const newMovie = new Movie(req.body);
		if (req.file) {
      newMovie.image = req.file.path;
    }
		const movieSaved = await newMovie.save();
		return res.status(201).json(movieSaved);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const putMovie = async (req, res, next) => {
	try {
		const { id } = req.params;
		const newMovie = new Movie(req.body);
    if(req.file){
      newMovie.image = req.file.path
      const olderMovie = await Movie.findById(id);
      deleteFile(olderMovie.image)
    }
		newMovie._id = id;
		const movieUpdated = await Movie.findByIdAndUpdate(id, newMovie, {
			new: true,
		});
		return res.status(200).json(movieUpdated);
	} catch (error) {
    console.log(error);
		return res.status(400).json("Error en la solicitud");
	}
};
const deleteMovie = async (req, res, next) => {
	try {
		const { id } = req.params;
		const movieDeleted = await Movie.findByIdAndDelete(id);
		console.log(movieDeleted.image);
    deleteFile(movieDeleted.image)
		return res.status(200).json({
			message: 'Movie deleted successfully',
			deletedMovie: movieDeleted,
		})
	} catch (error) {
		return res.status(400).json("Error en la solicitud");
	}
};

module.exports = {
	getMovies,
	getMovieById,
	getMoviesByFilters,
	postMovie,
	putMovie,
	deleteMovie,
};
