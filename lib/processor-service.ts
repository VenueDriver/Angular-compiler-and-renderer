const childProcess = require('child_process');


export class ProcessorService {
  compile(angularProject , context, callback) {

    this.runCLICommand('node ../node_modules/.bin/ng --help')
    .then((response)=>{
      callback(null,{statusCode : 201 , body : response});
    })
    .catch((err)=>{
      callback(true,{statusCode : 500 , body : err});
    })

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
