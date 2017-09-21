import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


export default class Header extends Component {

  render() {
    return (
      <div className='header'>
      <AppBar
        title={<span>AMX Setup</span>}
        onRightIconButtonTouchTap={this.props.close}
        iconElementRight={<IconButton className={'close'}><NavigationClose /></IconButton>}
        iconElementLeft={<span></span>}
      />
      </div>
    )
  }
}
