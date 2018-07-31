import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

// mock data for testing
const mockSize = {
   width: 1425
}

// shallow wrapper
const wrapper = shallow(<App size={ mockSize }/>)

it('renders without crashing', () => {
  wrapper
});

it ('activeFilter in state and the value is the correct string', () => {
   expect(wrapper).toHaveState('activeFilter', 'All News');
});