const childProcess = require('child_process');
const path = require('path');

export class ProcessorService {
  compile(angularProject , context, callback) {


    // callback(null,{statusCode : 201 , body : fs.hasOwnProperty("readdirSync") });
    // fs.readdir(path.join(__dirname,"/../node_modules"),(err,directory)=>{
    //   if(err){
    //     callback(null,{statusCode : 201 , body : "ERROR"+JSON.stringify(err) });
    //   }else{
    //     callback(null,{statusCode : 201 , body : "OK"+JSON.stringify(directory) });
    //   }
    // });

    childProcess.exec("node "+path.join(__dirname,"/../node_modules","/@angular/cli/bin/ng")+" --help",
      (error, stdout, stderr) => {
        if (error) {
          callback(null,{statusCode : 201 , body : "ERROR: " + stderr });
        }else{
          callback(null,{statusCode : 201 , body : "OK: " + stdout });
        }
      }
    )

    // this.runCLICommand(path.join(__dirname,"/../node_modules/","/.bin","/ng")+' --help')
    // .then((response)=>{
    //   callback(null,{statusCode : 201 , body : response});
    // })
    // .catch((err)=>{
    //   callback(true,{statusCode : 201 , body : err});
    // })

  }


  runCLICommand(command) {
    return new Promise((resolve, reject) => {
      childProcess.exec(command,
        (error, stdout, stderr) => {
          if (error) {
            reject(stderr)
          }
          resolve(stdout)
        })
    })
  }
}
