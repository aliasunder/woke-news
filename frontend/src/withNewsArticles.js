import React, { Component } from 'react';
import axios from 'axios';
import config from './config.json';
import moment from 'moment';
import _ from 'lodash';
import uniqid from 'uniqid';

const withNewsArticles = (WrappedComponent) => {
   return class extends Component {
      state = {
         newsHeadlines: [],
         labelsLoading: false,
         newsPage: 1,
      }
      
      fetchArticles = () => {
         const newsHeadlinesUrl = 'https://newsapi.org/v2/everything';
         const indicoPoliticalUrl = 'https://apiv2.indico.io/political/batch';
         const indicoSentimentUrl = 'https://apiv2.indico.io/sentiment/batch';
         const indicoKeywordsUrl = 'https://apiv2.indico.io/keywords/batch?version=2';
    
         let newsOptions = {
            headers: {
               'X-Api-Key': config.newsApiKey
            },
            params: {
               language: 'en',
               pageSize: 6,
               page: this.state.newsPage,
               from: moment().isoWeek(),
               to: moment().isoWeek(),
               q: '(politics OR political OR policy OR social OR society OR threat OR law AND truth OR fact OR biased)',
               sortBy: 'relevancy'
            }
         };
            
         let updatedHeadlines;
         let updatedUrls = []; 

         axios.get(newsHeadlinesUrl, newsOptions)
            .then(results =>{
               updatedHeadlines =  results.data.articles;
               // for each article, push the article URL into the updatedUrls array 
               // and add a unique 'key' to each article object in updatedHeadlines array
               updatedHeadlines.forEach(article => {
                  updatedUrls.push(article.url)
                  article.key = uniqid()
               });

               let newsPageCopy = this.state.newsPage;
               newsPageCopy++; 
               // when the data loads, add it to the previous data, show loading icon, and change page number
               // so data for the next data load is fetched for the next page
               this.setState({
                  newsHeadlines: [...this.state.newsHeadlines, ...updatedHeadlines],
                  labelsLoading: true,
                  newsPage: newsPageCopy
               });
               console.log(this.state.newsHeadlines)
               // now fetch political analysis data for URLs in the updatedUrls array
               return axios.post(indicoPoliticalUrl, JSON.stringify({
                  api_key: config.indicoKey,
                  data: updatedUrls,
                  threshold: 0.25
               }))
            })
            .then(results => {
               let politicalResults = results.data.results;
               let politicalList = []
               // for each result in the array, sort the political leanings from lowest value (least likely) to highest value (most likely)
               // and return an object with the political leaning key/value pairs in order from lowest to highest value
               politicalResults.forEach((article)=>{
                  let politicalArray = Object.entries(article)
                     .sort((a, b) => a[1] - b[1])
                     .reduce((object, [key, value]) => { 
                        object[key] = value; 
                        return object 
                     }, {})
                  let politicalLabels = Object.keys(politicalArray);
                  politicalList.push(politicalLabels)
               });

               // create custom political objects with necessary data and push into an array
               let createPoliticalObjects = function(updatedHeadlines){
                  let updatedPoliticalList = [];

                  for (let i = 0; i < updatedHeadlines.length; i++){
                     updatedHeadlines[i].politicalLabels = politicalList[i];
                     let politicalLabels = politicalList[i]
                     let labelObjectArray = [];

                     for (let i = 0; i < politicalLabels.length; i++){
                        let labelObject = {};
                        labelObject.label = politicalLabels[i]
                        labelObject.key = uniqid();
                        labelObjectArray.push(labelObject);
                     }
                     politicalList[i] = labelObjectArray;
                     updatedPoliticalList.push(labelObjectArray)
                  }
                  return updatedPoliticalList;
               };
        
               let newPoliticalList = createPoliticalObjects(updatedHeadlines);
               // attach custom political objects to the corresponding news headlines object
               for (let i = 0; i < updatedHeadlines.length; i++){
                  updatedHeadlines[i].politicalLabels = newPoliticalList[i]
               };

               let newsHeadlinesCopy = [...this.state.newsHeadlines];
               // update the last 6 items in newsHeadlinesCopy with the political data that's been fetched
               let startIndex = newsHeadlinesCopy.length - 6;
               newsHeadlinesCopy.splice(startIndex, 6, updatedHeadlines);
               newsHeadlinesCopy =  _.flattenDepth(newsHeadlinesCopy, 1)
        
               this.setState({
                  newsHeadlines: newsHeadlinesCopy
               })
               // now fetch the sentiment data for each news headline
               return axios.post(indicoSentimentUrl, JSON.stringify({
                  api_key: config.indicoKey,
                  data: updatedUrls
               }))
            })
            .then(results => {
               let sentimentList = results.data.results
               // for each headline, add a 'sentiment' key and assign the corresponding sentiment value to it
               for (let i = 0; i < updatedHeadlines.length; i++){
                  updatedHeadlines[i].sentiment = sentimentList[i]
               }
               // update the last 6 items in newsHeadlinesCopy with the sentiment data that's been fetched
               let newsHeadlinesCopy = [...this.state.newsHeadlines];
               let startIndex = newsHeadlinesCopy.length - 6;
               newsHeadlinesCopy.splice(startIndex, 6, updatedHeadlines);
               newsHeadlinesCopy =  _.flattenDepth(newsHeadlinesCopy, 1)

               this.setState({
                  newsHeadlines: newsHeadlinesCopy
               })
               // now fetch the keywords for each news headline
               return axios.post(indicoKeywordsUrl, JSON.stringify({
                  api_key: config.indicoKey,
                  data: updatedUrls,
                  threshold: 0.25,
                  top_n: 9
               }))
            })
            .then(results => {
               let keywordResults = results.data.results;
               // create keyword objects for each news headline and push them to an array
               let createKeywordObjects = function(keywordResults){
                  let keywordList = []

                  for (let i = 0; i < keywordResults.length; i++){
                     let keywordLabels = Object.keys(keywordResults[i]);
                     let keywordObjectArray = [];

                     for (let i = 0; i < keywordLabels.length; i++){
                        let keywordObject = {};
                        keywordObject.keyword = keywordLabels[i]
                        keywordObject.key = uniqid();
                        keywordObjectArray.push(keywordObject)
                     }
                     keywordList.push(keywordObjectArray);
                  }
                  return keywordList;
               }

               let newKeywordList = createKeywordObjects(keywordResults);
               // for each headline, add a 'keywords' key and assign the corresponding keywords value
               for (let i = 0; i < updatedHeadlines.length; i++){
                  updatedHeadlines[i].keywords = newKeywordList[i]
               };
               // update the last 6 items in newsHeadlinesCopy with the keywords data that's been fetched
               let newsHeadlinesCopy = [...this.state.newsHeadlines];
               let startIndex = newsHeadlinesCopy.length - 6;
               newsHeadlinesCopy.splice(startIndex, 6, updatedHeadlines );
               newsHeadlinesCopy =  _.flattenDepth(newsHeadlinesCopy, 1)

               this.setState({
                  newsHeadlines: newsHeadlinesCopy,
                  labelsLoading: false
               })
               console.log(this.state.newsHeadlines)
            })
            .catch(error => {
               console.log(error)
            })
      } 
    
      refresh = () => {
         this.setState({
            newsHeadlnes: [] 
         });
         let newsHeadlinesCopy = this.state.newsHeadlines;
    
         setTimeout(this.fetchArticles(),() => {
            this.setState({
               newsHeadlines: newsHeadlinesCopy
            });
         }, 3000);
      }
    
      render(){
         return (
            <div>
               <WrappedComponent fetchArticles = { this.fetchArticles } refresh = { this.refresh }
                                 handleTabChange = { this.props.handleTabChange }
                                 handleMobileTabChange = { this.props.handleMobileTabChange }
                                 width = { this.props.width }
                                 activeFilter = { this.props.activeFilter }
                                 { ...this.state } 
                           />
            </div>
         )
      } 
   }   
};

export default withNewsArticles;
