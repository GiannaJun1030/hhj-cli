const { program } = require("commander");

const helpOptions = () => {
  program.option("-w --why", "a han cli");
  program.option(
    "-d --dest <path>",
    "a destination folder,例如： -d /src/components"
  );
  program.option("-f --framework <framework>", "you frameword");

  program.on("--help", function () {
    console.log("");
    console.log("Other:");
    console.log("  other help");
  });
};

module.exports = helpOptions;
