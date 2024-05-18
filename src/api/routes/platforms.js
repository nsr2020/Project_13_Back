const {
	getPlatforms,
	getPlatformById,
	getPlatformByName,
	putPlatform,
	postPlatform,
	deletePlatform,

} = require("../controllers/platforms");

const platformsRouter = require("express").Router();

platformsRouter.get("/name/:name", getPlatformByName);
platformsRouter.get("/:id", getPlatformById);
platformsRouter.get("/", getPlatforms);
platformsRouter.post("/", postPlatform);
platformsRouter.put("/:id", putPlatform);
platformsRouter.delete("/:id", deletePlatform);

module.exports = platformsRouter