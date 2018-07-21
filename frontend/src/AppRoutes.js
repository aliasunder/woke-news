import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewsCardContainer from './NewsCardContainer';
import NewsResults from './NewsResults';

const AppRoutes = (props) => {
    const { width, fetchArticles, newsHeadlines, activeFilter, labelsLoading, handleMobileTabChange, handleTabChange, refresh, match } = props;
    return (
        <Switch>
            <Route exact path="/" render={(props)=><NewsCardContainer   labelsLoading = { labelsLoading }
                                                                        handleTabChange = { handleTabChange }
                                                                        handleMobileTabChange = { handleMobileTabChange }
                                                                        activeFilter = { activeFilter }
                                                                        fetchArticles = { fetchArticles }
                                                                        newsHeadlines = { newsHeadlines } 
                                                                        dataLength={ newsHeadlines.length } 
                                                                        refreshFunction={ refresh }
                                                                        width = { width }
                                                                        match = { match } />}  
                      
                                                        />
                                        
            <Route path="/search/:term" render={(props)=><NewsResults match = { match } />} />
        </Switch>
    )
}

export default AppRoutes;