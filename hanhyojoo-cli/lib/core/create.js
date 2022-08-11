const { program } = require("commander");
const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
} = require("./action");

const createTemplate = () => {
  program
    .command("create <name> [other...]")
    .description("在git上克隆一个项目到本地,例如 why create <projectname>")
    .action(createProjectAction);

  program
    .command("addcpn <name> [other...]")
    .description("创建一个vue组件文件,例如 why addcpn <filename> -d <filepath>")
    .action(function (name) {
      addComponentAction(name, program.opts().dest);
    });
  program
    .command("addpage <page>")
    .description(
      "add vue page and router config, 例如: why addpage Home [-d src/pages]"
    )
    .action((page) => {
      addPageAndRouteAction(page, program.opts().dest || "src/pages");
    });
};

module.exports = createTemplate;
