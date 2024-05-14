

const fs = require("fs")

const ArrayMovies = []

fs.readFile("MoviesCsv.csv", "utf-8", (err,data) =>{
    
    const array = data.split("\r\n")
   const keys =  array[0].split(",")
   

    for (let i = 0; i < keys.length; i++) {
            keys[i] =keys[i].replaceAll(" ", "")
       }    /* keys[i] = keys[i].replaceAll("º","")
            keys[i] = keys[i].replaceAll("ó", "o") */
       
       array.splice(0,1)
       for (const element of array) {
        let arrayValues = element.split(",")
        const object = {}
        for (let i = 0; i < arrayValues.length; i++) {
           
            object[keys[i]] = arrayValues[i]
        }
        ArrayMovies.push(object)
       } 
       fs.writeFile("movies.json", JSON.stringify(ArrayMovies), (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Archivo creado");
        }
    })
    })
   
    fs.writeFile("movies.json", JSON.stringify(ArrayMovies), (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Archivo creado");
        }
    })

