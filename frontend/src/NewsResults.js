import React, { Component } from 'react';
import { Grid, Card, Button, Loader } from 'semantic-ui-react';
import uniqid from 'uniqid';
import { NavLink } from 'react-router-dom';
import withSearchResults from './withSearchResults';

class NewsResults extends Component {
    
    componentDidMount() { 
        this.props.fetchSearchResults()
    }
    
    render() { 
        const { results, isLoading } = this.props;
        let factArticlesJSX = [];
        let claimArticlesJSX = [];
    
        let searchResults = results;
        searchResults.forEach(result => {
            if (result.site_type === 'fact_checking'){
                factArticlesJSX.push(
                    <Card   centered link fluid
                            target="_blank"
                            key = { uniqid() }
                            description = "Fact-Check"
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
                            key = { uniqid()}
                            description = "Claim"
                            header = { result.title }
                            href = { result.url }
                            meta = { result.description }
                        /> 
                )
            }
        })
        let resultsJSX = <div>
                            <Grid.Row>
                                <Grid.Column>
                                    <NavLink to={ '/' }><Button labelPosition='left' icon='left chevron' content='Back' /></NavLink>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid columns="two" padded>
                                <Grid.Row>        
                                    <Grid.Column>
                                        { factArticlesJSX } 
                                    </Grid.Column>
                                    <Grid.Column>
                                        { claimArticlesJSX }
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>

        let loadingJSX = <div>
                            <Grid.Row>
                                <Grid.Column>
                                    <NavLink to={ '/' }><Button labelPosition='left' icon='left chevron' content='Back' /></NavLink>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid padded>
                                <Grid.Row>        
                                    <Loader massive active/>
                                </Grid.Row>
                            </Grid>
                        </div>

        return (
            <div>       
                { isLoading ? (loadingJSX) : (resultsJSX) }
            </div>
         )
    }
}
 
export default withSearchResults(NewsResults);