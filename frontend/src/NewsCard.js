import React, { Component } from 'react';
import { Grid, Segment, Card } from 'semantic-ui-react'
import { ObjectID } from 'bson';
import NewsLabels from './NewsLabels';
import './NewsCard.css';

const cardStyle = {
    marginBottom: '2%',
    marginTop: '2%',
    flexGrow: '2'
}

const containerStyle = {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex'
}

class NewsCard extends Component {
    
    componentDidMount() {
        this.props.fetchArticles()
    }

    render() { 
        let newsHeadlines = this.props.newsHeadlines;
        let filterOption = this.props.activeFilter;
        let newsHeadlinesJSX;

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
           
            if (newsHeadlines.length > 0){
                newsHeadlinesJSX = filteredNews.map((prop)=>{
                    return <Grid.Column key = { new ObjectID() }>
                                <Segment compact text-align="center" style={cardStyle} className='card--padded'>
                                    <Card       centered link fluid
                                    style={ cardStyle }
                                                target="_blank"
                                                description = { prop.description }
                                                image = { prop.urlToImage }
                                                header = { prop.title }
                                                href = { prop.url }
                                                meta = { prop.source.name }
                                        /> 
                                    <NewsLabels loading = { this.props.labelsLoading } 
                                                label = { prop.label ? prop.label : null } 
                                                sentiment = { prop.sentiment ? prop.sentiment : null }
                                                keywords = { prop.keywords ? prop.keywords : null }
                                                match = { this.props.match }
                                                fetchSearchResults = { this.props.fetchSearchResults }
                                        />
                                </Segment>
                            </Grid.Column>
                });
            }

        return ( 
            <div>
                <Grid padded columns='two' centered stackable verticalAlign="top">
                    <Grid.Row style={ containerStyle }>
                    { newsHeadlinesJSX }
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
};
 
export default NewsCard;