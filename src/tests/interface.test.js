import React from 'react';
import renderer from 'react-test-renderer';
import Interface from '../components/interface';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

test('Interface renders', () => {

  const mockConfig = {
    errors: {},
    gateway: "192.168.1.1",
    id: "_8h7ez2224",
    ip: "192.168.1.10",
    primaryDNS: "8.8.8.8",
    secondaryDNS: "8.8.4.4",
    subnet: "255.255.255.0"
  }

  const configureInterface = () => {}

  const deleteConfig = () => {}

  const save = () => {}

  const tree = shallow(
    <Interface
      config={mockConfig}
      save={save}
      deleteConfig={deleteConfig}
      configureInterface={configureInterface}
      key={mockConfig.id}
    >
    </Interface>
  )

  expect(shallowToJson(tree)).toMatchSnapshot();
})
