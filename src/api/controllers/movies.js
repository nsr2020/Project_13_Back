const Movie = require("../models/movies")

const getMovies = async ( req,res, next) => {
try {
    const movies = await Movie.find()
    return res.status(200).json(movies)
} catch (error) {
  return res.status(400).json("Error en la solicitud")  
}
}
const getMovieById = async ( req,res, next) => {
    try {
      const {id } =req.params;
      const movie = await Movie.findById(id)  
      return res.status(200).json(movie)
    } catch (error) {
        return res.status(400).json("Error en la solicitud")  
    }
    }
    const getMoviesByCategoryAndPlatform = async (req, res, next) => {
      try {
        const { platform, category } = req.params;
        let query = {};
    
        if (platform) {
          query.platform = platform;
        }
    
        if (category) {
          query.category = category;
        }
    
        const movies = await Movie.find(query);
    
        if (movies.length === 0) {
          return res.status(404).json({ error: "No se encontraron películas para los criterios especificados." });
        }
    
        return res.status(200).json(movies);
      } catch (error) {
        console.error(error);
        return res.status(400).json("Error en la solicitud");
      }
    }
    const getMoviesByCategory = async ( req,res, next) => {
        try {
           const { category}= req.params
            const movies = await Movie.find({category}) 
            return res.status(200).json(movies)
        } catch (error) {
            return res.status(400).json("Error en la solicitud")  
        }
        }
        const getMoviesByName = async (req, res, next) => {
            try {
              const { name } = req.params;
              const movies = await Movie.find({ name: { $regex: new RegExp(name, 'i') } });
              return res.status(200).json(movies);
            } catch (error) {
              return res.status(400).json("Error en la solicitud");
            }
          };
            const getMoviesByPlatform = async (req, res, next) => {
                try {
                  const { platform} = req.params;
                  const movies = await Movie.find({ platform });
                  if (movies.length === 0) {
                    return res.status(404).json({ error: "No se encontraron películas para la plataforma especificada." });
                  }
                  return res.status(200).json(movies);
                } catch (error) {
                    console.log(error);
                  return res.status(400).json("Error en la solicitud", error);
                }
              }
            
            const postMovie = async (req, res, next) => {
                try {
                  const newMovie = new Movie(req.body);
                  console.log(req.body);
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
                      newMovie._id = id;
                      const movieUpdated = await Movie.findByIdAndUpdate(id, newMovie, {
                        new: true,
                      });
                      return res.status(200).json(movieUpdated);
                    } catch (error) {
                      return res.status(400).json("Error en la solicitud");
                    }
                  };
                    const deleteMovie = async ( req,res, next) => {
                        try {
                          const {id} = req.params   
                           const movieDeleted = await Movie.findByIdAndDelete(id) 
                           return res.status(200).json(movieDeleted)
                        } catch (error) {
                            return res.status(400).json("Error en la solicitud")  
                        }
                        }

                        module.exports = {
                            getMovies,
                            getMovieById,
                            getMoviesByCategoryAndPlatform,
                            getMoviesByCategory,
                            getMoviesByName,
                            getMoviesByPlatform,
                            postMovie,
                            putMovie,
                            deleteMovie
                        }