import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const headerStyle = {
  paddingLeft: 20,
  paddingTop: 5,
  paddingBottom: 5
}

const dropdownStyle = {
  // height: 20
}

export default class Header extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentInterface: props.currentInterface || props.activeInterface.name
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentInterface: nextProps.currentInterface})
  }

  handleChange = (event, index, value) => this.props.updateInterface(value)

  interfaceItems = this.props.interfaces.map((int) => <MenuItem value={int.name} primaryText={int.name} key={int.name}/>)

  render() {
    return (
      <div className='header' style={headerStyle}>
        <div className='currentInterface'>
          <p>Active Interface: {this.props.activeInterface.name}</p>
        </div>
        <div className='selectInterface'>
          <p>Select Interface:</p>
          <DropDownMenu  style={dropdownStyle} value={this.state.currentInterface} onChange={this.handleChange} labelStyle={{color:'white'}}>
            {this.interfaceItems}
          </DropDownMenu>
        </div>
      </div>
    )
  }
}
