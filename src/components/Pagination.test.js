import { shallow, mount } from 'enzyme';

import Pagination from './Pagination'

describe("<Pagination />", () => {  
  it("pagination renders correctly", () => {
    const wrapper = mount(<Pagination totalPages="5" currentPage="2" limit="5"/>);
  })

  it("disable previous and first page option on current page 1", () => {
    const wrapper = mount(<Pagination totalPages="5" currentPage={`1`} limit="5"/>);
  })
})