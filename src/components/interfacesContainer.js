import React, { Component } from 'react';
import Interface from './interface';
import RaisedButton from 'material-ui/RaisedButton';

class InterfacesContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      configs: props.configs || []
    }
  }

  _mapInterfaces = (configs) => {
    return configs.map((config) => {
      return <Interface config={config} save={this.props.save} configureInterface={this.props.configureInterface}/>
    })
  }

  _newConfig = () => {
    this.setState({ configs: [ ...this.state.configs, {} ] })
  }

  render() {
    const configs = this._mapInterfaces(this.state.configs)

    return (
      <div className="interface-container">
        <RaisedButton label="New Config" primary={true} onClick={this._newConfig}/>
        {configs}
      </div>
    )
  }
}

export default InterfacesContainer;
