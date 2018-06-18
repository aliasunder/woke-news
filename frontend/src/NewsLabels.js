import React, { Component } from 'react';
import { Segment, Label, Dimmer, Loader } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import _ from 'lodash';

class NewsLabels extends Component {
   
    render() { 
        let labels = this.props.politicalLabels;
        let sentiment = this.props.sentiment;
        let keywords = this.props.keywords;
        let labelsJSX;

        const labelStyle = {
            margin: '1%'
        }

        if (!this.props.politicalLabels || !this.props.sentiment || !this.props.keywords){
            labelsJSX = <Segment padded>
                            <Dimmer active>
                                <Loader active/>
                            </Dimmer>
                        </Segment>
                     
        }
        else {
            let politicalJSX = labels.map(position => {
                return <NavLink key= { position.key } to= { '/search/' + position.label }>
                            <Label  circular 
                                    basic={ _.map(labels, 'label').length - 1 ===  _.map(labels, 'label').indexOf(position.label) ? false : true }
                                    style ={ labelStyle } 
                                    color="green"
                                    pointing={ _.map(labels, 'label').length - 1 ===  _.map(labels, 'label').indexOf(position.label) ? true : false }> 
                                { position.label } 
                            </Label> 
                        </NavLink>
            });

            let sentimentJSX;
            if (sentiment > 0.5){
                sentimentJSX =  <NavLink to = { '/search/positive' }>
                                    <Label circular pointing  style={ labelStyle } color="blue"> Positive </Label>
                                </NavLink>
            };

            if (sentiment < 0.5){
                sentimentJSX = <NavLink to = { '/search/negative' }>
                                    <Label circular pointing style={ labelStyle }  color="orange" > Negative </Label>
                                </NavLink>
            };

            let keywordsJSX = keywords.map(keyword => {
                 return <NavLink to={ '/search/' + keyword.keyword } key= { keyword.key }>
                            <Label  style= { labelStyle } circular basic color = "black"> { keyword.keyword } </Label>
                        </NavLink>
             });

            labelsJSX = <div>
                            { politicalJSX }
                            { sentimentJSX }
                            { keywordsJSX }
                        </div >
                        
        }
            
        return  ( <div>
                    { labelsJSX }
                </div>  
                )
    }
}
 
export default NewsLabels;