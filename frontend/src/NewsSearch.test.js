import React from 'react';
import { shallow } from 'enzyme';
import NewsSearch from './NewsSearch';

it('renders without crashing', () => {
  shallow(<NewsSearch />);
});