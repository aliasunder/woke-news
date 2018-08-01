import React from 'react';
import NewsSearch from '../appComponents/NewsSearch';
import NewsFilter from '../appComponents/NewsFilter';
import AppHeader from '../header/AppHeader';
import AppRoutes from './AppRoutes';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Grid } from 'semantic-ui-react';
import withNewsArticles from '../mainNewsPage/withNewsArticles'
import PropTypes from 'prop-types';

const MainAppContainer = (props) => {
   const { width, fetchArticles, newsHeadlines, activeFilter, labelsLoading, handleMobileTabChange, handleTabChange, refresh } = props;

   return (
      <InfiniteScroll   pullDownToRefresh = { width <= 768 ? true : null }
                        dataLength={ newsHeadlines.length } 
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

MainAppContainer.propTypes = {
   width: PropTypes.number.isRequired,
   fetchArticles: PropTypes.func.isRequired,
   newsHeadlines: PropTypes.arrayOf(PropTypes.object).isRequired,
   activeFilter: PropTypes.string.isRequired,
   labelsLoading: PropTypes.bool.isRequired,
   handleMobileTabChange: PropTypes.func.isRequired,
   handleTabChange: PropTypes.func.isRequired,
   refresh: PropTypes.func.isRequired
}

// the withNewsArticles higher-order component wraps the MainAppContainer component. 
//withNewsArticles contains the fetchNewsArticles logic and related state which is then passed down to the wrapped component.
export default withNewsArticles(MainAppContainer);