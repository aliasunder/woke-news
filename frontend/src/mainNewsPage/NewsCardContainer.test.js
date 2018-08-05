import React from 'react';
import { shallow } from 'enzyme';
import NewsCardContainer from './NewsCardContainer';
import StackGrid from 'react-stack-grid';

const setup = (propOverrides) => {
   // default mock data for testing
   const props = Object.assign({
      newsHeadlines: [{  'author': 'foo',
         'description': 'hello',
         'key': 'abcde',
         'keywords': [{'keyword': 'awesome'}],
         'politicalLabels': [ {'label': 'liberal'}],
         'urlToImage': null,
         'title':'best article',
         'source': { 'name': 'cool name'},
         'sentiment': 0.456782,
         'url': 'www.google.ca'
      }],
      fetchArticles: jest.fn(),
      width: 1425,
      activeFilter: 'All News',
      labelsLoading: false
   }, propOverrides);

   const wrapper = shallow(<NewsCardContainer { ...props } />);

   return { props, wrapper };
};

// tests
it('renders without crashing', () => {
   const { wrapper } = setup();
   wrapper;
});

it ('renders required StackGrid component for Pinterest-like layout', () => {
   const { wrapper } = setup();
   expect(wrapper.find(StackGrid)).toExist();
});

it ('component takes up 35% width on non-mobile screens', () =>{
   const { wrapper } = setup();
   expect(wrapper.find(StackGrid)).toHaveProp('columnWidth', '35%');
})

it ('component responsive to change to mobile screen size', () =>{
   const { wrapper } = setup({ width: 375 });
   expect(wrapper.find(StackGrid)).toHaveProp('columnWidth', '90%');
})