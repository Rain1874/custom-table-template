/*
 * @Descripttion: 
 * @version: 
 * @Author: zhangxy
 * @email: zhangxy@troy.cn
 * @Date: 2024-03-03 00:02:28
 * @LastEditors: zhangxy
 * @LastEditTime: 2024-03-04 23:57:39
 */
import enquirer from 'enquirer';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getTemplateOptions(){
  const OPTIONS = [];
  fs.readdirSync(path.join(__dirname, 'templates')).forEach((template) => {
    const { name } = path.parse(path.join(__dirname, 'templates', template));
    OPTIONS.push(name);
  })
  return OPTIONS;
}
export async function askGenConfig (){
  const result = {};
  const basic = await enquirer.prompt([
    {
      type: 'input',
      name: 'filename',
      message: '请输入生成的文件名',
      initial: 'test'
    },
    {
      type: 'input',
      name: 'basePath',
      message: '请输入生成的文件路径',
      initial: ''
    },
    {
      type: 'select',
      name: 'templateType',
      message: '请输入生成的模板类型',
      initial: '',
      choices: getTemplateOptions(),
    }
  ]);
  Object.assign(result, basic)
  if(basic.templateType === 'tablePage' || basic.templateType === 'tableNoPage'){
      const tableAnswer = await enquirer.prompt([
        {
          type: 'input',
          name: 'buttonKey',
          message: '请输入生成的按钮编码',
          initial: ''
        },
      ]);
      Object.assign(result, tableAnswer)
  }
  return result;
}
export function getPath(basePath, fileName) {
  let url = "";
  if (basePath) url += basePath + "/";
  return url + fileName;
}
export function capitalize(word) {
  if (!word) return '';
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}