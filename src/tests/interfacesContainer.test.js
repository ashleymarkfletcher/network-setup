import React from 'react';
import renderer from 'react-test-renderer';
import InterfacesContainer from '../components/interfacesContainer';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('Interface renders', () => {

  const mockConfigs = [
    {
      errors: {},
      gateway: "192.168.1.1",
      id: "_8h7ez2224",
      ip: "192.168.1.10",
      primaryDNS: "8.8.8.8",
      secondaryDNS: "8.8.4.4",
      subnet: "255.255.255.0"
    },
    {
      errors: {},
      gateway: "192.168.21.1",
      id: "_8h7ez2244",
      ip: "192.168.21.10",
      primaryDNS: "8.8.8.8",
      secondaryDNS: "8.8.4.4",
      subnet: "255.255.255.0"
    },
    {
      errors: {},
      gateway: "192.168.40.1",
      id: "_8h7ez2232",
      ip: "192.168.40.12",
      primaryDNS: "8.8.8.8",
      secondaryDNS: "8.8.4.4",
      subnet: "255.255.255.0"
    }
  ]

  const configureInterface = () => {}

  const deleteConfig = () => {}

  const save = () => {}

  const dhcp = () => {}

  const tree = shallow(
      <InterfacesContainer
        configureInterface={configureInterface}
        save={save}
        configs={mockConfigs}
        deleteConfig={deleteConfig}
        dhcp={dhcp}
      >
      </InterfacesContainer>
  )

  expect(shallowToJson(tree)).toMatchSnapshot();
})
