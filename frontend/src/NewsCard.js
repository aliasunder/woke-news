import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'
import NewsLabels from './NewsLabels';

class NewsCard extends Component {

    render() { 
        return ( 
                <Card   link centered fluid
                        target="_blank"
                        href={ this.props.url }
                        style={ this.props.style }
                > 
                    <Card.Content> <Image src= { this.props.image } /> </Card.Content>
                    <Card.Content header={ this.props.title } meta={ this.props.meta } description={ this.props.description } />
                    <Card.Content extra>
                        <NewsLabels loading = { this.props.loading} 
                                    label = { this.props.label ? this.props.label : null } 
                                    sentiment = { this.props.sentiment ? this.props.sentiment : null }
                                    keywords = { this.props.keywords ? this.props.keywords : null }
                                    match = { this.props.match }
                                    fetchSearchResults = { this.props.fetchSearchResults }
                            />
                    </Card.Content>
                </Card>
         )
    }
}
 
export default NewsCard;