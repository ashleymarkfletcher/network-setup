import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class Header extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentInterface: null
    }
  }

  handleChange = (event, index, value) => this.setState({currentInterface: value});

  interfaceItems = this.props.interfaces.map((int) => <MenuItem value={int.name} primaryText={int.name} />)

  render() {
    return (
      <div className='header'>
        <div className='currentInterface'>
          <p>Current Interface: {this.props.activeInterface.name}</p>
        </div>
        <div className='selectInterface'>
          <p>Select Interface:</p>
          <DropDownMenu value={this.state.currentInterface} onChange={this.handleChange} labelStyle={{color:'white'}}>
            {this.interfaceItems}
          </DropDownMenu>
        </div>
      </div>
    )
  }
}
