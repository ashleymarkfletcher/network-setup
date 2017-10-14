// gets network details of PC
var network = require('network')

// gets the active network interface
function getCurrentInterface() {
  return new Promise(function(resolve, reject) {
    network.get_active_interface(function(err, interfaceObj) {
      if (err) reject(err)
      else resolve(interfaceObj)
    })
  })
}

module.exports = getCurrentInterface
