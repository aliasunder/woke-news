import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NewsCardContainer from './NewsCardContainer';
import NewsResults from './NewsResults';

class AppRoutes extends Component {
    render(){
        const { activeFilter, newsHeadlines, labelsLoading, isLoading, results } = this.props.state;
        return (
            <Switch>
                <Route exact path="/" render={(props)=><NewsCardContainer   labelsLoading = { labelsLoading }
                                                                            handleTabChange = { this.props.handleTabChange }
                                                                            handleScroll = { this.props.handleScroll }
                                                                            activeFilter = { activeFilter }
                                                                            fetchArticles = { this.props.fetchArticles }
                                                                            newsHeadlines = { newsHeadlines } 
                                                                            dataLength={ newsHeadlines.length } 
                                                                            refreshFunction={ this.props.refresh }
                                                                            width = { this.props.width }
                                                                            match = { props.match } />}  
                      
                                                            />
                                        
                <Route path="/search/:term" render={(props)=><NewsResults   labelsLoading = { labelsLoading } 
                                                                            activeFilter = { activeFilter }
                                                                            handleTabChange = { this.props.handleTabChange }
                                                                            loading={ isLoading }
                                                                            match = { props.match }
                                                                            results = { results } />}
                                                                    />
            </Switch>
        )
    }
}

export default AppRoutes;