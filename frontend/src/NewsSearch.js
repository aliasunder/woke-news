import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Search } from 'semantic-ui-react';
import config from './config.json';

class NewsSearch extends Component {
    constructor(){
        super();
        this.state = {
            value: '',
            results: [],
            isLoading: false
        }
        this.fetchSearchResults = this.fetchSearchResults.bind(this);
        this.openLink = this.openLink.bind(this);
        this.resetComponent = this.resetComponent.bind(this);
    }

    resetComponent(){
        this.setState({ 
            isLoading: false, 
            results: [], 
            value: "" 
        })
    };

    fetchSearchResults(value){

        let targetValue = value;
    
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
                let searchResults = [];
                searchResults = results.data.articles;
            
                setTimeout(() => {
                    if (this.state.value.length < 1){
                        this.resetComponent()
                    }
                    else {
                        const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
                        const isMatch = result => re.test(result.title);
    
                        const source = searchResults.map(article => {
                            return {  title: article.title,
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
                    }
                }, 300)
            })
            .catch(error => {
                console.log(error)
            })
    };

    openLink(event, result){
        let url = '/search/' + result.result.title
        console.log(result.result);
        window.open(url, '_blank');
    };

    render(){
        return (
            <Search     results={ this.state.results } 
                        loading={ this.state.isLoading } 
                        value={ this.state.value } 
                        onResultSelect={ this.openLink }
                        onSearchChange={ _.debounce((event)=>this.fetchSearchResults(event.target.value), 500, { leading: true })}
            />
        )
    }
}

export default NewsSearch;