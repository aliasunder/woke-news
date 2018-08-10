import axios from 'axios';

export default async (targetValue) => {
   const hoaxyUrl = 'https://api-hoaxy.p.mashape.com/articles?';
        
   const options = {
            headers: {
               'X-Mashape-Key': process.env.REACT_APP_HOAXYAPI,
               'Accept': 'application/json'
            },
            params: {
               query: targetValue
            }
         };

   const searchResultsData = await axios.get(hoaxyUrl, options)
      .then(results => {
         let searchResults = [];
         searchResults = results.data.articles;
         return searchResults;
      })
      .catch(error => {
         console.log(error);
      })
   return searchResultsData;
}