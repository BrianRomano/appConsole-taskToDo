// FILESYSTEM
const fs = require("fs");

// PATH DE DB
const archivo = "./db/data.json";

// GUARDAR DATOS EN JSON
const guardarDB = (data) => {
  fs.writeFileSync(archivo, JSON.stringify(data));
};

// LEER LOS DATOS JSON
const leerDB = () => {
  if (!fs.existsSync(archivo)) {
    return null;
  }

  const info = fs.readFileSync(archivo, { encoding: "utf-8" });
  const data = JSON.parse(info);

  return data;
};

module.exports = {
  guardarDB,
  leerDB,
};
