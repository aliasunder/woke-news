import React from 'react';
import { shallow } from 'enzyme';
import NewsLabels from './NewsLabels';

it('renders without crashing', () => {
  shallow(<NewsLabels />);
});