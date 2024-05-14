const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    name:{type: String, trim: true, required: true},
    lastName:{type: String, trim: true, required: true},
    email: { type: String, trim: true, required: true, unique: true },
    rol: {
      type: String,
      trim: true,
      required: true,
      enum: ['user'],
      default: 'user'
    },
    image: { type: String, trim: true, required: true },
    seenMovies:[{type: mongoose.Types.ObjectId, ref:"movies", required:false}]
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10);
})

const User = mongoose.model('users', userSchema, 'users')
module.exports = User