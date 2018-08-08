import React from 'react';
import { Tab, Dropdown } from 'semantic-ui-react';
import NewsFilter from './NewsFilter';

const setup = (propOverrides) => {
   // default mock data for testing
   const props = Object.assign({
      width: 1425,
      handleMobileTabChange: jest.fn(),
      handleTabChange: jest.fn(),
      activeFilter: 'All News'
   }, propOverrides);

   const wrapper = shallow(<NewsFilter { ...props }/>);

   return { props, wrapper };
};

it('renders without crashing', () => {
  const { wrapper } = setup();
   wrapper;
   console.log(wrapper.debug())
});

describe('changes to screen width', () => {
   it('renders Tab filter on non-mobile screen', () => {
      const { wrapper } = setup({ width: 1200 });
      expect(wrapper.find(Tab)).toExist();
   })
   it('renders Dropdown filter on mobile screen', () => {
      const { wrapper } = setup({ width: 760 });
      expect(wrapper.find(Dropdown)).toExist();
   })
})

describe('when filter changes, correct handler called', () => {
   it('on non-mobile screen, onTabChange called', () => {
      const { wrapper } = setup();
      wrapper.find(Tab).prop('onTabChange')({});
      expect(wrapper.find(Tab).prop('onTabChange')).toHaveBeenCalled();
   })
   it('on mobile screen, onChange handler called', () => {
      const { wrapper } = setup({ width: 760 });
      wrapper.find(Dropdown).prop('onChange')({});
      expect(wrapper.find(Dropdown).prop('onChange')).toHaveBeenCalled();
   })
})