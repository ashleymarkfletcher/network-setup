import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './components/header'
import InterfacesContainer from './components/interfacesContainer'
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
      interfaces: [],
      currentInterface: null,
      configs: null
    }
  }

  componentDidMount() {
    // initial requests for interfaces
    ipcRenderer.send('get-interfaces');
    ipcRenderer.send('get-active-interface');
    ipcRenderer.send('get-configs');

    // listeners for returned values from above
    ipcRenderer.on('interfaces', (event, interfaces) => {
      // console.log('interfaces!', interfaces);
      this.setState({interfaces: interfaces})
    })

    ipcRenderer.on('active-interface', (event, activeInterface) => {
      // console.log('active interface!', activeInterface);
      this.setState({activeInterface: activeInterface})
    })

    ipcRenderer.on('configs', (event, configs) => {
      console.log('configs!', configs);
      this.setState({configs: configs})
    })
  }

  _close() {
    console.log('close!')
    var window = remote.getCurrentWindow()
    window.close();
  }

  _updateInterface = (int) => {
    this.setState({ currentInterface: int })
  }

  _configureInterface = (config) => {
    console.log('config!', config);
    config.interface = this.state.currentInterface
    ipcRenderer.send('configure-interface', config);
  }

  _save = (config) => {
    console.log('saving!', config);
    ipcRenderer.send('save-config', config);
  }

  render() {
    // console.log('main', main)
    // console.log('render', ipcRenderer)
    // console.log('state', this.state)
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
              updateInterface={this._updateInterface}
              currentInterface={this.state.currentInterface}
            />
          }

          {this.state.configs &&
            <InterfacesContainer
              configureInterface={this._configureInterface}
              save={this._save}
              configs={this.state.configs}
            />
          }
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
