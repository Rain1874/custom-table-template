#!/usr/bin/env node
/*
 * @Descripttion: 
 * @version: 
 * @Author: zhangxy
 * @email: zhangxy@troy.cn
 * @Date: 2024-03-02 23:33:17
 * @LastEditors: zhangxy
 * @LastEditTime: 2024-03-19 15:35:43
 */
import { askGenConfig, getPath } from './utils.js';
import chalk from 'chalk';
async function run(){
  let filename, basePath, templateType;
  try{
    const answers = await askGenConfig();
    filename = answers.filename;
    basePath = getPath(answers.basePath, filename);
    templateType = answers.templateType;

    const GenerateTemplate = await import(
      `./templates/${templateType}.js`
    );
    const genTem= new GenerateTemplate.default(answers);
    genTem.generateFile();
    
  }catch(error){
    console.log(chalk.red(error));
    return 
  }
  

}
run()