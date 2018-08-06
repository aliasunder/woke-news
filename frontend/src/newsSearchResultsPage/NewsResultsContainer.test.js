import React from 'react';
import { Loader, Grid, Card } from 'semantic-ui-react';
import { NewsResultsContainer } from './NewsResultsContainer';


const setup = (propOverrides) => {
   // default mock data for testing
   const props = Object.assign({
      results: [{
         'url': 'https://www.google.com',
         'site_type': 'claim',
         'title':'best article',
         'key': 'abcde',
         'description' : 'article about stuff'
      }, 
      {
         'url': 'https://www.google.ca',
         'site_type': 'fact_checking',
         'title':'best article',
         'key': 'abcde123',
         'description' : 'article about stuff'
      }],
      isLoading: false,
      match : { 'params' : { 'term' : 'political' } },
      fetchSearchResults: jest.fn(),
   }, propOverrides);

   const wrapper = shallow(<NewsResultsContainer { ...props }/>);

   return { props, wrapper };
}

// tests
it('renders without crashing', () => {
   const { wrapper } = setup();
   wrapper;
  console.log(wrapper.debug())
});

it ('renders loadingJSX when isLoading is set to true', () => {
   const { wrapper } = setup({ isLoading: true });
   expect(wrapper.find(Loader)).toExist();
});

it ('renders results JSX when isLoading is set to false', () => {
   const { wrapper } = setup({ isLoading: false });
   expect(wrapper.find(Grid.Column)).toHaveLength(3);
   expect(wrapper.find(Card)).toExist();
});

describe('Fact-Check and Claim articles', () => {
   const { wrapper } = setup();

   it('renders Fact-Check article in correct column', () => {
      expect(wrapper.find(Card).first()).toHaveProp('description', 'Fact-Check')
   });
   
   it('renders Claim article in correct column', () => {
      expect(wrapper.find(Card).last()).toHaveProp('description', 'Claim')
   });
});
