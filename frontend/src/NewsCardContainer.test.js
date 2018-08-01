import React from 'react';
import { shallow } from 'enzyme';
import NewsCardContainer from './NewsCardContainer';

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

   return { props, wrapper }
}

it('renders without crashing', () => {
   const { wrapper } = setup();
   expect(wrapper.find('StackGrid')).toExist();
  
});
