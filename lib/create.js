import fs from 'fs';
import chalk from 'chalk';
const __dirname = process.cwd();
class Create {
  createFolder(folderName){
    const _folderName = `${__dirname}${folderName.startsWith('/')? '' : '/'}${folderName}${folderName.endsWith('/') ? '' : '/'}`;
    console.log(chalk.blue('folderName:',_folderName))
    if(!fs.existsSync(_folderName)){
      fs.mkdirSync(_folderName,{ recursive: true })
    }
  }
  createFile(filename, str){
    if(fs.existsSync(`${__dirname}/${filename}`)){
      return console.log(chalk.red('文件已存在'))
    }
    const writeFile = `${__dirname}/${filename}`
    console.log(chalk.blue('写入地址:', writeFile));
    fs.writeFile(writeFile, str,(err) => {
      if(err){
        return console.log(chalk.red(err))
      }
      console.log(chalk.green('文件写入成功'))
    })
  }
}
export default Create;