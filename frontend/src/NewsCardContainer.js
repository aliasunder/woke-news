import React, { Component } from 'react';
import { ObjectID } from 'bson';
import NewsCard from './NewsCard';
import './NewsCardContainer.css';
import AutoResponsive from 'autoresponsive-react';

class NewsCardContainer extends Component {
    
    componentDidMount() {
        this.props.fetchArticles()
    }

    render() { 
        let newsHeadlines = this.props.newsHeadlines;
        let filterOption = this.props.activeFilter;

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
            <div>
              
                    <AutoResponsive ref="container" verticalDirection="top" horizontalDirection="left" containerHeight={ null } gridWidth={ 100 } itemClassName="item" itemMargin={ 10 } containerWidth={ null } prefixClassName="rc-autoresponsive">
                    { 
                         newsHeadlines.length > 0 ? (
                            filteredNews.map((prop)=>{
                                return <NewsCard    key = { new ObjectID() } 
                                                    style={{ width:"400px" }} 
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
                    </AutoResponsive>
               
            </div>
        )
    }
};
 
export default NewsCardContainer;