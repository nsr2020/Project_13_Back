const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getUsers, register, login, updateUser, deleteUser, removeFromSeenMovies, getUserById } = require("../controllers/users");
const usersRouter = require("express").Router();

usersRouter.get("/:id",getUserById)
usersRouter.get("/",getUsers)
usersRouter.post("/register", upload.single("image"),register)
usersRouter.post("/login", login)
usersRouter.post("/remove-seenMovies/:id",[isAuth] ,removeFromSeenMovies)
usersRouter.put("/:id",[isAuth],upload.single("image"),updateUser)
usersRouter.delete("/:id", [isAdmin], deleteUser)


module.exports = usersRouter;