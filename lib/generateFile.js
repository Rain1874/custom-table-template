/*
 * @Descripttion: 
 * @version: 
 * @Author: zhangxy
 * @email: zhangxy@troy.cn
 * @Date: 2024-03-04 23:58:51
 * @LastEditors: zhangxy
 * @LastEditTime: 2024-03-19 23:30:41
 */
import Create from './create.js';

class GenerateFile {
  constructor(config){
    this.config = config;
    this.create = new Create();
  }

  generateFile(){
    let basePath = this.config.basePath;
    basePath = `${basePath ? basePath.endsWith('/') ? basePath : basePath + '/' : ''}`;
    if(basePath){
      this.create.createFolder(basePath)
    }
    const str = this.generateTemplate(); 
    this.create.createFile(basePath+`${this.config.filename}.tsx`,str)
  }
}
export default GenerateFile;