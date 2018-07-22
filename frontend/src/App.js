import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import MainContentDisplay from './MainContentDisplay';

class App extends Component {
  state = {
     activeFilter: "All News",
     tabData: {}
    }
  // when filter view is changed, set state with new active filter
  handleTabChange = (data) => {
    let index = data.activeIndex;
    let filterTerm = data.panes[index].menuItem
    this.setState({ 
      tabData: data,
      activeFilter: filterTerm
    })
  };
  // when in mobile view and the filter is changed, set state with new active filter
  handleMobileTabChange = (value) => {
    let filterTerm = value.value
    this.setState({
      activeFilter: filterTerm
    })
  };
 
  render() {
    const { width } = this.props.size;
    return (
      <div className="App">
          <MainContentDisplay refresh = { this.refresh } 
                                  handleMobileTabChange = { this.handleMobileTabChange }
                                  handleTabChange = { this.handleTabChange }
                                  width = { width }/>
      </div> 
    )
  }
};

export default sizeMe({ monitorWidth: true })(App);
