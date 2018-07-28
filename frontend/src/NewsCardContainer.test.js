import React from 'react';
import { shallow } from 'enzyme';
import NewsCardContainer from './NewsCardContainer';

it('renders without crashing', () => {
    const mockData = [{  'author': 'foo',
    'description': 'hello',
    'key': 'abcde',
    'keywords': [{'keyword': 'awesome'}],
    'politicalLabels': [ {'label': 'liberal'}],
    'urlToImage': null,
    'title':'best article',
    'source': { 'name': 'cool name'},
    'sentiment': 0.456782,
    'url': 'www.google.ca'}]

    const mockFetch = () => mockData

    const wrapper = shallow(<NewsCardContainer  fetchArticles = { mockFetch } 
                                                newsHeadlines = { mockData }/>);
    expect(wrapper.find('StackGrid').exists()).toBe(true);
  
});
