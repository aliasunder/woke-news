import React from 'react';
import { shallow } from 'enzyme';
import AppHeader from './AppHeader';

it('renders without crashing', () => {
  shallow(<AppHeader />);
});