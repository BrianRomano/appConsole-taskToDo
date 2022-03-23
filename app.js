require("colors");
const { inquirerMenu, pausa } = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

console.clear();

const main = async () => {
  let opt = "";

  do {
    opt = await inquirerMenu();
    await pausa();
  } while (opt !== "7");
};

main();
