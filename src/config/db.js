const mongoose = require('mongoose');

/* mongoose.connect(process.env.DB_URL)
.then((res) =>console.log("Conectado con éxito a la BBDD 😎"))
.catch(()=>("Algo ha ido mal, no te has podido conectar a la BBDD 😢")) */

const connectDB = async ()=>{
try {
   await mongoose.connect(process.env.DB_URL) 
   console.log("Conectado con éxito a la BBDD 😎")
} catch (error) {
    console.log("Algo ha ido mal, no te has podido conectar a la BBDD 😢");
}}

module.exports = {connectDB};