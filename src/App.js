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
// const main = remote.require("./electron.js")

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
      this.setState({interfaces: interfaces})
    })

    ipcRenderer.on('active-interface', (event, activeInterface) => {
      this.setState({activeInterface: activeInterface})
    })

    ipcRenderer.on('configs', (event, configs) => {
      this.setState({configs: configs})
    })
  }

  _close() {
    var window = remote.getCurrentWindow()
    window.close();
  }

  _updateInterface = (int) => {
    this.setState({ currentInterface: int })
  }

  _configureInterface = (config) => {
    config.interface = this.state.currentInterface
    ipcRenderer.send('configure-interface', config);
  }

  _save = (config) => {
    ipcRenderer.send('save-config', config);
  }

  _deleteConfig = (config) => {
    ipcRenderer.send('delete-config', config);
  }

  dhcp = () => {
    ipcRenderer.send('dhcp', this.state.currentInterface);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          {this.state.activeInterface && this.state.configs &&
            <Header
              close={this._close}
              activeInterface={this.state.activeInterface}
              interfaces={this.state.interfaces}
              updateInterface={this._updateInterface}
              currentInterface={this.state.currentInterface}
            />
          }

          {this.state.configs && this.state.activeInterface &&
            <InterfacesContainer
              configureInterface={this._configureInterface}
              save={this._save}
              configs={this.state.configs}
              deleteConfig={this._deleteConfig}
              dhcp={this.dhcp}
            />
          }
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
