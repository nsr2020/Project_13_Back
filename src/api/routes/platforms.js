const upload = require("../../middlewares/file");
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
platformsRouter.post("/", upload.fields([
	{ name: 'image', maxCount: 1 },
	{ name: 'gif', maxCount: 1 }
  ]), postPlatform);
  platformsRouter.put("/:id", upload.fields([
	{ name: 'image', maxCount: 1 },
	{ name: 'gif', maxCount: 1 }
  ]), putPlatform);
platformsRouter.delete("/:id", deletePlatform);

module.exports = platformsRouter