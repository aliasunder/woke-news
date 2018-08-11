import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import MainAppContainer from './MainAppContainer';
import PropTypes from 'prop-types';

class App extends Component {
   static propTypes = {
      state: PropTypes.shape({
         activeFilter: PropTypes.string.isRequired
      })
   }

   state = {
      activeFilter: "All News",
   }
   // when filter view is changed, set state with new active filter
   handleTabChange = (event, data) => {
      let index = data.activeIndex;
      let filterTerm = data.panes[index].menuItem
      this.setState({ 
         activeFilter: filterTerm
      })
   };
   // when in mobile view and the filter is changed, set state with new active filter
   handleMobileTabChange = (event, value) => {
      let filterTerm = value.value
      this.setState({
         activeFilter: filterTerm
      })
   };
 
   render() {
      const { width } = this.props.size;
      return (
         <div className="App" role="main">
            <MainAppContainer    handleMobileTabChange = { this.handleMobileTabChange }
                                 handleTabChange = { this.handleTabChange }
                                 width = { width }
                                 activeFilter = { this.state.activeFilter }
                                 />
         </div> 
      )
   }
};
export { App }; // exported for unit testing
export default sizeMe({ monitorWidth: true })(App);
