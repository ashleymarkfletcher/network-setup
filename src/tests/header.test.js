import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../components/header';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

const mockActiveInterface = {
  gateway_ip: "192.168.20.1",
  ip_address: "192.168.20.106",
  mac_address: "34:13:E8:29:47:B2",
  model: "Intel(R) Dual Band Wireless-AC 7265",
  name: "Wi-Fi",
  netmask: "255.255.255.0",
  type: "Wireless",
  vendor: "Intel Corporation"
}

const mockCurrentInterface = {
  gateway_ip: "192.168.20.1",
  ip_address: "192.168.20.106",
  mac_address: "34:13:E8:29:47:B2",
  model: "Intel(R) Dual Band Wireless-AC 7265",
  name: "Wi-Fi",
  netmask: "255.255.255.0",
  type: "Wireless",
  vendor: "Intel Corporation"
}

const mockInterfaces = [
  {
    gateway_ip: "192.168.20.1",
    ip_address: "192.168.20.106",
    mac_address: "34:13:E8:29:47:B2",
    model: "Intel(R) Dual Band Wireless-AC 7265",
    name: "Wi-Fi",
    netmask: "255.255.255.0",
    type: "Wireless",
    vendor: "Intel Corporation"
  },
  {
    gateway_ip: null,
    mac_address: "B8:AE:ED:75:14:22",
    model: "Intel(R) Ethernet Connection (3) I218-V",
    name: "Ethernet",
    type: "Wired",
    vendor: "Intel Corporation"
  }
]

const close = jest.fn()

const updateInterface = jest.fn()

test('Header renders', () => {

  const tree = shallow(
    <Header
      close={close}
      activeInterface={mockActiveInterface}
      interfaces={mockInterfaces}
      updateInterface={updateInterface}
      currentInterface={mockCurrentInterface}
    >
    </Header>
  )

  expect(shallowToJson(tree)).toMatchSnapshot();
})

test('Header dropdown handles change and passes event value', () => {

  const tree = shallow(
    <Header
      close={close}
      activeInterface={mockActiveInterface}
      interfaces={mockInterfaces}
      updateInterface={updateInterface}
      currentInterface={mockCurrentInterface}
    >
    </Header>
  )

  tree.find('[id="activeDropdown"]').simulate('change', null, null, 'test');
  expect(tree.instance().props.updateInterface).toHaveBeenCalledWith('test')
})

test('Header sets currentInterface state on componentWillReceiveProps', () => {

  const tree = shallow(
    <Header
      close={close}
      activeInterface={mockActiveInterface}
      interfaces={mockInterfaces}
      updateInterface={updateInterface}
      currentInterface={mockCurrentInterface}
    >
    </Header>
  )

  tree.setProps({ currentInterface: 'test' })
  expect(tree.instance().state.currentInterface).toEqual('test')
})
