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

class App extends Component {

  constructor() {
    super()

    this.state = {
      activeInterface: null,
      interfaces: []
    }
  }

  componentDidMount(){
    // initial requests for interfaces
    ipcRenderer.send('get-interfaces');
    ipcRenderer.send('get-active-interface');

    // listeners for returned values from above
    ipcRenderer.on('interfaces', (event, interfaces) => {
      console.log('interfaces!', interfaces);
      this.setState({interfaces: interfaces})
    })

    ipcRenderer.on('active-interface', (event, activeInterface) => {
      console.log('active interface!', activeInterface);
      this.setState({activeInterface: activeInterface})
    })
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
    console.log('state', this.state);
    // main.log()

    // main.configureDevice('yep')
    return (
      <MuiThemeProvider>
        <div className="App">

          {this.state.activeInterface && 
            <Header
            close={this._close}
            activeInterface={this.state.activeInterface}
            interfaces={this.state.interfaces}
            />
          }

          <DeviceContainer
            configureDevice={this._configureDevice.bind(this)}
          />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
