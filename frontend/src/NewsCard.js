import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react'
import NewsLabels from './NewsLabels';
import sizeMe from 'react-sizeme';
import { PocketButton } from 'react-social-sharebuttons';

const NewsCard = (props) => {
    return ( 
        <Card fluid centered> 
            <Card.Content as="a" href={ props.url } target="_blank">
                    <Label style = {{ backgroundColor: 'white' }} attached='top right'><PocketButton /></Label>
                    <Image src = { props.image } />
            </Card.Content>
            <Card.Content as="a" href = { props.url } target="_blank" header = { props.title } meta={ props.meta } description={ props.description } />
            <Card.Content extra>
                <NewsLabels loading = { props.loading} 
                            politicalLabels = { props.politicalLabels ? props.politicalLabels : null } 
                            sentiment = { props.sentiment ? props.sentiment : null }
                            keywords = { props.keywords ? props.keywords : null }
                            match = { props.match }
                            fetchSearchResults = { props.fetchSearchResults } 
                    />
            </Card.Content>
        </Card>
    )
}

export default sizeMe({ monitorHeight: true })(NewsCard);