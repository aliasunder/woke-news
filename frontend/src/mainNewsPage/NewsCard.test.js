import React from 'react';
import { shallow } from 'enzyme';
import NewsCard from './NewsCard';

it('renders without crashing', () => {
  shallow(<NewsCard />);
});