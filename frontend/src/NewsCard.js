import React, { Component } from 'react';
import { Grid, Segment, Card } from 'semantic-ui-react'
import { ObjectID } from 'bson';
import NewsLabels from './NewsLabels';

class NewsCard extends Component {
    
    componentDidMount() {
        this.props.fetchArticles()
    }

    render() { 
        let newsHeadlines = this.props.newsHeadlines;
        let newsHeadlinesJSX;
            if (newsHeadlines.length > 0){
                newsHeadlinesJSX = newsHeadlines.map((prop)=>{
                    return <Grid.Column key = { new ObjectID() }>
                                <Segment text-align="center">
                                    <Card       centered link fluid
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
                <Grid padded columns='two' centered stackable>
                    <Grid.Row>
                    { newsHeadlinesJSX }
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
};
 
export default NewsCard;