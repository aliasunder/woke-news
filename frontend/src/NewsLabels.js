import React, { Component } from 'react';
import { Segment, Label, Dimmer, Loader, Grid } from 'semantic-ui-react'
import { ObjectID } from 'bson';
import { NavLink } from 'react-router-dom';

class NewsLabels extends Component {
   
    render() { 
        let label = this.props.label;
        let sentiment = this.props.sentiment;
        let keywords = this.props.keywords;
        let labelsJSX;

        const labelStyle = {
            margin: '2%'
        }

        if (!this.props.label || !this.props.sentiment || !this.props.keywords){
            labelsJSX = <Dimmer active>
                            <Loader active/>
                        </Dimmer>
                     
        }
        else {
            let politicalJSX = label.map(position => {
                return <NavLink key = { new ObjectID() } to={ '/search/' + position }>
                            <Label style={ labelStyle } color = { label.length - 1 === label.indexOf(position) ? "green" : "grey" }> 
                            { position } </Label> 
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
                 return <NavLink to={ '/search/' + keyword } key = { new ObjectID() }>
                            <Label  style={ labelStyle } circular basic color = "black"> { keyword } </Label>
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