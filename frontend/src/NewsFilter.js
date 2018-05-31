import React, { Component } from 'react';
import { Grid, Tab, Dropdown, Menu } from 'semantic-ui-react';

class NewsFilter extends Component {
    render(){
        const { width } = this.props.width;

        const panes = [
          { menuItem: 'All News', render: () => <Tab.Pane as="div"></Tab.Pane> },
          { menuItem: 'Positive', render: () => <Tab.Pane as="div"></Tab.Pane> },
          { menuItem: 'Negative', render: () => <Tab.Pane as="div"></Tab.Pane> },
          { menuItem: 'Liberal', render: () => <Tab.Pane as="div"></Tab.Pane> },
          { menuItem: 'Conservative', render: () => <Tab.Pane as="div"> </Tab.Pane> },
          { menuItem: 'Green', render: () => <Tab.Pane as="div"></Tab.Pane> },
          { menuItem: 'Libertarian', render: () => <Tab.Pane as="div"></Tab.Pane> },
          { menuItem: 'Claims', render: () => <Tab.Pane as="div"></Tab.Pane> },
          { menuItem: 'Fact-Check', render: () => <Tab.Pane as="div"></Tab.Pane> },
        ]
    
        const mobilePanes = [
          { key:'All News', text: 'All News', value: 'All News' },
          { key:'Positive', text: 'Positive', value: 'Positive' },
          { key:'Negative', text: 'Negative', value: 'Negative' },
          { key:'Liberal', text: 'Liberal', value: 'Liberal' },
          { key:'Conservative', text: 'Conservative', value: 'Conservative' },
          { key:'Green', text: 'Green', value: 'Green' },
          { key:'Libertarian', text: 'Libertarian', value: 'Libertarian' },
          { key:'Claims', text: 'Claims', value: 'Claims' },
          { key:'Fact-Check', text: 'Fact-Check', value: 'Fact-Check' }
        ]

        let filtersJSX;

        if (width <= 768 ) { 
            filtersJSX =    <Menu fluid>
                                <Dropdown fluid options={ mobilePanes } onChange={ this.props.handleMobileTabChange } placeholder={ this.props.activeFilter }  value={ this.props.activeFilter } selection/>
                            </Menu>
        }
        else {
            filtersJSX = <Tab menu={{ secondary: true }} panes={ panes } onTabChange={ this.props.handleTabChange }/>     
            }
    
        return (
            <Grid.Row>
              { filtersJSX }
            </Grid.Row>
        )
    }
}

export default NewsFilter;