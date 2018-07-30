import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewsCardContainer from './NewsCardContainer';
import NewsResults from './NewsResults';
import PropTypes from 'prop-types';

const AppRoutes = (props) => {
   const { width, fetchArticles, newsHeadlines, activeFilter, labelsLoading, handleMobileTabChange, handleTabChange, refresh } = props;
   return (
      <Switch>
         <Route exact path="/" render={()=><NewsCardContainer  labelsLoading = { labelsLoading }
                                                               handleTabChange = { handleTabChange }
                                                               handleMobileTabChange = { handleMobileTabChange }
                                                               activeFilter = { activeFilter }
                                                               fetchArticles = { fetchArticles }
                                                               newsHeadlines = { newsHeadlines } 
                                                               dataLength={ newsHeadlines.length } 
                                                               refreshFunction={ refresh }
                                                               width = { width } />}  
                      
                                                        />
                                        
         <Route path="/search/:term" render={(props)=><NewsResults match = { props.match }/>} />
      </Switch>
   )
}

export default AppRoutes;

AppRoutes.propTypes = {
   width: PropTypes.number.isRequired,
   fetchArticles: PropTypes.func.isRequired,
   newsHeadlines: PropTypes.arrayOf(PropTypes.object).isRequired,
   activeFilter: PropTypes.string.isRequired,
   labelsLoading: PropTypes.bool.isRequired,
   handleMobileTabChange: PropTypes.func.isRequired,
   handleTabChange: PropTypes.func.isRequired,
   refresh: PropTypes.func.isRequired
}