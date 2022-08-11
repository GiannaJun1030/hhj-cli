const { promisify } = require("util");
const open = require("open");
const path = require("path");
const download = promisify(require("download-git-repo"));

const { vueRepo } = require("../config/repo-config");
const { commandSpawn } = require("../../utils/terminal");
const { complie, writeToFile, createDirSync } = require("../../utils/utils");

// 创建项目
const createProjectAction = async (name, other) => {
  // 1.clone项目
  await download(vueRepo, name, { clone: true });

  // 2.执行npm install
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  await commandSpawn(command, ["install"], { cwd: `./${name}` });

  // 3.运行npm run serve
  commandSpawn(command, ["run", "serve"], { cwd: `./${name}` });

  // 4.打开浏览器
  open("http://localhost:8080/");
};

// 创建一个vue组件
const addComponentAction = async (name, dest) => {
  // 编译ejs模板
  const file = await complie("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });
  const writePath = path.resolve(dest, `${name}.vue`);
  writeToFile(writePath, file);
};

// 添加page
const addPageAndRouteAction = async (name, dest) => {
  // 1.编译ejs模板
  const data = { name, lowerName: name.toLowerCase() };
  const pageResult = await complie("vue-component.ejs", data);
  const routeResult = await complie("vue-router.ejs", data);

  // 3.写入文件
  const targetDest = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetDest)) {
    const targetPagePath = path.resolve(targetDest, `${name}.vue`);
    const targetRoutePath = path.resolve(targetDest, "router.js");
    writeToFile(targetPagePath, pageResult);
    writeToFile(targetRoutePath, routeResult);
  }
};

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
};
