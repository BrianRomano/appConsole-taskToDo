require("colors");
const { guardarDB, leerDB } = require("./helpers/abm");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasEliminar,
  mostrarListadoCheck,
  confirmar,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  // LEER TAREAS REGISTRADAS EN DB (data.json)
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // MOSTRAR MENU Y OBTENER OPCION INGRESADA
    opt = await inquirerMenu();

    switch (opt) {
      case "1": // CREAR TAREA
        const descripcion = await leerInput("Descripción: ");
        tareas.crearTarea(descripcion);
        break;
      case "2": // MOSTRAR TAREAS
        tareas.listadoCompleto();
        break;
      case "3": // MOSTRAR TAREAS REALIZADAS
        tareas.mostrarTareasRealizadasPendientes(true);
        break;
      case "4": // MOSTRAR TAREAS PENDIENTES
        tareas.mostrarTareasRealizadasPendientes(false);
        break;
      case "5": // FINALIZAR TAREA(S)
        const ids = await mostrarListadoCheck(tareas.listadoArr);
        tareas.cambiarEstadoTarea(ids);
        break;
      case "6": // BORRAR TAREA
        const id = await listadoTareasEliminar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar(
            "¿Esta seguro que desea eliminar la tarea?"
          );
          if (ok) {
            tareas.eliminarTarea(id);
            console.log("Tarea eliminada");
          }
        }
        break;
    }

    // GUARDAR CAMBIOS EN ARRAY DE TAREAS
    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "7");
};

main();
