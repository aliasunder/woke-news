import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import NewsLabels from './NewsLabels';

const cardStyle = {
    marginBottom: '2%',
    marginTop: '2%',
    flexGrow: '2'
}

class NewsCard extends Component {

    render() { 
        return ( 
            <div>
                <Card   centered link fluid
                        style={ cardStyle }
                        target="_blank"
                        description = { this.props.description }
                        image = { this.props.image}
                        header = { this.props.title}
                        href = { this.props.url }
                        meta = { this.props.meta}
                /> 
                <NewsLabels loading = { this.props.loading} 
                            label = { this.props.label ? this.props.label : null } 
                            sentiment = { this.props.sentiment ? this.props.sentiment : null }
                            keywords = { this.props.keywords ? this.props.keywords : null }
                            match = { this.props.match }
                            fetchSearchResults = { this.props.fetchSearchResults }
                />
            </div>
         )
    }
}
 
export default NewsCard;