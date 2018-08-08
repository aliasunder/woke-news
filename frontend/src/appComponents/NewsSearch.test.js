import React from 'react';
import { shallow } from 'enzyme';
import { Search } from 'semantic-ui-react';
import { NewsSearch } from './NewsSearch';

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
      width: 1425,
      fetchSearchResults: jest.fn(),
      openLink: jest.fn(),
      value: ''
   }, propOverrides);

   const wrapper = shallow(<NewsSearch { ...props }/>);

   return { props, wrapper };
}

// tests
it('renders without crashing', () => {
   const { wrapper } = setup();
   wrapper;
});

it ('renders required Search component', () => {
   const { wrapper } = setup();
   expect(wrapper.find(Search)).toExist();
});

describe('correct props passed to Search component', () => {
   const { wrapper } = setup();
   it ('loading prop is present', () => {
      expect(wrapper.find(Search)).toHaveProp('loading');
   });
   it ('onResultSelect prop is present', () => {
      expect(wrapper.find(Search)).toHaveProp('onResultSelect');
   });
   it ('results prop is present', () => {
      expect(wrapper.find(Search)).toHaveProp('results');
   });
   it ('onSearchChange prop is present', () => {
      expect(wrapper.find(Search)).toHaveProp('onSearchChange');
   });
   it ('value prop is present', () => {
      expect(wrapper.find(Search)).toHaveProp('value');
   });
});

describe('style changes based on width', () => {
   it ('renders correct style at regular screen width', () => {
      const { wrapper } = setup();
      expect(wrapper.find(Search)).toHaveStyle('paddingLeft', '5%')
      
   })
   it ('renders correct style at regular screen width', () => {
      const { wrapper } = setup({ width: 767 });
      expect(wrapper.find(Search)).toHaveStyle('paddingLeft', '5%')
      expect(wrapper.find(Search)).toHaveStyle('paddingBottom', '3%')
   })
})




