const electron = require('electron');
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain;

// gets network details of PC
var network = require('network');

const path = require('path');
const url = require('url');
// set url to build path of create-react-app
const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/../build/index.html'),
  protocol: 'file:',
  slashes: true
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    width: 800,
    height: 600
  })

  // and load the index.html of the app.
  mainWindow.loadURL(startUrl)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // mainWindow.webContents.send('ping', 5)

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
//
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
