import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// mocks for electron dependancies
const { ipcRenderer, ipcMain } = require('electron-ipc-mock')();

configure({ adapter: new Adapter() })

global.window.require = function () {
  return { ipcRenderer, ipcMain }
}
