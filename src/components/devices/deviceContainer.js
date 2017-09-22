import React, { Component } from 'react';
import Device from './device';
import RaisedButton from 'material-ui/RaisedButton';
import PlusIcon from 'material-ui/svg-icons/content/add-box';

export default class DeviceContainer extends Component {

  constructor(){
    super()

    this.state = {
      devices: []
    }
  }

  _devices(devices){
    return devices.map((device, index) => {
      return (
        <Device
          device={device}
          update={this._updateDevice.bind(this)}
          index={index}
          configure={this._configure.bind(this)}
        />
      )
    })
  }

  _addDevice(){
    this.setState({
      devices: [
        ...this.state.devices,
        { ip: '', config:'' }
      ]
    })
  }

  _updateDevice(device, index){
    console.log('update', device, index);
    let devices = Object.assign([], this.state.devices)
    devices[index] = device
    this.setState({devices:devices})
  }

  _configure(deviceIndex){
    console.log('configure', deviceIndex);
    console.log('devicetoconfig', this.state.devices[deviceIndex])
    this.props.configureDevice(this.state.devices[deviceIndex])
  }

  render() {
    console.log('devicSr', this.state);

    let devices = this._devices(this.state.devices)
    console.log('devss', devices);

    return (
      <div className="device-container">
        <div className="device-container-top">
        {
          // <RaisedButton
          //   onClick={this._addDevice.bind(this)}
          //   label="new device"
          //   labelPosition="before"
          //   icon={<PlusIcon />}
          //   style = {{margin: 12}}
          //   secondary = {true}
          // />
        }
        </div>
        <div className="devices-container">
          {devices}
        </div>
      </div>
    )
  }
}
