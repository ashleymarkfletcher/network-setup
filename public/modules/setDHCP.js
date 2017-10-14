const exec = require('./promiseExec');

function setDHCP(currentInterface) {
  return new Promise((resolve, reject) => {
    exec(`netsh interface ip set address "${currentInterface}" dhcp`)
    .then(exec(`netsh interface ip set dns "${currentInterface}" dhcp`))
    .then(() => resolve())
    .catch((err) => reject(err))
  })
}

module.exports = setDHCP
