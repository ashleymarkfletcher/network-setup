// gets network details of PC
var network = require('network')

// gets the active network interface
function getInterfaces() {
  return new Promise(function(resolve, reject) {
    network.get_interfaces_list(function(err, interfaceList) {
      if (err) reject(err)
      else resolve(interfaceList)
    })
  })
}

module.exports = getInterfaces
