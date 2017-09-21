import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './components/header'
import DeviceContainer from './components/devices/deviceContainer'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';
const electron = window.require("electron")
const remote = electron.remote
const ipcRenderer = electron.ipcRenderer
const main = remote.require("./main.js")
// console.log('remote', remote.process);
// console.log('ffff',remote.require.resolve('./main'))
// require('electron').remote.require('connection');


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
ipcRenderer.send('get-interfaces', 1);
ipcRenderer.on('interfaces', (event, arg) => {
  // Print 5
  console.log('interfaces!', arg);
  // Invoke method directly on main process
  // main.pong(6);
})

class App extends Component {

  componentDidMount(){

  }

  _close(){
    console.log('close!')
    var window = remote.getCurrentWindow()
    window.close();
  }

  _configureDevice(device){
    console.log('connn', device)
    console.log('main', main)
    main.configureDevice(device)
  }

  render() {
    console.log('main', main)
    console.log('render', ipcRenderer)
    // main.log()

    // main.configureDevice('yep')
    return (
      <MuiThemeProvider>
        <div className="App">
          <Header close={this._close}/>

          <DeviceContainer
            configureDevice={this._configureDevice.bind(this)}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
