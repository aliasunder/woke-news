import React from 'react';
import _ from 'lodash';
import { Search } from 'semantic-ui-react';
import withSearchResults from './withSearchResults';
import PropTypes from 'prop-types';

const NewsSearch = (props) => {
   const { width, fetchSearchResults, isLoading, results, value, openLink } = props;
   return (
      <Search     results={ results } 
                  loading={ isLoading } 
                  value={ value } 
                  onResultSelect={ openLink }
                  onSearchChange={ _.debounce((event)=> fetchSearchResults(event.target.value), 500, { leading: true })}
                  style={ width <= 768 ? {paddingLeft: '5%', paddingBottom: '3%' } : { paddingLeft: '5%' }}
         />
   )
}

NewsSearch.propTypes = {
   width: PropTypes.number.isRequired,
   fetchSearchResults: PropTypes.func.isRequired,
   isLoading: PropTypes.bool.isRequired,
}
// withSearchResults wraps the NewsSearch component and passes down the fetchSearchResults function 
// and related props to the wrapped component.
export default withSearchResults(NewsSearch);