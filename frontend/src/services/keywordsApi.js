import axios from 'axios';
import uniqid from 'uniqid';
import _ from 'lodash';
import config from '../config.json';

export default async (updatedHeadlines, updatedUrls) => {
   const indicoKeywordsUrl = 'https://apiv2.indico.io/keywords/batch?version=2';
   const updatedHeadlinesCopy = await axios.post(indicoKeywordsUrl, JSON.stringify({
      api_key: config.indicoKey,
      data: updatedUrls,
      threshold: 0.25,
      top_n: 9
   }))
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
         let newsHeadlinesCopy = [...updatedHeadlines];
         let startIndex = newsHeadlinesCopy.length - 6;
         newsHeadlinesCopy.splice(startIndex, 6, updatedHeadlines );
         newsHeadlinesCopy =  _.flattenDepth(newsHeadlinesCopy, 1)

         return newsHeadlinesCopy;
      })
      .catch(error => {
         console.log(error)
         })
   return updatedHeadlinesCopy; 
}