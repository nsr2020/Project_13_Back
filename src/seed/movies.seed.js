const mongoose = require('mongoose')
const movies = require("./movies.json");
const Movie = require('../src/api/models/movies.js');

mongoose
.connect(process.env.DB_URL)
.then(async () => {
    const allMovies = await Movie.find()
    if (allMovies.length) {
        await Movie.collection.drop(); 
      }
})
.catch((err) => console.log(`Error deleting data:${err}`))
.then(async () => {
    await Movie.insertMany(JSON.parse(movies))
    console.log("Movies has been added successfully");
})
.catch((err) => console.log(`Error creating data: ${err}`))
	
.finally(() => mongoose.disconnect());