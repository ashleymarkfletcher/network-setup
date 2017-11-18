const electron = require('electron')
const path = require('path')
const url = require('url')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
const getCurrentInterface = require('./modules/getCurrentInterface');
const getInterfaces = require('./modules/getInterfaces');
const setDHCP = require('./modules/setDHCP')
const setStatic = require('./modules/setStatic')

// runtime storage of configs and settings
let settings = {}
let configs = {}

// set url to build path of create-react-app
const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '../build/index.html'),
  protocol: 'file:',
  slashes: true
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // frame: false,
    width: 1100,
    height: 700,
    title: 'network setup'
  })

  // stores data in userData folder
  settings = require('electron-settings')

  const observer = settings.watch('configs', newValue => {
    console.log('configs are now', settings.getAll())

    // send the configs to the render process
    mainWindow.webContents.send('configs', configs)
  })

  // and load the index.html of the app.
  mainWindow.loadURL(startUrl)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  configs = settings.get('configs')

  if (!configs) {
    console.log('no configs!')
    settings.set('configs', [])
    configs = []
  }

  // send the configs to the renderer
  mainWindow.webContents.send('configs', configs)

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('get-interfaces', (event, arg) => {
  getInterfaces().then((interfaceList) => {
    event.sender.send('interfaces', interfaceList)
  })
  .catch((err) => console.log('error getting interfaces: ', err))
})

ipcMain.on('get-configs', (event) => {
  event.sender.send('configs', configs)
})

ipcMain.on('get-active-interface', (event) => {
  getCurrentInterface()
  .then((activeInterface) => {
    event.sender.send('active-interface', activeInterface)
  })
  .catch((err) => console.log('error getting interface: ', err))
})

ipcMain.on('configure-interface', (event, config) => {
  setStatic(config).then(() => console.log('set to static'))
  .catch((err) => console.log('error setting to static: ', err))
})

ipcMain.on('delete-config', (event, configToDelete) => {
  configs = configs.filter((config) => config.id != configToDelete.id)
  settings.set('configs', configs)
})

ipcMain.on('dhcp', (event, currentInterface) => {
  setDHCP(currentInterface).then(() => console.log('DHCP set'))
  .catch((err) => console.log('error setting DHCP: ', err))
})

ipcMain.on('save-config', (event, configToSave) => {
  // find if the config exists
  const index = configs.findIndex((config) => config.id == configToSave.id)

  // push if not or update
  if (index != -1) {
    configs[index] = configToSave
  } else {
    configs.push(configToSave)
  }

  settings.set('configs', configs)
})
