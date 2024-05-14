const User = require("../api/models/users");
const { verifyJwt } = require("../config/jwt");

const getUserFromToken= async (req) => {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");
    const { id } = verifyJwt(parsedToken);
    const user = await User.findById(id);
    return user;
};
const openDoor = (req, user, next) => {
    user.password = null;
    req.user = user;
    next();
}

const isAuth = async (req, res, next) => {
  try {
      const user = await getUserFromToken(req);
      openDoor(req, user, next);
  } catch (error) {
      return res.status(400).json("This action is not allowed");
  }
}

const isAdmin = async (req, res, next) => {
    try {
      const user = await getUserFromToken(req)
  
        if(user.rol === "admin"){
            openDoor(req, user, next)
        }else{
          res.status(400).json("This action is only allowed for admin users")
        }
    } catch (error) {
        return res.status(400).json("This action is not allowed");
    }
  }
  
module.exports = {isAuth, isAdmin}