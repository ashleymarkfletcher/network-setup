import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Interface extends Component {

  constructor(props) {
    super(props)

    this.state = {
      id: props.config.id || null,
      ip: props.config.ip || null,
      subnet: props.config.subnet || null,
      gateway: props.config.gateway || null,
      primaryDNS: props.config.primaryDNS || null,
      secondaryDNS: props.config.secondaryDNS || null
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

    this.setState({
      [name]: value
    })
  }

  save = () => {
    this.props.save(this.state)
  }

  render() {
    // console.log('state', this.state);

    return (
      <div className="interface">
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="IP address"
          name="ip"
          value={this.state.ip}
          onChange={this.handleChange}
        />
        <TextField
          hintText="255.255.x.x"
          floatingLabelText="Subnet Mask"
          name="subnet"
          value={this.state.subnet}
          onChange={this.handleChange}
        />
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="Gateway"
          name="gateway"
          value={this.state.gateway}
          onChange={this.handleChange}
        />
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="Primary DNS"
          name="primaryDNS"
          value={this.state.primaryDNS}
          onChange={this.handleChange}
        />
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="Secondary DNS"
          name="secondaryDNS"
          value={this.state.secondaryDNS}
          onChange={this.handleChange}
        />
        <RaisedButton label="Save Config" backgroundColor="#4CAF50" onClick={this.save}/>
        <RaisedButton label="Delete" backgroundColor="#F44336" onClick={this.delete}/>
        <RaisedButton label="Configure" backgroundColor="#03A9F4" onClick={this.handleClick}/>
      </div>
    )
  }
}

export default Interface;
