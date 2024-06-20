const mongoose = require('mongoose');
const Movie = require('../src/api/models/movies');
const fs = require('fs');

mongoose.connect(process.env.DB_URL)
  .then(async () => {
    const allMovies = await Movie.find();
    if (allMovies.length) {
      await Movie.collection.drop(); 
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(() => {
    
    fs.readFile("movies.json", 'utf8', async (err, data) => {
      if (err) {
        console.error('Error al leer el archivo:', err);
        return;
      }
      const movies = JSON.parse(data); 
      try {
        await Movie.insertMany(movies);
        console.log("Movies has been added successfully");
      } catch (err) {
        console.log(`Error creating data: ${err}`);
      } finally {
        mongoose.disconnect();
      }
    });
  });
