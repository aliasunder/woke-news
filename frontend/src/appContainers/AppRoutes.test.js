import React from 'react';
import { shallow } from 'enzyme';
import AppRoutes from './AppRoutes'
import { Route, Switch } from 'react-router-dom';

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
      labelsLoading: false,
      handleMobileTabChange: jest.fn(),
      handleTabChange: jest.fn(),
      refresh: jest.fn()
   }, propOverrides);

   const wrapper =  shallow(<AppRoutes { ...props }/>);

   return { props, wrapper };
};

// setup wrapper
const { wrapper } = setup();

// tests
it('renders without crashing', () => {
   wrapper;
});

it ('renders Switch child component', () => {
   expect(wrapper.find(Switch)).toExist();
});

it ('Switch component renders 2 Route children', () => {
   expect(wrapper.find(Switch).children(Route)).toHaveLength(2);
});