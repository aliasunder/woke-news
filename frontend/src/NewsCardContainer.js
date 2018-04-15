import React, { Component } from 'react';
import { ObjectID } from 'bson';
import NewsCard from './NewsCard';
import StackGrid from 'react-stack-grid';
import sizeMe from 'react-sizeme';

class NewsCardContainer extends Component {
    
    componentDidMount() {
        this.props.fetchArticles()
    }

    render() { 
        let newsHeadlines = this.props.newsHeadlines;
        let filterOption = this.props.activeFilter;
        const { width, height } = this.props.size;
    
        let filteredNews = newsHeadlines.filter(article => {
            if (filterOption === 'Positive'){
                return article.sentiment === 'Positive'
            }
            else if (filterOption === 'Negative'){
                return article.sentiment === 'Negative';
            }
            else if (filterOption === 'Liberal'){
                return article.label === 'Liberal';
            }
            else if (filterOption === 'Conservative'){
                return article.label === 'Conservative';
            }
            else if (filterOption === 'Green'){
                return article.label === 'Green';
            }
            else if (filterOption === 'Libertarian'){
                return article.label === 'Libertarian';
            }
            else if (filterOption === 'Claims'){
                return article.label === 'Claims';
            }
            else if (filterOption === 'Fact-Check'){
                return article.label === 'Fact-Check';
            }
            else {
                return newsHeadlines;    
            }
        })
           

        return ( 
                <StackGrid columnWidth= {  width <= 768 ? '90%' : '37%' } gutterWidth={ 15 } gutterHeight={ 15 } >
                    { 
                         newsHeadlines.length > 0 ? (
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
                            )
                      
                        :
                            (null)
    
                    }
                </StackGrid>
        )
    }
};
 
export default sizeMe({ monitorWidth: true })(NewsCardContainer);