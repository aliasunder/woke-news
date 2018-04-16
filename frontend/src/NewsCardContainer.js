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
        const { width } = this.props.size;
    
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