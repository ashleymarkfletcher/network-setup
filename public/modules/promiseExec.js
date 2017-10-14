const elevator = require('node-windows').elevate

function promiseExec(command) {
  return new Promise((resolve, reject) => {
    elevator(command, { waitForTermination: true },
    (error, stdout, stderr) => {
      if (error) return reject(error)
      else return resolve()
    })
  })
}

module.exports = promiseExec
