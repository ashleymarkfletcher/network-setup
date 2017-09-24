import React, { Component } from 'react';
import Interface from './interface';

class InterfacesContainer extends Component {

  constructor() {
    super()

    this.state = {
    }
  }

  render() {
    return (
      <div className="interface-container">
        <Interface configureInterface={this.props.configureInterface}/>
      </div>
    )
  }
}

export default InterfacesContainer;
