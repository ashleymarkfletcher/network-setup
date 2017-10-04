const electron = require('electron');
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain;

// const exec = require('child_process').exec;

// stores data in userData folder
const settings = require('electron-settings');

// // configs will be stored here
let configs = {}

// gets network details of PC
var network = require('network');

// gives elevated privileges to child processes
var elevator = require('node-windows').elevate;

const path = require('path');
const url = require('url');
// set url to build path of create-react-app
const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '../build/index.html'),
  protocol: 'file:',
  slashes: true
})

// gets the active network interface
function getCurrentInterface() {
  return new Promise(function(resolve, reject) {
    network.get_active_interface(function(err, obj) {
      if (err) reject(err)
      else resolve(obj)
    })
  })
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // frame: false,
    width: 800,
    height: 600
  })

  // and load the index.html of the app.
  mainWindow.loadURL(startUrl)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  configs = settings.get('configs')

  // settings.set('configs', [])

  if (!configs) {
    console.log('no configs!');
    settings.set('configs', [])
    configs = []
  }
  mainWindow.webContents.send('configs', configs)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
      createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Listen for async message from renderer process
ipcMain.on('get-interfaces', (event, arg) => {
  // get network interfaces
  network.get_interfaces_list(function(err, list) {
    // Reply on async message from renderer process
    event.sender.send('interfaces', list);
  })
})

ipcMain.on('get-configs', (event) => {
  event.sender.send('configs', configs);
})

ipcMain.on('get-active-interface', (event) => {
  // get network interfaces
  getCurrentInterface()
  .then((activeInterface) => {
    event.sender.send('active-interface', activeInterface);
  }).catch((err) => {console.log('error getting interface: ', err);})

})

ipcMain.on('configure-interface', (event, config) => {
  // get network interfaces
  console.log('config', config);

  // elevate.exec(`netsh interface ipv4 set address name="${config.interface}" static ${config.ip} ${config.subnet} ${config.gateway}`,
  // (error, stdout, stderr) => {
  //   console.log(`stdout: ${stdout}`)
  //   console.log(`stderr: ${stderr}`)
  //   if (error !== null) {
  //       console.log(`exec error: ${error}`)
  //   }
  // })

  // set ip details
  elevator(`netsh interface ipv4 set address name="${config.interface}" static ${config.ip} ${config.subnet} ${config.gateway}`, {
    waitForTermination: true
  }, function(error, stdout, stderr) {
    // if (error) {
    //   throw error;
    // }
    console.log(error);

    console.log(stdout);
    console.log(stderr);
  })

  // set the primaryDNS
  elevator(`netsh interface ipv4 add dns "${config.interface}" address=${config.primaryDNS} index=1`, {
    waitForTermination: true
  }, function(error, stdout, stderr) {
    // if (error) {
    //   throw error;
    // }
    console.log(error);

    console.log(stdout);
    console.log(stderr);
  })


  // set the secondaryDNS
  elevator(`netsh interface ipv4 add dns "${config.interface}" address=${config.secondaryDNS} index=2`, {
    waitForTermination: true
  }, function(error, stdout, stderr) {
    // if (error) {
    //   throw error;
    // }
    console.log(error);

    console.log(stdout);
    console.log(stderr);
  })
})

ipcMain.on('save-config', (event, configToSave) => {
  // get network interfaces
  console.log('saving!', configToSave);
  const index = configs.findIndex((config) => config.id == configToSave.id)

  if (index != -1) {
    configs[index] = configToSave
  } else {
    configs.push(configToSave)
  }

  console.log('configs', configs);

  settings.set('configs', configs)
})

ipcMain.on('delete-config', (event, configToDelete) => {
  // get network interfaces
  console.log('deleting!', configToDelete);
  configs = configs.filter((config) => config.id != configToDelete.id)

  console.log('configs', configs);

  settings.set('configs', configs)
})

ipcMain.on('dhcp', (event, currentInterface) => {
  // get network interfaces
  console.log('setting dhcp: ', currentInterface);
  elevator(`netsh interface ip set address "${currentInterface}" dhcp`, {
    waitForTermination: true
  }, function(error, stdout, stderr) {
    // if (error) {
    //   throw error;
    // }
    console.log(error);
    console.log(stdout);
    console.log(stderr);
  })

  elevator(`netsh interface ip set dns "${currentInterface}" dhcp`, {
    waitForTermination: true
  }, function(error, stdout, stderr) {
    // if (error) {
    //   throw error;
    // }
    console.log(error);
    console.log(stdout);
    console.log(stderr);
  })
})

const observer = settings.watch('configs', newValue => {
  // Do something...
  console.log('new config saved!', newValue);
  console.log('configs now', settings.getAll());
  mainWindow.webContents.send('configs', configs)
});

// // Listen for sync message from renderer process
// ipcMain.on('sync', (event, arg) => {
//     // Print 3
//     console.log(arg);
//     // Send value synchronously back to renderer process
//     event.returnValue = 4;
//     // Send async message to renderer process
//     mainWindow.webContents.send('ping', 5);
// });

// Make method externaly visible
// exports.configureDevice = (device) => {
//   console.log('yeayyyyyyy', device)
// }
