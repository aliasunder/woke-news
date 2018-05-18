import React, { Component } from 'react';
import { Segment, Label, Dimmer, Loader, Grid } from 'semantic-ui-react'
import { ObjectID } from 'bson';
import { NavLink } from 'react-router-dom';

class NewsLabels extends Component {
   
    render() { 
        let labels = this.props.politicalLabels;
        let sentiment = this.props.sentiment;
        let keywords = this.props.keywords;
        let labelsJSX;

        const labelStyle = {
            margin: '2%'
        }

        if (!this.props.politicalLabels || !this.props.sentiment || !this.props.keywords){
            labelsJSX = <Dimmer active>
                            <Loader active/>
                        </Dimmer>
                     
        }
        else {
            let politicalJSX = labels.map(position => {
                return <NavLink key = { position.key } to={ '/search/' + position.label }>
                            <Label style={ labelStyle } color = { labels.length - 1 === labels.indexOf(position.label) ? "green" : "grey" }> 
                            { position.label } </Label> 
                        </NavLink>
            });

            let sentimentJSX;
            if (sentiment > 0.5){
                sentimentJSX =  <NavLink to={ '/search/positive' }>
                                    <Label style={ labelStyle } basic color = "green"> Positive </Label>
                                </NavLink>
            };

            if (sentiment < 0.5){
                sentimentJSX = <NavLink to={ '/search/negative' }>
                                    <Label style={ labelStyle } basic color = "orange" > Negative </Label>
                                </NavLink>
            };

            let keywordsJSX = keywords.map(keyword => {
                 return <NavLink to={ '/search/' + keyword } key = { keyword.key }>
                            <Label  style={ labelStyle } circular basic color = "black"> { keyword.keyword } </Label>
                        </NavLink>
             });

            labelsJSX = <div>
                            <Grid columns="equal" stackable>
                                <Grid.Column>
                                    { politicalJSX }
                                </Grid.Column>
                                <Grid.Column>
                                    { sentimentJSX }
                                </Grid.Column>
                                <Grid.Column width="nine">
                                    { keywordsJSX }
                                </Grid.Column>
                            </Grid>
                        </div>
        }
            
        return ( 
                <Segment padded>
                    { labelsJSX }
                </Segment>  
          
         )
    }
}
 
export default NewsLabels;