import React from 'react';
import renderer from 'react-test-renderer';
import Interface from '../components/interface';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

const configureInterface =  jest.fn()
const deleteConfig = jest.fn()
const save = jest.fn()

let mockConfig = {
  errors: {
    "gateway": "",
     "ip": "",
     "primaryDNS": "",
     "secondaryDNS": "",
     "subnet": ""
   },
  gateway: "192.168.1.1",
  id: "_8h7ez2224",
  ip: "192.168.1.10",
  primaryDNS: "8.8.8.8",
  secondaryDNS: "8.8.4.4",
  subnet: "255.255.255.0"
}

test('Interface renders', () => {

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

test('Interface creates new uid', () => {

  let nullIdConfig = { ...mockConfig }
  nullIdConfig.id = null

  const tree = shallow(
    <Interface
      config={nullIdConfig}
      save={save}
      deleteConfig={deleteConfig}
      configureInterface={configureInterface}
      key={nullIdConfig.id}
    >
    </Interface>
  )

  expect(tree.state().id).not.toBe(null);
})

test('Interface handles click and calls configure with config', () => {

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

  tree.find('[label="Configure"]').simulate('click', { preventDefault: jest.fn()});
  expect(tree.instance().props.configureInterface).toHaveBeenCalledWith(mockConfig)
})

test('Interface handles click delete and sends back the config', () => {

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

  tree.find('[id="delete"]').simulate('click', { preventDefault: jest.fn()});
  expect(tree.instance().props.deleteConfig).toHaveBeenCalledWith(mockConfig)
})

test('Interface handles change and updates the state with the new config', () => {

  let returnConfig = { ...mockConfig }
  returnConfig.ip = "1.1.1.1"

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

  tree.find('[name="ip"]').simulate('change', {target: {value: '1.1.1.1', name: 'ip'} });
  expect(tree.instance().state).toEqual(returnConfig)
})

test('Interface handles click save and calls save prop with config', () => {

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

  tree.find('[id="save"]').simulate('click', { preventDefault: jest.fn()});
  expect(tree.instance().props.save).toHaveBeenCalledWith(mockConfig)
})
