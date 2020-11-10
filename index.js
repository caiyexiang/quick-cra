#! /usr/bin/env node
const quickCra = require('./quick-cra');

/** 快速创建的模板名称 */ 
const template = process.argv[2];
/** 快速创建的项目名称 */
const projectName = process.argv[3];

const funcMap = {
  cra: quickCra,
};

if (funcMap[template]) {
  funcMap[template](projectName);
} else {
  console.error('不存在对应模板');
}
