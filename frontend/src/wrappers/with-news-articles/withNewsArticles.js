import React, { Component } from 'react';
import PropTypes from 'prop-types';
import newsApi from '../../services/newsApi';
import politicalApi from '../../services/politicalApi';
import sentimentApi from '../../services/sentimentApi';
import keywordsApi from '../../services/keywordsApi';

// class created for testing purposes. The default export withNewsArticles
// inherits this class and exports the higher-order component
class FetchArticles extends Component {
   static propTypes = {
      state: PropTypes.shape({
         newsHeadlines: PropTypes.arrayOf(PropTypes.object).isRequired,
         labelsLoading: PropTypes.bool.isRequired,
         newsPage: PropTypes.number.isRequired
      })
   };
   state = {
      newsHeadlines: [],
      labelsLoading: false,
      newsPage: 1,
   };

   fetchArticles = async () => {
      let { newHeadlines, updatedUrls} = await newsApi(this.state.newsPage);

      // create a promise object that takes a params for the newly loaded headlines and urls
      let results = (newHeadlines, updatedUrls) => {
         return new Promise((resolve, reject) => {
                  resolve({ newHeadlines, updatedUrls })
         })
      };

      results(newHeadlines, updatedUrls)
      .then(results => {
         let newsPageCopy = this.state.newsPage;
         newsPageCopy++;
         // when the newsapi data loads, add it to the previous data, show loading icon, and change page number
         // so data for the next data load is fetched for the next page
         this.setState({
            newsHeadlines: [...this.state.newsHeadlines, ...results.newHeadlines],
            labelsLoading: true,
            newsPage: newsPageCopy
         });
         return { newHeadlines, updatedUrls };
      })
      .then( async results => {
         // now fetch political analysis data for URLs in the updatedUrls array
         let updatedHeadlinesWithPoliticalData = await politicalApi(this.state.newsHeadlines, results.newHeadlines, results.updatedUrls);

         this.setState({
            newsHeadlines: updatedHeadlinesWithPoliticalData
         });
         return { newHeadlines, updatedUrls };
      })
      .then( async results =>{
         // now fetch the sentiment data for each news headline
         let updatedHeadlinesWithSentimentData = await sentimentApi(this.state.newsHeadlines, results.newHeadlines, results.updatedUrls);

         this.setState({
            newsHeadlines: updatedHeadlinesWithSentimentData
         });
         return { newHeadlines, updatedUrls };
      })
      .then( async results => {
         // now fetch the keywords for each news headline
         let updatedHeadlinesWithKeywordData = await keywordsApi(this.state.newsHeadlines, results.newHeadlines, results.updatedUrls);

         this.setState({
            newsHeadlines: updatedHeadlinesWithKeywordData,
            labelsLoading: false
         })
         return updatedHeadlinesWithKeywordData;
      })
      .catch(error => {
         console.log(error)
      });
   };

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
   };

   render(){
      return (
         <div  fetchArticles = { this.fetchArticles }
               refresh = { this.refresh }
               handleTabChange = { this.props.handleTabChange }
               handleMobileTabChange = { this.props.handleMobileTabChange }
               width = { this.props.width }
               activeFilter = { this.props.activeFilter }
               { ...this.state }
            />
      )
   };
};

const withNewsArticles = (WrappedComponent) => {
   return class extends FetchArticles {
      render(){
         return <WrappedComponent   fetchArticles = { this.fetchArticles }
                                    refresh = { this.refresh }
                                    handleTabChange = { this.props.handleTabChange }
                                    handleMobileTabChange = { this.props.handleMobileTabChange }
                                    width = { this.props.width }
                                    activeFilter = { this.props.activeFilter }
                                    { ...this.state } />
      }
   }
};

export { FetchArticles } // exported for unit testing
export  { withNewsArticles }
