import React from 'react';
import { shallow } from 'enzyme';
import withNewsArticles from './withNewsArticles';

it('renders without crashing', () => {
  shallow(<withNewsArticles />);
});