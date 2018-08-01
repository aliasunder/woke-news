import React from 'react';
import { shallow } from 'enzyme';
import withSearchResults from './withSearchResults';

it('renders without crashing', () => {
  shallow(<withSearchResults />);
});