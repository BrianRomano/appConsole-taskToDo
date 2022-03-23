require("colors");
const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const descripcion = await leerInput("Descripción: ");
        tareas.crearTarea(descripcion);
        break;
      case "2":
        console.log(tareas._listado);
        break;
    }

    await pausa();
  } while (opt !== "7");
};

main();
