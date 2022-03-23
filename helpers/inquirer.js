require("colors");
const inquirer = require("inquirer");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Seleccione una opción:",
    choices: [
      {
        value: "1",
        name: "1. Crear tarea",
      },
      {
        value: "2",
        name: "2. Mostrar tareas",
      },
      {
        value: "3",
        name: "3. Mostrar tareas completadas",
      },
      {
        value: "4",
        name: "4. Mostrar tareas pendientes",
      },
      {
        value: "5",
        name: "5. Completar tarea(s)",
      },
      {
        value: "6",
        name: "6. Borrar tarea",
      },
      {
        value: "7",
        name: "7. Salir",
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=============================".green);
  console.log("    Seleccione una opción ");
  console.log("=============================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  const pregunta = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(pregunta);
};

module.exports = {
  inquirerMenu,
  pausa,
};
