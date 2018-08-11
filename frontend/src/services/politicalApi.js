import axios from 'axios';
import uniqid from 'uniqid';
import _ from 'lodash';

export default async (headlinesInState, updatedHeadlines, updatedUrls) => {
   const indicoPoliticalUrl = 'https://apiv2.indico.io/political/batch';

   const updatedHeadlinesCopy = await axios.post(indicoPoliticalUrl, JSON.stringify({
      api_key: process.env.REACT_APP_INDICOAPI,
      data: updatedUrls,
      threshold: 0.25
   }))
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
               let politicalLabels = politicalList[i];
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

         let newsHeadlinesCopy = [...headlinesInState];

         // update the last 6 items in newsHeadlinesCopy with the political data that's been fetched
         let startIndex = newsHeadlinesCopy.length - 6;
         newsHeadlinesCopy.splice(startIndex, 6, updatedHeadlines);
         newsHeadlinesCopy =  _.flattenDepth(newsHeadlinesCopy, 1)
         return newsHeadlinesCopy;
      })
      .catch(error => {
         console.log(error)
      })
   return updatedHeadlinesCopy
}