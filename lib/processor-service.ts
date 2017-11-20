const childProcess = require('child_process')

module.exports = class ProcessorService {
  async compile(angularProject) {

    // Run the Angular build command from the npm module.
    try {
      var stdout = await this.runCLICommand('node node_modules/.bin/ng --help')
      return {
        statusCode: 201,
        body: stdout
      }
    } catch(error) {
      return {
        statusCode: 500,
        body: error
      }
    }
  }

  // Run any arbitrary CLI command.
  runCLICommand(command) {
    return new Promise(async (resolve, reject) => {
      await childProcess.exec(command,
        (error, stdout, stderr) => {
          if (error) {
            reject(stderr)
          }
          resolve(stdout)
        })
    })
  }
}
