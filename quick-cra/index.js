#! /usr/bin/env node
const { execSync: RawExecSync } = require("child_process");
const { chdir } = require("process");
const fs = require('fs');
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
  console.time('创建React应用');
  console.log('---- 开始创建 ----');
  // 用cra创建应用
  execSync(`yarn create react-app ${projectPath} --template typescript`);

  // 进入目录
  chdir(`./${projectPath}`);

  // 添加开发依赖
  execSync(
    `yarn add -D commitizen customize-cra cz-conventional-changelog eslint eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks prettier react-app-rewired standard-version`
  );

  // 修改package.json
  const packageJson = readJsonSync(`./package.json`);
  packageJson.config = {
    commitizen: {
      path: "cz-conventional-changelog",
    },
  };
  packageJson.scripts.commit = "./node_modules/.bin/git-cz";
  packageJson.scripts.release = "standard-version";
  writeJsonSync(`./package.json`, packageJson);

  // 复制基础配置文件
  const configFiles = fs.readdirSync(`${__dirname}/configs`);
  for (const filename of configFiles) {
    fs.copyFileSync(`${__dirname}/configs/${filename}`, `./${filename}`);
  }

  // 添加git记录
  execSync(
    `git commit -a -m "Project configuration initialization."`
  );

  console.log("---- 完成创建 ----");
  console.timeEnd("创建React应用");
};
