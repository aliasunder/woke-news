import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { MainAppContainer } from './MainAppContainer';
import NewsSearch from '../appComponents/NewsSearch';
import NewsFilter from '../appComponents/NewsFilter';
import AppRoutes from './AppRoutes'

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

   const wrapper =  shallow(<MainAppContainer { ...props }/>);

   return { props, wrapper };
};

// setup wrapper
const { wrapper } = setup();

// tests
it('renders without crashing', () => {
  wrapper;
});

it ('renders InfiniteScroll component', () => {
   expect(wrapper.find(InfiniteScroll)).toExist();
})

it ('render NewsSearch component', () => {
   expect(wrapper.find(NewsSearch)).toExist();
})

it ('renders NewsFilter component', () => {
   expect(wrapper.find(NewsFilter)).toExist();
})

it ('renders AppRoutes component', () => {
   expect(wrapper.find(AppRoutes)).toExist();
})