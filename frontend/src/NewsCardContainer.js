import React, { Component } from 'react';
import NewsCard from './NewsCard';
import StackGrid from 'react-stack-grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import _ from 'lodash';

const componentPadding = {
    'padding': '3%'
}

class NewsCardContainer extends Component {

    componentDidMount() {
        this.props.fetchArticles() 
    }

    something = ()=> {
        this.grid.updateLayout();
      }    

    render() { 
        const newsHeadlines = this.props.newsHeadlines;
        const filterOption = this.props.activeFilter;
        const width = this.props.width;
    
        let filteredNews = newsHeadlines.filter(article => {
            if (filterOption === 'Positive'){
                return article.sentiment > 0.5
            }
            else if (filterOption === 'Negative'){
                return article.sentiment < 0.5
            }
            else if (filterOption === 'Liberal'){
                return _.find(article.politicalLabels, { 'label': 'Liberal'});
            }
            else if (filterOption === 'Conservative'){
                return _.find(article.politicalLabels, { 'label': 'Conservative'});
            }
            else if (filterOption === 'Green'){
                return _.find(article.politicalLabels, { 'label': 'Green'});
            }
            else if (filterOption === 'Libertarian'){
                return _.find(article.politicalLabels, { 'label': 'Libertarian'});
            }
            else if (filterOption === 'Claims'){
                return _.find(article.politicalLabels, { 'label': 'Claims'});
            }
            else if (filterOption === 'Fact-Check'){
                return _.find(article.politicalLabels, { 'label': 'Fact-Check'});
            }
            else {
                return newsHeadlines;    
            }
        })

        return (  
            <div> {
                newsHeadlines.length > 0 ? ( 
                    <InfiniteScroll pullDownToRefresh = { width <= 768 ? true : null }
                                    dataLength={ this.props.dataLength } 
                                    pullDownToRefreshContent={
                                        <h3 style={{ textAlign: 'center' }}> Pull down to refresh </h3>
                                    }
                                    releaseToRefreshContent={
                                        <h3 style={{ textAlign: 'center' }}> Release to refresh </h3>
                                    }
                                    refreshFunction={ ()=> this.props.refreshFunction() }
                                    next={ this.props.fetchArticles }
                                    hasMore={ true }
                                    loader={ <h4> Loading... </h4>}
                                    style={ componentPadding }
                                    endMessage={
                                        <p style={{textAlign: 'center'}}>
                                            <b> Yay! You have seen it all</b>
                                        </p>
                                    }>

                        <StackGrid columnWidth= { width <= 768 ? '90%' : '35%' } 
                                    gutterWidth={ 15 } 
                                    gutterHeight={ 15 }  
                                    gridRef={grid => this.grid = grid}
                                    duration={ 0 }
                                    gridRef={grid => this.grid = grid}
                                    >
                            { 
                                filteredNews.map((prop)=>{
                                    return <NewsCard    key = { prop.key} 
                                                        className="item"
                                                        description = { prop.description }
                                                        image = { prop.urlToImage }
                                                        title = { prop.title }
                                                        url = { prop.url }
                                                        meta = { prop.source.name }
                                                        loading = { this.props.labelsLoading } 
                                                        politicalLabels = { prop.politicalLabels ? prop.politicalLabels : null } 
                                                        sentiment = { prop.sentiment ? prop.sentiment : null }
                                                        keywords = { prop.keywords ? prop.keywords : null }
                                                        match = { this.props.match }
                                                        fetchSearchResults = { this.props.fetchSearchResults }
                                                        onSize = { this.something }
                                                    />
         
                    
                                                }, this)
                            }
                        </StackGrid>
                    </InfiniteScroll>
                )

                :

                (null)
        } </div> )
    }
};

export default NewsCardContainer;