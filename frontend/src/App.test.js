import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import MainContentDisplay from './MainContentDisplay';

// mock data for testing
const mockSize = {
   width: 1425
}

// shallow wrapper
const wrapper = shallow(<App size={ mockSize }/>)

// tests
it('renders without crashing', () => {
  wrapper
});

it ('activeFilter in state and the value is the correct string', () => {
   expect(wrapper).toHaveState('activeFilter', 'All News');
});

it ('passes width down to child components', () => {
   expect(wrapper.find(MainContentDisplay)).toHaveProp('width')
})