import React, { Component } from 'react';
import { Segment, Label, Dimmer, Loader, Grid, Card } from 'semantic-ui-react';
import { ObjectID } from 'bson';
import axios from 'axios';
import _ from 'lodash';
import config from './config.json';

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
        console.log(match.params.term); 
   
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
            let searchResults = this.state.results;
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