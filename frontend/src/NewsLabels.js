import React from 'react';
import { Segment, Label, Dimmer, Loader } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import _ from 'lodash';

const NewsLabels = (props) => {
    const { politicalLabels, sentiment, keywords } = props;
    let labelsJSX;

    const labelStyle = {
        margin: '1%'
    }
    // show loader while political, sentiment, and keyword labels are being loaded 
    if (!politicalLabels || !sentiment || !keywords){
        labelsJSX = <Segment padded>
                        <Dimmer active>
                            <Loader active/>
                        </Dimmer>
                    </Segment>
                     
    }
    else {
        let politicalJSX = politicalLabels.map(position => {
            return <NavLink key= { position.key } to= { '/search/' + position.label }>
                        <Label  circular 
                                basic={ _.map(politicalLabels, 'label').length - 1 ===  _.map(politicalLabels, 'label').indexOf(position.label) ? false : true }
                                style ={ labelStyle } 
                                color="green"
                                pointing={ _.map(politicalLabels, 'label').length - 1 ===  _.map(politicalLabels, 'label').indexOf(position.label) ? true : false }> 
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