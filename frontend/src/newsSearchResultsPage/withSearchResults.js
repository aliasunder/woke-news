import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import uniqid from 'uniqid';
import config from '../config.json';
import PropTypes from 'prop-types';

const withSearchResults = (WrappedComponent) => {
   return class extends Component {
      static propTypes = {
         state: PropTypes.shape({
            isLoading: PropTypes.bool.isRequired,
            results: PropTypes.arrayOf(PropTypes.object).isRequired,
            value: PropTypes.string.isRequired
         })
      }

      state = {
         value: '',
         isLoading: false,
         results: []
      }

      fetchSearchResults = (value) => {
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
                  if (this.state.value.length < 1 || !targetValue ){
                        this.resetComponent()
                  }
                  else {
                     const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
                     const isMatch = result => re.test(result.title);
        
                     const source = searchResults.map(article => {
                        return { title: article.title,
                                 description: article.domain,
                                 url: article.canonical_url,
                                 key: uniqid(),
                                 site_type: article.site_type,
                                 date: article.date_published
                              }
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
         window.open(url, '_blank');
      };

      render(){
         const { match } = this.props;
         return (
            <WrappedComponent    fetchSearchResults = { this.fetchSearchResults }
                                 resetComponent = { this.resetComponent }
                                 openLink = { this.openLink }
                                 width = { this.props.width }
                                 match = { match ? match : null}
                                 { ...this.state }
                  />
         )
      }
   }
};

export default withSearchResults;