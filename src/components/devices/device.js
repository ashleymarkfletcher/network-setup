import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import Divider from 'material-ui/Divider';

export default class DeviceContainer extends Component {

  _updateIP(event){
    this.props.update({
      ip: event.target.value,
      config: this.props.device.config
    },
    this.props.index
    )
  }

  _updateConfig(event){
    this.props.update({
      ip: this.props.device.ip,
      config: event.target.value
    },
    this.props.index
    )
  }

  render() {

    return (
      <div className="device">
        <TextField
          floatingLabelText="IP Address"
          hintText="xxx.xxx.xxx.xxx"
          type="text"
          name="ip"
          value={this.props.device.ip}
          onChange={this._updateIP.bind(this)}
        />
        <br/>
        <TextField
          floatingLabelText="JSON Config"
          hintText={`{ip:xxx.xxx.xxx.xxx host:xxx.xxx.xxx.xxx }`}
          type="text"
          name="config"
          multiLine={true}
          value={this.props.device.config}
          onChange={this._updateConfig.bind(this)}
        />
        <br/>
        <RaisedButton
          onClick={this.props.configure.bind(this, this.props.index)}
          label="Configure Device"
          labelPosition="before"
          icon={<UploadIcon />}
          style={{margin:12}}
          primary = {true}
        />
        <Divider/>
      </div>
    )
  }
}
