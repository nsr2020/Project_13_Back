const { generateSign } = require("../../config/jwt");
const { deleteFile } = require("../../utils/deleteFile");
const User = require("../models/users");
const bcrypt = require("bcrypt")

const getUsers = async ( req, res, next ) => {
    try {
        const users = await User.find().populate("seenMovies")
        return res.status(200).json(users)
      } catch (error) {
        return res.status(400).json(error)
      }
}

const getUserById = async (req, res, next) => {
    try {
        const {id} = req.params
        const user = await User.findById(id).populate("seenMovies")
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error)
    }
}

const register = async (req,res,next) => {
    try {
      const newUser = new User(req.body/* {
        userName:req.body.userName,
        password:req.body.password,
        name:req.body.name,
        lastName:req.body.lastName,
        email:req.body.email,
        image:req.body.image,
      } */) 
      if (req.file ){
        newUser.image = req.file.path
      }

      const duplicatedUser = await User.findOne({
        userName:req.body.userName
      })
      if (duplicatedUser){
        return res.status(400).json("User or password not valid")
      }
      const userSaved = await newUser.save()
      return res.status(201).json(userSaved)
    } catch (error) {
        res.status(400).json(error)  
    }
   
}
const login = async (req, res, next) => {
    try {
      const user = await User.findOne({
        userName:req.body.userName
      })  
      if (!user) {
        return res.status(400).json("User or passsword not found");
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateSign(user._id);
        return res.status(200).json({ user, token });
    } else {
        return res.status(400).json("User or passsword not found");
    }

    } catch (error) {
        console.log(error);
        return res.status(400).json(error);  
    }
}

const updateUser = async (req, res, next) =>{
    try {
      const {id} = req.params;
      if (req.user._id.toString() !== id) {
        return res.status(400).json("You can only modify your profile")
       }
    const oldUser = await User.findById(id);
      const newUser = new User(req.body)
      if(req.file){
        newUser.image = req.file.path;
        const oldUser = await User.findById(id)
        deleteFile(oldUser.image)
      }
      newUser._id=id;
    
      newUser.seenMovies = [...oldUser.seenMovies, ...req.body.seenMovies]
  
      const userUpdated = await User.findByIdAndUpdate(id, newUser,
        {
          new:true
        })
        return res.status(200).json(userUpdated)
  
    } catch (error) {
      return res.status(400).json(error)
    }
  }

  const removeFromSeenMovies = async ( req, res, next ) => {
    try {
       const {id }  = req.params
       const {seenMovies} = req.body
       if (req.user._id.toString() !== id) {
        return res.status(400).json("You only can modify your profile")
    }
    if (!seenMovies) {
        return res.status(400).json("You must insert an right id of the movie");
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json("User not found");
      }
      const updatedseenMoviesList = user.seenMovies.filter(seenMovie=> seenMovie.toString() !== seenMovies.toString());
      const userUpdated = await User.updateOne({_id: id}, {$set:{seenMovies: updatedseenMoviesList}})

      if(userUpdated.matchedCount > 0) {
        return res.status(200).json("Movie removed successfully");
      } else {
      return res.status(400).json("It cannot be removed from seenMovies");
      }
    } catch (error) {
        return res.status(400).json("Error trying to remove the movie"); 
    }
  }

  const deleteUser = async (req, res, next) =>{
    try {
      const { id } = req.params
      const userDeleted = await User.findByIdAndDelete(id)
      deleteFile(userDeleted.image)
      return res.status(200).json(userDeleted)
    } catch (error) {
      return res.status(400).json(error)
    }
  }
  
  
  module.exports = { getUsers, register, login , updateUser, deleteUser, removeFromSeenMovies, getUserById}
