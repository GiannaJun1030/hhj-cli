const path = require("path");
const ejs = require("ejs");
const fs = require("fs");

// 编译ejs文件
const complie = (templateName, data) => {
  const vueCompPath = `../templates/${templateName}`;
  const vueComp = path.resolve(__dirname, vueCompPath);
  return new Promise((resolve, reject) => {
    ejs.renderFile(vueComp, { data }, {}, function (err, res) {
      if (err) return reject(err);
      else resolve(res);
    });
  });
};

// source/components/category/why
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) return true;
  else {
    const result = createDirSync(path.dirname(pathName));
    fs.mkdirSync(pathName);
    if (result) return true;
  }
};

// 写入文件
const writeToFile = (path, result) => {
  fs.promises.writeFile(path, result);
};

module.exports = {
  complie,
  writeToFile,
  createDirSync,
};
