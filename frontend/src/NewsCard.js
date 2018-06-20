import React, { Component } from 'react';
import { Card, Image, Segment, Label } from 'semantic-ui-react'
import NewsLabels from './NewsLabels';
import sizeMe from 'react-sizeme';
import { PocketButton } from 'react-social-sharebuttons';

class NewsCard extends Component {

    render() { 
        return ( 
                <Card fluid centered> 
                    <Card.Content as="a" href={ this.props.url } target="_blank">
                            <Label style = {{ backgroundColor: 'white' }} attached='top right'><PocketButton /></Label>
                            <Image src = { this.props.image } />
                    </Card.Content>
                    <Card.Content as="a" href = { this.props.url } target="_blank" header = { this.props.title } meta={ this.props.meta } description={ this.props.description } />
                    <Card.Content extra>
                        <NewsLabels loading = { this.props.loading} 
                                    politicalLabels = { this.props.politicalLabels ? this.props.politicalLabels : null } 
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
 
export default sizeMe({ monitorHeight: true })(NewsCard);