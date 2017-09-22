import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';


export default class Header extends Component {

  render() {
    return (
      <div className='header'>
        <div className='currentInterface'>
          <p>Current Interface: {this.props.activeInterface.name}</p>
        </div>
        <div className='selectInterface'>
          <p>Select Interface:</p>
        </div>
      </div>
    )
  }
}
