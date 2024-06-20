const Platform = require("../models/platforms");
const { deleteFile } = require("../../utils/deleteFile");

const getPlatforms = async (req, res, next) => {
	try {
		const platforms = await Platform.find().populate("movies");
		return res.status(200).json(platforms);
	} catch (error) {
		return res.status(400).json("Error en la solicitud");
	}
};
const getPlatformById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const platform = await Platform.findById(id).populate("movies");
		return res.status(200).json(platform);
	} catch (error) {
		return res.status(400).json("Error en la solicitud");
	}
};
const getPlatformByName = async (req, res, next) => {
	try {
		const { name } = req.params;
		const platform = await Platform.findOne({
			name: { $regex: new RegExp(`^${name}$`, "i") },
		}).populate("movies");
		return res.status(200).json(platform);
	} catch (error) {
		return res.status(400).json("Error en la solicitud");
	}
};

const postPlatform = async (req, res, next) => {
	try {
	  const newPlatform = new Platform(req.body);
  
	  // Si hay archivos subidos, actualiza las rutas de imagen y gif
	  if (req.files) {
		if (req.files.image && req.files.image[0]) {
		  newPlatform.image = req.files.image[0].path;
		}
  
		if (req.files.gif && req.files.gif[0]) {
		  newPlatform.gif = req.files.gif[0].path;
		}
	  }
  
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
  
	  if (!oldPlatform) {
		return res.status(404).json({ message: 'Platform not found' });
	  }
  
	  const updatedData = { ...req.body };
  
	  // Si hay archivos subidos, actualiza las rutas de imagen y gif
	  if (req.files) {
		if (req.files.image && req.files.image[0]) {
		  updatedData.image = req.files.image[0].path;
		  if (oldPlatform.image) {
			deleteFile(oldPlatform.image); // Asegúrate de que deleteFile esté correctamente implementado
		  }
		} else {
		  updatedData.image = oldPlatform.image; // Mantén la imagen antigua si no se proporciona una nueva
		}
  
		if (req.files.gif && req.files.gif[0]) {
		  updatedData.gif = req.files.gif[0].path;
		  if (oldPlatform.gif) {
			deleteFile(oldPlatform.gif); // Asegúrate de que deleteFile esté correctamente implementado
		  }
		} else {
		  updatedData.gif = oldPlatform.gif; // Mantén el gif antiguo si no se proporciona uno nuevo
		}
	  } else {
		// Si no hay archivos subidos, mantén las imágenes antiguas
		updatedData.image = oldPlatform.image;
		updatedData.gif = oldPlatform.gif;
	  }
  
	  // Manejar la actualización de la lista de películas
	  if (Array.isArray(req.body.movies)) {
		updatedData.movies = [...oldPlatform.movies, ...req.body.movies];
	  } else {
		updatedData.movies = oldPlatform.movies; // Mantén las películas antiguas si no se proporciona una lista nueva
	  }
  
	  const platformUpdated = await Platform.findByIdAndUpdate(id, updatedData, { new: true });
  
	  return res.status(200).json(platformUpdated);
	} catch (error) {
	  console.log(error);
	  return res.status(400).json("Error en la solicitud");
	}
  };
  
  const deletePlatform = async (req, res, next) => {
	try {
	  const { id } = req.params;
	  const platformDeleted = await Platform.findByIdAndDelete(id);
  
	  if (platformDeleted) {
		if (platformDeleted.image) {
		  deleteFile(platformDeleted.image);
		}
		if (platformDeleted.gif) {
		  deleteFile(platformDeleted.gif);
		}
	  }
  
	  return res.status(200).json(platformDeleted);
	} catch (error) {
	  return res.status(400).json("Error en la solicitud");
	}
  };

module.exports = {
	getPlatforms,
	getPlatformById,
	getPlatformByName,
	postPlatform,
	putPlatform,
	deletePlatform,
};
