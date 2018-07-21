import React, { Component } from 'react';
import sizeMe from 'react-sizeme';
import MainContentDataDisplay from './MainContentDisplay';

class App extends Component {
  constructor(){
    super();
    this.state = {
     activeFilter: "All News",
     tabData: {}
    }
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleMobileTabChange = this.handleMobileTabChange.bind(this);
  }

  handleTabChange(data){
    let index = data.activeIndex;
    let filterTerm = data.panes[index].menuItem
    this.setState({ 
      tabData: data,
      activeFilter: filterTerm
    })
  };

  handleMobileTabChange(value){
    let filterTerm = value.value
    this.setState({
      activeFilter: filterTerm
    })
  };

  render() {
    const { width } = this.props.size;

    return (
      <div className="App">
          <MainContentDataDisplay refresh = { this.refresh } 
                                  handleMobileTabChange = { this.handleMobileTabChange }
                                  handleTabChange = { this.handleTabChange }
                                  width = { width }/>
      </div> 
    )
  }
};

export default sizeMe({ monitorWidth: true })(App);
