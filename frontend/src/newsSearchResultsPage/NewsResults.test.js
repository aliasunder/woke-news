import React from 'react';
import { shallow } from 'enzyme';
import NewsResults from './NewsResults';

it('renders without crashing', () => {
  shallow(<NewsResults />);
});