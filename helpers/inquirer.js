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
        name: `${"1.".blue} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".blue} Mostrar tareas`,
      },
      {
        value: "3",
        name: `${"3.".blue} Mostrar tareas realizadas`,
      },
      {
        value: "4",
        name: `${"4.".blue} Mostrar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".blue} Finalizar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".blue} Borrar tarea`,
      },
      {
        value: "7",
        name: `${"7.".blue} Salir`,
      },
    ],
  },
];

// MOSTRAR MENU Y OBTENER OPCION ELEGIDA
const inquirerMenu = async () => {
  console.clear();
  console.log("=============================".blue);
  console.log("    Seleccione una opción ");
  console.log("=============================\n".blue);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

// PAUSAR EJECUCION
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

// OBTENER DESCRIPCION DE 'CREAR TAREA'
const leerInput = async (message) => {
  const pregunta = [
    {
      type: "input",
      name: "descripcion",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese una descripción";
        }
        return true;
      },
    },
  ];

  const { descripcion } = await inquirer.prompt(pregunta);
  return descripcion;
};

// MOSTRAR TAREAS Y OBTENER ID DE TAREAS A ELIMINAR
const listadoTareasEliminar = async (tareas) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.descripcion}`,
    };
  });

  // OPCION PARA CANCELAR
  choices.unshift({
    value: "0",
    name: `${"0. ".green}Salir`,
  });

  const pregunta = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(pregunta);
  return id;
};

// CAMBIAR EL ESTADO DE LA TAREA
const mostrarListadoCheck = async (tareas) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.descripcion}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

// MENSAJE DE CONFIRMACION
const confirmar = async (message) => {
  const pregunta = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(pregunta);
  return ok;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasEliminar,
  mostrarListadoCheck,
  confirmar,
};
