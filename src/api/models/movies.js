const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name:{type:"String", required:true, trim:true},
    image:{type:"String", required:true},
    category:{type:"String", required:true, enum:["Releases","Action", "Kids", "Comedy","Horror"], trim:true},
    trailer:{type:"String", required:true, trim:true},
    stars:{type:"Number",required:false, trim:true},
    platform:{type:"String", required:false, trim:true},
},
{
    timestamps: true,
    collection: 'movies',
})

const Movie = mongoose.model('movies', movieSchema, "movies");

module.exports = Movie;