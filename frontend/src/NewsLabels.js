import React from 'react';
import { Segment, Label, Dimmer, Loader } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import _ from 'lodash';

const NewsLabels = (props) => {
    let labels = props.politicalLabels;
    let sentiment = props.sentiment;
    let keywords = props.keywords;
    let labelsJSX;

    const labelStyle = {
        margin: '1%'
    }
    // show loader while political, sentiment, and keyword labels are being loaded 
    if (!props.politicalLabels || !props.sentiment || !props.keywords){
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
 
export default NewsLabels;