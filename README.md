## About Woke News

This app aims to help solve the problem of fake news and biased misinformation. Users are able to search for articles and view helpful information about each article before reading it, including political analysis, sentiment analysis, and key topics in the article. For each topic area, users can view the proliferation of claims from different sources and related fact-check articles by using the search bar or clicking on any of the labels below an articles. Articles can be filtered based on various criteria.  


The app is built using ReactJS, with Semantic-UI React components used for the overall design, with a focus on ensuring that the app is fully responsive, visually appealing, and the user experience is positive.  

Key NPM packages used for the app include React-Router, sizeMe ( tracks the window resolution ), lodash, axios, and StackGrid (used for the Pinterest-like layout of articles).  

Three different API providers are used on the front-end (newsapi.org to retrieve news articles, Indico for text analysis, and Hoaxy for retrieving fact-check and claim articles related to keywords).

## View Live App

**[http://woke-news.herokuapp.com/](http://woke-news.herokuapp.com/ "Woke News App")**

## Install App
```
git clone https://github.com/aliasunder/woke-news.git
```

## Features in Progress

* loading page after clicking on a label - currently the articles load, but there is no indication that it is loading
* include both news articles and fact-check/claim articles in the search bar results. Currently only fact-check and claim articles are searchable
* update to search results page - improve design, add labels
* improved mobile experience. App is responsive, but the experience could be improved. 
* social-media sharing
* 'Save to Pocket' feature
* discussion component
* fake news analysis of articles loaded - use an API to determine likelihood that an article is fake and display this to the user
* Next stretch - login component, user preferences, built-in social community
* At some time in the future an app for iOS and Android will be built using React Native and a Chrome extension will be created for analysing any news article page. 
