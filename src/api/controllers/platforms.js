const Platform = require("../models/platforms")


const getPlatforms = async ( req,res, next) => {
try {
    const platforms = await Platform.find().populate("movies")
    return res.status(200).json(platforms)
} catch (error) {
  return res.status(400).json("Error en la solicitud")  
}
}
const getPlatformById = async ( req,res, next) => {
    try {
      const {id } =req.params;
      const platform = await Platform.findById(id).populate("movies") 
      return res.status(200).json(platform)
    } catch (error) {
        return res.status(400).json("Error en la solicitud")  
    }
    }

            const postPlatform = async (req, res, next) => {
                try {
                  const newPlatform = new Platform(req.body);
                  const platformSaved = await newPlatform.save();
                  return res.status(201).json(platformSaved);
                } catch (error) {
                  return res.status(400).json(error);
                }
              };

                const putPlatform = async (req, res, next) => {
                    try {
                      const { id } = req.params;
                      const oldPlatform = await Platform.findById(id);
                      const newPlatform = new Platform(req.body);
                      newPlatform._id = id;
                      newPlatform.movies = [...oldPlatform.movies, ...req.body.movies]
                      const platformUpdated = await Platform.findByIdAndUpdate(id, newPlatform, {
                        new: true,
                      });
                      return res.status(200).json(platformUpdated);
                    } catch (error) {
                      return res.status(400).json("Error en la solicitud");
                    }
                  };
                    const deletePlatform = async ( req,res, next) => {
                        try {
                          const {id} = req.params   
                           const platformDeleted = await Platform.findByIdAndDelete(id) 
                           return res.status(200).json(platformDeleted)
                        } catch (error) {
                            return res.status(400).json("Error en la solicitud")  
                        }
                        }

                        module.exports = {
                            getPlatforms,
                            getPlatformById,
                            postPlatform,
                            putPlatform,
                            deletePlatform
                        }