import axios from 'axios';
import uniqid from 'uniqid';
import moment from 'moment';

export default async (newsPage) => {
   const newsHeadlinesUrl = 'https://newsapi.org/v2/everything';
   const newsOptions = {
      headers: {
         'X-Api-Key': process.env.REACT_APP_NEWSAPI || process.env.NEWSAPI
      },
      params: {
         language: 'en',
         pageSize: 6,
         page: newsPage,
         from: moment().isoWeek(),
         to: moment().isoWeek(),
         q: '(politics OR political OR policy OR social OR society OR threat OR law AND truth OR fact OR biased)',
         sortBy: 'relevancy'
      }
   };
      
   const updatedUrls = [];
   
   const newHeadlines = await axios.get(newsHeadlinesUrl, newsOptions)
      .then(results =>{
         let newsData =  results.data.articles;
         // for each article, push the article URL into the updatedUrls array 
         // and add a unique 'key' to each article object in newsData array
         newsData.forEach(article => {
            updatedUrls.push(article.url)
            article.key = uniqid()
         });
         return newsData;
      })
      .catch(error => {
         console.log(error)
      })
   return { newHeadlines, updatedUrls }
}