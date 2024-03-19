/*
 * @Descripttion: 
 * @version: 
 * @Author: zhangxy
 * @email: zhangxy@troy.cn
 * @Date: 2024-03-04 23:58:51
 * @LastEditors: zhangxy
 * @LastEditTime: 2024-03-19 16:53:50
 */
import Create from './create.js';

class GenerateFile {
  constructor(config){
    this.config = config;
    this.create = new Create();
  }
  generateFile(){
    if(this.config.basePath){
      this.create.createFolder(this.config.basePath)
    }
    const str = this.generateTemplate();
    this.create.createFile(this.config.basePath+`/${this.config.filename}.tsx`,str)
  }
}
export default GenerateFile;