import React, { Component } from 'react';
import { Segment, Label, Dimmer, Loader, Grid, Card } from 'semantic-ui-react';
import { ObjectID } from 'bson';

class NewsResults extends Component {

    componentDidMount() {
        let { match } = this.props;
        this.props.fetchSearchResults(match.params.term);
        console.log(match.params.term); 
    }
    
    render() { 
        let factArticlesJSX = [];
        let claimArticlesJSX = [];
        let resultsJSX = [];


        if (!this.props.results || this.props.results.length < 1){
          resultsJSX = <Grid padded>
                            <Grid.Row stretched>
                                <Grid.Column>
                                    <Dimmer active>
                                        <Loader  content='Loading Results' size='big' active/>
                                    </Dimmer>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
        }
        else {  
            let searchResults = this.props.results;
            searchResults.forEach(result => {
                if (result.site_type === 'fact_checking'){
                    factArticlesJSX.push(
                        <Card   centered link fluid
                                target="_blank"
                                key = { new ObjectID() }
                                description = { result.site_type }
                                header = { result.title }
                                href = { result.url }
                                meta = { result.description }
                            /> 
                    )
                }
                else {
                    claimArticlesJSX.push(
                        <Card   centered link fluid
                                target="_blank"
                                key = { new ObjectID() }
                                description = { result.site_type }
                                header = { result.title }
                                href = { result.url }
                                meta = { result.description }
                            /> 
                    )
                }
            })
            resultsJSX = <div>
                            <Grid columns="two" padded>        
                                <Grid.Column>
                                    { factArticlesJSX } 
                                </Grid.Column>
                                <Grid.Column>
                                    { claimArticlesJSX }
                                </Grid.Column>
                            </Grid>
                        </div>
        }

        return (
            <div>       
                { resultsJSX }
            </div>
         )
    }
}
 
export default NewsResults;