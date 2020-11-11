#! /usr/bin/env node
const { execSync: RawExecSync } = require("child_process");
const { chdir } = require("process");
const fs = require("fs");
const execSync = (command) => RawExecSync(command, { stdio: [0, 1, 2] });

/**
 * 读取json
 * @param {string} path 文件路径
 */
const readJsonSync = (path) => {
  const fileContent = fs.readFileSync(path);
  return JSON.parse(fileContent);
};

/**
 * 写入Json
 * @param {string} path 写入的文件路径
 * @param {any} data 写入的data
 */
const writeJsonSync = (path, data) => {
  const fileContent = JSON.stringify(data, undefined, 2);
  fs.writeFileSync(path, fileContent);
};

/**
 * 快速使用cra创建react应用
 *
 * @param {string} projectPath 项目名称
 */
module.exports = function (projectPath) {
  console.time("创建基础node项目");
  console.log("---- 开始创建 ----");
  // 新建项目目录
  execSync(`mkdir ${projectPath}`);
  // 进入新建目录
  chdir(`./${projectPath}`);
  // 初始化git
  execSync("git init");

  // 复制模板package.json
  fs.copyFileSync(`${__dirname}/package-template.json`, "./package.json");
  // 修改package.json中的项目名
  const packageJson = readJsonSync(`./package.json`);
  packageJson.name = projectPath;
  writeJsonSync(`./package.json`, packageJson);
  // 安装依赖
  execSync(`yarn install`);

  // 复制基础配置文件
  const configFiles = fs.readdirSync(`${__dirname}/configs`);
  for (const filename of configFiles) {
    fs.copyFileSync(`${__dirname}/configs/${filename}`, `./${filename}`);
  }

  // 编写入口index.js文件
  fs.writeFileSync("./index.js", "require('./dist');\n");

  // 复制src模板
  execSync("mkdir src");
  fs.copyFileSync(`${__dirname}/src/index.ts`, "./src/index.ts");

  // 添加git记录
  execSync(`git add -A && git commit -m "Project initialization."`);

  console.log("---- 完成创建 ----");
  console.timeEnd("创建基础node项目");
};
