const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  constructor() {
    this._listado = {};
  }

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  cargarTareasFromArray(tareas) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(descripcion = "") {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea;
  }

  eliminarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  listadoCompleto() {
    this.listadoArr.forEach((tarea, index) => {
      const i = `${index + 1}. `.green;
      const { descripcion, completadoEn } = tarea;
      const estado = completadoEn ? "Realizada".green : "Pendiente".red;

      if (completadoEn == null) {
        console.log(i + descripcion + " :: " + estado);
      } else {
        console.log(i + descripcion + " :: " + estado);
      }
    });
  }

  mostrarTareasRealizadasPendientes(realizada = true) {
    let contadorIndice = 0;

    this.listadoArr.forEach((tarea) => {
      const { descripcion, completadoEn } = tarea;
      const estado = completadoEn ? "Realizada".green : "Pendiente".red;

      if (realizada) {
        if (completadoEn) {
          contadorIndice++;
          console.log(
            `${contadorIndice.toString()}. `.green +
              descripcion +
              " :: " +
              completadoEn
          );
        }
      } else if (!completadoEn) {
        contadorIndice++;
        console.log(
          `${contadorIndice.toString()}. `.green + descripcion + " :: " + estado
        );
      }
    });
  }

  cambiarEstadoTarea = (ids) => {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  };
}

module.exports = Tareas;
