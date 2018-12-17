import React from 'react';
import { FetchArticles } from'./withNewsArticles';
import politicalApi from '../../services/politicalApi';
import sentimentApi from '../../services/sentimentApi';
import keywordsApi from '../../services/keywordsApi';

// use mock modules to test api calls
jest.mock('../../services/newsApi')
jest.mock('../../services/politicalApi');
jest.mock('../../services/sentimentApi');
jest.mock('../../services/keywordsApi');

// setup shallow wrapper
const wrapper = shallow(<FetchArticles />);

// setup instance
const component = wrapper.instance();

// tests
it('renders without crashing', () => {
  wrapper;
});

it ('newsPage in state and the value is the correct default number', () => {
   expect(wrapper).toHaveState('newsPage', 1);
});

describe('passes down props to child components', () => {
   it ('passes down width', () => {
      expect(wrapper.find('div')).toHaveProp('width');
   });
   it ('passes down activeFilter', () => {
      expect(wrapper.find('div')).toHaveProp('activeFilter');
   });
   it ('passes down fetchArticles', () => {
      expect(wrapper.find('div')).toHaveProp('fetchArticles');
   });
   it ('passes down handleTabChange', () => {
      expect(wrapper.find('div')).toHaveProp('handleTabChange');
   });
   it ('passes down handleMobileTabChange', () => {
      expect(wrapper.find('div')).toHaveProp('handleMobileTabChange');
   });
})


it ('calls fetchArticles and updates state correctly ',  () => {
   return component.fetchArticles()
            .then(()=>{
               expect(wrapper).toHaveState('labelsLoading', true);
               expect(wrapper).toHaveState('newsPage', 2);
               expect(wrapper).toHaveState('newsHeadlines',
                  [{ 'author': 'foo',
                     'description': 'hello',
                     'key': 'abcde',
                     'source': { 'name': 'cool name'},
                     'title':'best article',
                     'url': 'www.google.ca',
                     'urlToImage': null
                  }]);
            })
            .then(async ()=>{
               await politicalApi();
               expect(wrapper).toHaveState('labelsLoading', true);
               expect(wrapper).toHaveState('newsPage', 2);
               expect(wrapper).toHaveState('newsHeadlines',
                  [{ 'author': 'foo',
                     'description': 'hello',
                     'key': 'abcde',
                     'politicalLabels': [ {'label': 'liberal'}],
                     'source': { 'name': 'cool name'},
                     'title':'best article',
                     'url': 'www.google.ca',
                     'urlToImage': null
                  }]);
            })
            .then(async ()=>{
               await sentimentApi();
               expect(wrapper).toHaveState('labelsLoading', true);
               expect(wrapper).toHaveState('newsPage', 2);
               expect(wrapper).toHaveState('newsHeadlines',
                  [{ 'author': 'foo',
                     'description': 'hello',
                     'key': 'abcde',
                     'politicalLabels': [ {'label': 'liberal'}],
                     'sentiment': 0.456782,
                     'source': { 'name': 'cool name'},
                     'title':'best article',
                     'url': 'www.google.ca',
                     'urlToImage': null
                  }]);
            })
            .then(async ()=>{
               await keywordsApi();
               expect(wrapper).toHaveState('labelsLoading', false);
               expect(wrapper).toHaveState('newsPage', 2);
               expect(wrapper).toHaveState('newsHeadlines',
                  [{ 'author': 'foo',
                     'description': 'hello',
                     'key': 'abcde',
                     'keywords': [{'keyword': 'awesome'}],
                     'politicalLabels': [ {'label': 'liberal'}],
                     'sentiment': 0.456782,
                     'source': { 'name': 'cool name'},
                     'title':'best article',
                     'url': 'www.google.ca',
                     'urlToImage': null
                  }]);
            })
});
