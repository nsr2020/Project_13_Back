const cloudinary = require("cloudinary").v2;

const deleteFile = async (url) => {
  try {
    const imgSplited = url.split("/")
   const folderName = imgSplited.at(-2)
   const fileName = imgSplited.at(-1).split(".")[0]

    console.log(imgSplited, folderName, fileName)

    // La función necesita recibir dentro de los paréntesis (nombreCarpeta/nombreArchivo)
    const response = await cloudinary.uploader.destroy(`${folderName}/${fileName}`);

    if (response.result === "ok") {
      console.log("Elemento eliminado");
    } else {
      console.log("Error eliminando el elemento:", response);
    }
  } catch (error) {
    console.error("Error eliminando el archivo:", error);
  }
};

module.exports = { deleteFile };
