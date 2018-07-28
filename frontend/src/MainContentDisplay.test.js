import React from 'react';
import { shallow } from 'enzyme';
import MainContentDisplay from './MainContentDisplay';

it('renders without crashing', () => {
  shallow(<MainContentDisplay />);
});