require("colors");
const { guardarDB, leerDB } = require("./helpers/abm");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasEliminar,
  confirmar,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const descripcion = await leerInput("Descripción: ");
        tareas.crearTarea(descripcion);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.mostrarTareasRealizadasPendientes(true);
        break;
      case "4":
        tareas.mostrarTareasRealizadasPendientes(false);
        break;

      case "6":
        const id = await listadoTareasEliminar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar(
            "¿Esta seguro que desea eliminar la tarea?"
          );
          console.log({ id });
          console.log({ ok });
          if (ok) {
            tareas.eliminarTarea(id);
            console.log("Tarea eliminada");
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "7");
};

main();
