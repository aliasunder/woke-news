import React from 'react';
import { shallow } from 'enzyme';
import { SearchResults } from './withSearchResults';

// use mock modules to test api calls
jest.mock('../services/hoaxyApi');
const uniqid = jest.genMockFromModule('uniqid');
uniqid.uniqid = jest.fn(()=> '123abc')

// use fake setTimeout instead of real setTimeout
jest.useFakeTimers()

// setup shallow wrapper
const wrapper = shallow(<SearchResults />);

// setup instance
const component = wrapper.instance();

// tests
it('renders without crashing', () => {
  wrapper;
});

describe('passes down props to child components', () => {
   it ('passes down width', () => {
      expect(wrapper.find('div')).toHaveProp('width');
   });
   it ('passes down resetComponent', () => {
      expect(wrapper.find('div')).toHaveProp('resetComponent');
   });
   it ('passes down openLink', () => {
      expect(wrapper.find('div')).toHaveProp('openLink');
   });
   it ('passes down match', () => {
      expect(wrapper.find('div')).toHaveProp('match');
   });
   it ('passes down fetchSearchResults', () => {
      expect(wrapper.find('div')).toHaveProp('fetchSearchResults');
   });
});

it('calls fetchSearchResults and updates state correctly', () => {
   return component.fetchSearchResults('hello' )
      .then(() => {
         expect(wrapper).toHaveState('isLoading', true);
         expect(wrapper).toHaveState('value', 'hello');
      })
      .then(() => {
         jest.runAllTimers()
         expect(setTimeout).toHaveBeenCalledTimes(1);
         expect(wrapper).toHaveState('isLoading', false);
         expect(wrapper).toHaveState('value', 'hello');
      })
})