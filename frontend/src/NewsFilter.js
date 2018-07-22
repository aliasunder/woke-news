import React from 'react';
import { Grid, Tab, Dropdown } from 'semantic-ui-react';

const NewsFilter = (props) => {
   const { width, handleMobileTabChange, handleTabChange, activeFilter } = props;

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
      filtersJSX = <Dropdown  fluid selection
                              options={ mobilePanes } 
                              onChange={ handleMobileTabChange } 
                              placeholder={ activeFilter }  
                              value={ activeFilter } 
                              style={{ padding: '3%', margin: '0 5% 3% 5%' }}
                           />
                         
   }
   else {
      filtersJSX = <Tab   style={{ padding: '0 5%'}} 
                           menu={{ secondary: true }} 
                           panes={ panes } 
                           onTabChange={ handleTabChange }/>     
   }
    
   return (
      <Grid.Row>
         { filtersJSX }
      </Grid.Row>
   )
}

export default NewsFilter;