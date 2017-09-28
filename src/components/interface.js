import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SaveIcon from 'material-ui/svg-icons/content/save';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import SendIcon from 'material-ui/svg-icons/content/send';
import Paper from 'material-ui/Paper';

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
      <Paper style={paperStyle} zDepth={1}>
      <div className="interface">
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="IP address"
          name="ip"
          value={this.state.ip}
          onChange={this.handleChange}
          style={inputStyle}
        />
        <TextField
          hintText="255.255.x.x"
          floatingLabelText="Subnet Mask"
          name="subnet"
          value={this.state.subnet}
          onChange={this.handleChange}
          style={inputStyle}
        />
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="Gateway"
          name="gateway"
          value={this.state.gateway}
          onChange={this.handleChange}
          style={inputStyle}
        />
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="Primary DNS"
          name="primaryDNS"
          value={this.state.primaryDNS}
          onChange={this.handleChange}
          style={inputStyle}
        />
        <TextField
          hintText="192.168.x.x"
          floatingLabelText="Secondary DNS"
          name="secondaryDNS"
          value={this.state.secondaryDNS}
          onChange={this.handleChange}
          style={inputStyle}
        />
        <RaisedButton
          icon={<SaveIcon color={'white'} />}
          backgroundColor="#4CAF50"
          onClick={this.save}
          style={buttonStyle}
        />
        <RaisedButton
          icon={<DeleteIcon color={'white'} />}
          backgroundColor="#F44336"
          onClick={this.delete}
          style={buttonStyle}
        />
        <RaisedButton
          label="Configure"
          backgroundColor="#03A9F4"
          labelColor={'white'}
          icon={<SendIcon color={'white'} />}
          onClick={this.handleClick}
          style={buttonStyle}
        />
      </div>
      </Paper>
    )
  }
}

export default Interface;
