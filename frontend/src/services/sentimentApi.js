import axios from 'axios';
import _ from 'lodash';
import config from '../config.json';

export default async (headlinesInState, updatedHeadlines, updatedUrls) => {
   const indicoSentimentUrl = 'https://apiv2.indico.io/sentiment/batch';

   const updatedHeadlinesCopy = await axios.post(indicoSentimentUrl, JSON.stringify({
      api_key: config.indicoKey,
      data: updatedUrls
   }))
      .then(results => {
         let sentimentList = results.data.results;
         // for each headline, add a 'sentiment' key and assign the corresponding sentiment value to it
         for (let i = 0; i < updatedHeadlines.length; i++){
            updatedHeadlines[i].sentiment = sentimentList[i]
         };
         // update the last 6 items in newsHeadlinesCopy with the sentiment data that's been fetched
         let newsHeadlinesCopy = [...headlinesInState];
         let startIndex = newsHeadlinesCopy.length - 6;
         newsHeadlinesCopy.splice(startIndex, 6, updatedHeadlines);
         newsHeadlinesCopy =  _.flattenDepth(newsHeadlinesCopy, 1);
         return newsHeadlinesCopy;
      })
      .catch(error => {
         console.log(error);
      })
   return updatedHeadlinesCopy
}