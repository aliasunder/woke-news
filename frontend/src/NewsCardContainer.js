import React, { Component } from 'react';
import { ObjectID } from 'bson';
import NewsCard from './NewsCard';
import StackGrid from 'react-stack-grid';
import componentQueries from 'react-component-queries'
import { fadeDown } from 'react-stack-grid/lib/animations/transitions';
import Waypoint from 'react-waypoint';

class NewsCardContainer extends Component {
    
    componentDidMount() {
        this.props.fetchArticles() 
    }

     componentDidUpdate(prevProps, prevState) {
         if (this.props.newsHeadlines.length > prevProps.newsHeadlines.length) {
            //  let updatedScrollTop = lastScrollTop
            //  this.setState({
            //      lastScrollTop: updatedScrollTop
            //  })
         }
     }

    render() { 
        const newsHeadlines = this.props.newsHeadlines;
        const filterOption = this.props.activeFilter;
        const refreshTrue = true;
    
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
                            <StackGrid columnWidth= {  this.props.width <= 768 ? '90%' : '35%' } 
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
                      )

                    :

                    (null)
                             } 
                <Waypoint
                    onLeave={this.props.fetchArticles}
                        />
                          </div> )
    }
};

export default NewsCardContainer;