import React, { Component } from 'react';
import NewsCard from './NewsCard';
import StackGrid from 'react-stack-grid';
import InfiniteScroll from 'react-infinite-scroll-component';

class NewsCardContainer extends Component {

    componentDidMount() {
        this.props.fetchArticles() 
    }

    render() { 
        const newsHeadlines = this.props.newsHeadlines;
        const filterOption = this.props.activeFilter;
        const width = this.props.width;
    
        let filteredNews = newsHeadlines.filter(article => {
            if (article.sentiment && filterOption === 'Positive'){
                return article.sentiment > 0.5
            }
            else if (article.sentiment && filterOption === 'Negative'){
                return article.sentiment < 0.5
            }
            else if (article.label && filterOption === 'Liberal'){
                return article.label.includes('Liberal')
            }
            else if (article.label && filterOption === 'Conservative'){
                return article.label.includes('Conservative')
            }
            else if (article.label && filterOption === 'Green'){
                return article.label.includes('Green')
            }
            else if (article.label && filterOption === 'Libertarian'){
                return article.label.includes('Libertarian')
            }
            else if (article.label && filterOption === 'Claims'){
                return article.label.includes('Claims')
            }
            else if (article.label && filterOption === 'Fact-Check'){
                return article.label.includes('Fact-Check')
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