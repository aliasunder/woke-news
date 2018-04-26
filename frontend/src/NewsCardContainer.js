import React, { Component } from 'react';
import { ObjectID } from 'bson';
import NewsCard from './NewsCard';
import StackGrid from 'react-stack-grid';
import sizeMe from 'react-sizeme';
import componentQueries from 'react-component-queries'
import InfiniteScroll from 'react-infinite-scroll-component';
import { fadeDown } from 'react-stack-grid/lib/animations/transitions';

class NewsCardContainer extends Component {
    
    componentDidMount() {
        this.props.fetchArticles()
    }

    render() { 
        let newsHeadlines = this.props.newsHeadlines;
        let filterOption = this.props.activeFilter;
        console.log(this.props.breakpoint);
    
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
           

        return (  newsHeadlines.length > 0 ? ( 
                        <InfiniteScroll    pullDownToRefresh 
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
                                            scrollableTarget={ document.body }
                                            endMessage={
                                                <p style={{textAlign: 'center'}}>
                                                    <b> Yay! You have seen it all</b>
                                                </p>
                                            }>
                            <StackGrid columnWidth= {  this.props.breakpoint} 
                                        gutterWidth={ 15 } 
                                        gutterHeight={ 15 }  
                                        duration={ 0 }>
                                { 
                                    filteredNews.map((prop)=>{
                                        return <NewsCard    key = { new ObjectID() } 
                                                            className="item"
                                                            description = { prop.description }
                                                            image = { prop.urlToImage }
                                                            title = { prop.title }
                                                            url = { prop.url }
                                                            meta = { prop.source.name }
                                                            loading = { this.props.labelsLoading } 
                                                            label = { prop.label ? prop.label : null } 
                                                            sentiment = { prop.sentiment ? prop.sentiment : null }
                                                            keywords = { prop.keywords ? prop.keywords : null }
                                                            match = { this.props.match }
                                                            fetchSearchResults = { this.props.fetchSearchResults }
                                                    />
         
                    
                                                }, this)
    
                                }
                            </StackGrid>
                        </InfiniteScroll>)

                    :

                    (null)
                )
    }
};
 
export default componentQueries(
    // Provide as many query functions as you need.
    ({ width }) => {
      if (width <= 768) return { breakpoint: '90%' };
      return { breakpoint: '35%' };
    }
  )(NewsCardContainer);