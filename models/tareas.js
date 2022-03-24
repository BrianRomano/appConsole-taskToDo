const Tarea = require("./tarea");

class Tareas {
  // LISTADO DE TAREAS - OBJETOS
  _listado = {};

  constructor() {
    this._listado = {};
  }

  // OBTENER LISTADO DE TAREAS - ARRAY
  get listadoArr() {
    const listado = [];

    // LISTADO DE TAREAS - ARRAY
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  // CARGAR ARCHIVO JSON
  cargarTareasFromArray(tareas) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  // CREAR TAREA Y GUARDAR ID PARA CADA TAREA EN EL LISTADO
  crearTarea(descripcion = "") {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea;
  }

  // ELIMINAR TAREA SI ES QUE EXISTE
  eliminarTarea(id) {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  // MOSTRAR LISTADO COMPLETO Y SU ESTADO
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

  // MOSTRAR TAREAS REALIZADAS Y PENDIENTES
  mostrarTareasRealizadasPendientes(realizada) {
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

  // CAMBIAR EL ESTADO DE LA TAREA
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
