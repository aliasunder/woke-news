import React, { Component } from 'react';
import { Label, Grid, Card, Button } from 'semantic-ui-react';
import uniqid from 'uniqid';
import axios from 'axios';
import _ from 'lodash';
import config from './config.json';
import { NavLink } from 'react-router-dom';

class NewsResults extends Component {
    constructor() {
        super()
        this.state = {
            value: '',
            isLoading: false,
            results: []
        }
    }
    componentDidMount() {
        let { match } = this.props;
   
        let targetValue = match.params.term;
        
        this.setState({
            value: targetValue,
            isLoading: true
        })
        
        const hoaxyUrl = 'https://api-hoaxy.p.mashape.com/articles?';
        
        let options = {
            headers: {
                'X-Mashape-Key': config.hoaxyKey,
                'Accept': 'application/json'
              },
            params: {
                query: targetValue
            }
        };
        
        axios.get(hoaxyUrl, options)
            .then(results => {
                let searchResults = results.data.articles;
        
                const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
                const isMatch = result => re.test(result.title);
        
                const source = searchResults.map(article => {
                    return {    title: article.title,
                                description: article.domain,
                                url: article.canonical_url,
                                id: article.id,
                                site_type: article.site_type,
                                date: article.date_published,
                                numOfTweets: article.number_of_tweets }
                            })
        
                this.setState({
                    isLoading: false,
                    results: _.filter(source, isMatch)
                  });
                })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() { 
        let factArticlesJSX = [];
        let claimArticlesJSX = [];
        let resultsJSX = [];

        if (!this.state.results){
          resultsJSX = null
        }
        else {  
            let searchResults = this.state.results;
            searchResults.forEach(result => {
                if (result.site_type === 'fact_checking'){
                    factArticlesJSX.push(
                        <Card   centered link fluid
                                target="_blank"
                                key = { uniqid()}
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
                                key = { uniqid}
                                description = "Claim"
                                header = { result.title }
                                href = { result.url }
                                meta = { result.description }
                            /> 
                    )
                }
            })
            resultsJSX = <div>
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
        }

        return (
            <div>       
                { resultsJSX }
            </div>
         )
    }
}
 
export default NewsResults;