import React from 'react';
import { shallow } from 'enzyme';
import NewsFilter from './NewsFilter';

it('renders without crashing', () => {
  shallow(<NewsFilter />);
});