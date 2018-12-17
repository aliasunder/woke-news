import React from 'react';
import { NewsLabels } from './NewsLabels';
import { Label, Dimmer, Loader } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const setup = (propOverrides) => {
   // default mock data for testing
   const props = Object.assign({
      politicalLabels: [ {'label': 'liberal', 'key' : jest.fn()}],
      sentiment: 0.456782,
      keywords: [{'keyword': 'awesome', 'key' : jest.fn()}],
   }, propOverrides);

   const wrapper = shallow(<NewsLabels { ...props }/>);

   return { props, wrapper };
};

// tests
it('renders without crashing', () => {
   const { wrapper } = setup();
   wrapper;
});

describe('when loader appears', () => {
   it('renders loader while data is being loaded', () => {
      const { wrapper } = setup({ politicalLabels : [], sentiment: null, keywords: [] });
      expect(wrapper.find(Loader)).toExist();
      expect(wrapper.find(Dimmer)).toExist();
   });
   it('renders labels when data has loaded', () => {
      const { wrapper } = setup();
      expect(wrapper.find(Label)).toExist();
      expect(wrapper.find(NavLink)).toExist();
   });
});

describe('label colours', () => {
   it('renders green when it is a politicalLabel', () => {
      const { wrapper } = setup();
      expect(wrapper.find(Label).first()).toHaveProp('color', 'green');
   });
   it('renders blue when sentiment is above 0.5', () => {
      const { wrapper } = setup({ sentiment: 0.7 });
      expect(wrapper.find(Label).at(1)).toHaveProp('color', 'blue');
   });
   it('renders orange when sentiment is below 0.5', () => {
      const { wrapper } = setup({ sentiment: 0.4 });
      expect(wrapper.find(Label).at(1)).toHaveProp('color', 'orange');
   });
   it('renders black when it is a keyword', () => {
      const { wrapper } = setup();
      expect(wrapper.find(Label).last()).toHaveProp('color', 'black');
   });
});

it('renders label with cirucular set to true for all labels', () => {
   const { wrapper } = setup();
   expect(wrapper.find(Label).filter('[circular=true]')).toHaveLength(3);
});
