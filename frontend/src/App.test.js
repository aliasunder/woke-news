import React from 'react';
import { App } from './App';
import MainAppContainer from './AppContent';

// mock data for testing
const mockSize = {
   width: 1425
};

// shallow wrapper
const wrapper = shallow(<App size={ mockSize }/>);

// tests
it('renders without crashing', () => {
  wrapper;
});

it ('activeFilter in state and the value is the correct string', () => {
   expect(wrapper).toHaveState('activeFilter', 'All News');
});

it ('passes width down to child components', () => {
   expect(wrapper.find(MainAppContainer)).toHaveProp('width');
});