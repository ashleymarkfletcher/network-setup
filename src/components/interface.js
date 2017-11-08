import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import SendIcon from 'material-ui/svg-icons/content/send';
import Paper from 'material-ui/Paper';
const isIp = require('is-ip');

const paperStyle = {
  margin: 20,
  padding: 20
}

const buttonStyle = {
  marginLeft: 10
}

const inputStyle = {
  marginRight: 10,
  width: 125
}

class Interface extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: props.config.id || null,
      ip: props.config.ip || null,
      subnet: props.config.subnet || null,
      gateway: props.config.gateway || null,
      primaryDNS: props.config.primaryDNS || null,
      secondaryDNS: props.config.secondaryDNS || null,
      errors: {
        id: isIp(props.config.id) ? '' : 'must be a valid IP',
        ip: isIp(props.config.ip) ? '' : 'must be a valid IP',
        subnet: isIp(props.config.subnet) ? '' : 'must be a valid IP',
        gateway: isIp(props.config.gateway) ? '' : 'must be a valid IP',
        primaryDNS: isIp(props.config.primaryDNS) ? '' : 'must be a valid IP',
        secondaryDNS: isIp(props.config.secondaryDNS) ? '' : 'must be a valid IP',
      }
    }
  }

  componentDidMount () {
    // if the component is new, create an ID
    if (this.state.id == null) {
      const id = this.uniqueID()
      console.log('id!', id);
      this.setState({ id: id })
    }
  }

  uniqueID = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.configureInterface(this.state)
  }

  delete = (event) => {
    event.preventDefault();
    this.props.deleteConfig(this.state)
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name
    const errorText = isIp(value) ? '' : 'must be a valid IP'

    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: errorText }
    })
  }

  save = () => {
    this.props.save(this.state)
  }

  render() {
    console.log('state', this.props);

    return (
      <Paper style={paperStyle} zDepth={1}>
      <div className="interface">
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="IP address"
          name="ip"
          value={this.state.ip}
          onChange={this.handleChange}
          errorText={this.state.errors.ip}
          style={inputStyle}
        />
        <TextField
          hintText="255.255.x.x"
          floatingLabelText="Subnet Mask"
          name="subnet"
          value={this.state.subnet}
          onChange={this.handleChange}
          errorText={this.state.errors.subnet}
          style={inputStyle}
        />
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="Gateway"
          name="gateway"
          value={this.state.gateway}
          onChange={this.handleChange}
          errorText={this.state.errors.gateway}
          style={inputStyle}
        />
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="Primary DNS"
          name="primaryDNS"
          value={this.state.primaryDNS}
          onChange={this.handleChange}
          errorText={this.state.errors.primaryDNS}
          style={inputStyle}
        />
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="Secondary DNS"
          name="secondaryDNS"
          value={this.state.secondaryDNS}
          onChange={this.handleChange}
          errorText={this.state.errors.secondaryDNS}
          style={inputStyle}
        />
        <RaisedButton
          icon={<SaveIcon color={'#FFFFFF'} />}
          backgroundColor="#4CAF50"
          onClick={this.save}
          style={buttonStyle}
        />
        <RaisedButton
          icon={<DeleteIcon color={'#FFFFFF'} />}
          backgroundColor="#F44336"
          onClick={this.delete}
          style={buttonStyle}
        />
        <RaisedButton
          label="Configure"
          backgroundColor="#03A9F4"
          labelColor={'#FFFFFF'}
          icon={<SendIcon color={'#FFFFFF'} />}
          onClick={this.handleClick}
          style={buttonStyle}
        />
      </div>
      </Paper>
    )
  }
}

export default Interface;
