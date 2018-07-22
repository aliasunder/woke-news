import React from 'react';
import NewsSearch from './NewsSearch';
import NewsFilter from './NewsFilter';
import AppHeader from './AppHeader';
import AppRoutes from './AppRoutes';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Grid } from 'semantic-ui-react';
import withNewsArticles from './withNewsArticles'

const MainContentDisplay = (props) => {
   const { width, fetchArticles, newsHeadlines, activeFilter, labelsLoading, handleMobileTabChange, handleTabChange, refresh } = props;
   return (
      <InfiniteScroll   pullDownToRefresh = { width <= 768 ? true : null }
                        dataLength={ newsHeadlines.length } 
                        pullDownToRefreshContent={
                           <h3 style={{ textAlign: 'center' }}> Pull down to refresh </h3>
                        }
                        releaseToRefreshContent={
                            <h3 style={{ textAlign: 'center' }}> Release to refresh </h3>
                        }
                        refreshFunction={ ()=> refresh() }
                        next={ () => setTimeout(fetchArticles, 1000) }
                        hasMore={ (activeFilter === "All News" ? true : false) && !labelsLoading } >
         <Container>
            <Grid padded stackable>
               <Grid.Row>
                  <Grid.Column>
                     <AppHeader />
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row>
                  <NewsSearch width = { width } />
               </Grid.Row>
               <NewsFilter width = { width } 
                           handleTabChange = { handleTabChange } 
                           handleMobileTabChange = { handleMobileTabChange }
                           activeFilter = { activeFilter } 
                           />
            </Grid>
            <AppRoutes { ...props } />
         </Container>
      </InfiniteScroll>
   )
}
// the withNewsArticles higher-order component wraps the MainContentDisplay component. 
//withNewsArticles contains the fetchNewsArticles logic and related state which is then passed down to the wrapped component.
export default withNewsArticles(MainContentDisplay);