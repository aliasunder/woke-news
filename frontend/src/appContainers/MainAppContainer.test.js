import React from 'react';
import { shallow } from 'enzyme';
import MainAppContainer from './MainAppContainer';

it('renders without crashing', () => {
  shallow(<MainAppContainer />);
});