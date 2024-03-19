import fs from 'fs';
import chalk from 'chalk';
import { __dirname } from './utils.js';

class Create {
  createFolder(folderName){
    const _folderName = `${folderName.startsWith('/')? __dirname : '/'}${folderName}${folderName.endsWith('/') ? '' : '/'}`;
    if(!fs.existsSync(_folderName)){
      fs.mkdirSync(_folderName,(e) => {
        if(e){
          console.log(chalk.red('目录创建失败',e))
        }
      })
    }
  }
  createFile(filename, str){
    if(fs.existsSync(`${__dirname}/${filename}`)){
      return console.log(chalk.red('文件已存在'))
    }
    console.log('写入地址', `${__dirname}/${filename}`);
    fs.writeFile(`${__dirname}/${filename}`, str,(err) => {
      if(err){
        return console.log(chalk.red(err))
      }
      console.log(chalk.green('文件写入成功'))
    })
  }
}
export default Create;