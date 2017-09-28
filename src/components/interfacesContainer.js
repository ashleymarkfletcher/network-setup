import React, { Component } from 'react';
import Interface from './interface';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add-box';

const buttonStyle = {
  marginLeft: 10
}

class InterfacesContainer extends Component {

  constructor(props) {
    super(props)

    this.state = {
      configs: props.configs || []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({configs: nextProps.configs})
  }

  _mapInterfaces = (configs) => {
    return configs.map((config) => {
      return <Interface config={config} save={this.props.save} deleteConfig={this.props.deleteConfig} configureInterface={this.props.configureInterface} key={config.id}/>
    })
  }

  _newConfig = () => {
    this.setState({ configs: [ ...this.state.configs, {} ] })
  }

  render() {
    const configs = this._mapInterfaces(this.state.configs)

    return (
      <div className="interface-container">
        <RaisedButton style={buttonStyle} icon={<AddIcon color={'#555555'} />} label="New Config" backgroundColor="#FFC107" onClick={this._newConfig}/>
        <RaisedButton style={buttonStyle} label="DHCP" backgroundColor="#607D8B" onClick={this.props.dhcp}/>
        {configs}
      </div>
    )
  }
}

export default InterfacesContainer;
