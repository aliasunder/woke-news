import React from 'react';
import { shallow } from 'enzyme';
import { NewsCard } from './NewsCard';

const setup = (propOverrides) => {
   // default mock data for testing
   const props = Object.assign({
      description: 'hello',
      keywords: [{'keyword': 'awesome'}],
      politicalLabels: [ {'label': 'liberal'}],
      image: null,
      title:'best article',
      meta: 'cool name',
      sentiment: 0.456782,
      url: 'www.google.ca',
      loading: false
   }, propOverrides);

   const wrapper = shallow(<NewsCard { ...props } />);

   return { props, wrapper };
};

// setup shallow wrapper
const { wrapper } = setup();

// tests
it('renders without crashing', () => {
  wrapper;
});

it('renders required card components', () => {
   expect(wrapper.find('Card').children()).toHaveLength(3);
});

it('renders required image component', () => {
   expect(wrapper.find('Image')).toExist();
});

it('renders required NewsLabels component', () => {
   expect(wrapper.find('NewsLabels')).toExist();
});