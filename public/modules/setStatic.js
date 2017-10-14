const exec = require('./promiseExec');

function setStatic(config) {
  return new Promise((resolve, reject) => {
    exec(`netsh interface ipv4 set address name="${config.interface}" static ${config.ip} ${config.subnet} ${config.gateway}`)
    .then(exec(`netsh interface ipv4 add dns "${config.interface}" address=${config.primaryDNS} index=1`))
    .then(exec(`netsh interface ipv4 add dns "${config.interface}" address=${config.secondaryDNS} index=2`))
    .then(() => resolve())
    .catch((err) => reject(err))
  })
}

module.exports = setStatic
