import React from 'react';
import { shallow } from 'enzyme';
import NewsCardContainer from './NewsCardContainer';

it('renders without crashing', () => {
   // mock data for testing
   const mockData = [{  'author': 'foo',
      'description': 'hello',
      'key': 'abcde',
      'keywords': [{'keyword': 'awesome'}],
      'politicalLabels': [ {'label': 'liberal'}],
      'urlToImage': null,
      'title':'best article',
      'source': { 'name': 'cool name'},
      'sentiment': 0.456782,
      'url': 'www.google.ca'
   }]
   const mockFetch = () => mockData;
   const mockWidth = 1425;
   const mockActiveFilter = 'All News';
   const mockLabelsLoading = false;

   // shallow wrapper
   const wrapper = shallow(<NewsCardContainer   fetchArticles = { mockFetch } 
                                                newsHeadlines = { mockData }
                                                activeFilter = { mockActiveFilter }
                                                labelsLoading = { mockLabelsLoading }
                                                width = { mockWidth }/>);
   expect(wrapper.find('StackGrid')).toExist();
  
});
