#! /usr/bin/env node
const { execSync } = require("child_process");
const fs = require('fs');

const projectPath = process.argv[2];

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

const main = () => {
  console.time('创建React应用');
  console.log('---- 开始创建 ----');
  // 用cra创建应用
  execSync(`yarn create react-app ${projectPath} --template typescript`);

  // 添加开发依赖
  execSync(
    `cd ${projectPath} && yarn add -D commitizen customize-cra cz-conventional-changelog eslint eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks prettier react-app-rewired`
  );

  // 修改package.json
  const packageJson = readJsonSync(`${projectPath}/package.json`);
  packageJson.config = {
    commitizen: {
      path: "cz-conventional-changelog",
    },
  };
  packageJson.scripts.commit = "./node_modules/.bin/git-cz";
  writeJsonSync(`${projectPath}/package.json`, packageJson);

  // 复制基础配置文件
  const configFiles = fs.readdirSync(`${__dirname}/configs`);
  for (const filename of configFiles) {
    fs.copyFileSync(`${__dirname}/configs/${filename}`, `./${projectPath}/${filename}`);
  }

  // 添加git记录
  execSync('git add * && git commit -m "Project configuration initialization."');

  console.log("---- 完成创建 ----");
  console.timeEnd("创建React应用");
};

main();
