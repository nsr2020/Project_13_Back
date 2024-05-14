const mongoose = require('mongoose');
const Movie = require('../src/api/models/movies');
const fs = require('fs');

mongoose.connect('mongodb+srv://narciso_iptv:Nsr2024@cluster0.fjrk5of.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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
      const movies = JSON.parse(data); // Parsea el JSON a un array de objetos
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
