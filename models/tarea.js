const { v4: uuidv4 } = require("uuid");

class Tarea {
  id = "";
  descripcion = "";
  completadoEn = null;

  constructor(descripcion) {
    this.id = uuidv4(); // UUIDV4 GENERADOR DE ID RANDOM
    this.descripcion = descripcion;
  }
}

module.exports = Tarea;
