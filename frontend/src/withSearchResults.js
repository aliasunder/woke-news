import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import config from './config.json';

const withSearchResults = (WrappedComponent) => {
    return class extends Component {
        state = {
            value: '',
            isLoading: false,
            results: []
        }
        fetchSearchResults = (value) => {
            let targetValue = value || this.props.match.params.term;
        
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
        }

        resetComponent = () => {
            this.setState({ 
                isLoading: false, 
                results: [], 
                value: "" 
            })
        };
    
        openLink = (result) => {
            let url = '/search/' + result.result.title
            console.log(result.result);
            window.open(url, '_blank');
        };

        render(){
            return (
                <WrappedComponent   fetchSearchResults = { this.fetchSearchResults }
                                    resetComponent = { this.resetComponent }
                                    openLink = { this.openLink }
                                    { ...this.state }
                    />
            )
        }

    }
};

export default withSearchResults;