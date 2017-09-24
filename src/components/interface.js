import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Interface extends Component {

  constructor() {
    super()

    this.state = {
      ip: null,
      subnet: null,
      gateway: null,
      primaryDNS: null,
      secondaryDNS: null
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    console.log('The link was clicked.', this.state);
    this.props.configureInterface(this.state)
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name

    this.setState({
      [name]: value
    })
  }

  render() {
    console.log('state', this.state);

    return (
      <div className="interface">
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="IP address"
          name="ip"
          onChange={this.handleChange}
        />
        <TextField
          hintText="255.255.x.x"
          floatingLabelText="Subnet Mask"
          name="subnet"
          onChange={this.handleChange}
        />
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="Gateway"
          name="gateway"
          onChange={this.handleChange}
        />
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="Primary DNS"
          name="primaryDNS"
          onChange={this.handleChange}
        />
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="Secondary DNS"
          name="secondaryDNS"
          onChange={this.handleChange}
        />
        <RaisedButton label="Configure" primary={true} onClick={this.handleClick}/>
      </div>
    )
  }
}

export default Interface;
