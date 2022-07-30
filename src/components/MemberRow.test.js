import { shallow, mount } from 'enzyme';

import MemberRow from './MemberRow'

const row = {
  id: "2",
  name: "Aishwarya Naik",
  email: "aishwarya@mailinator.com",
  role: "member"
}

describe("<MemberRow />", () => {  
  let wrapper;

  it("member row renders correctly", () => {
    wrapper = mount(<MemberRow row={row}/>,{
      attachTo: document.createElement('tbody'),
    });
  })

  it("checkbox is initially unchecked", () => {
    expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe('')
  });

  it ('accepts row props', () => {
    expect(wrapper.props().row).toEqual(row)
  })
});