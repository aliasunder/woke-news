## About Woke News

This app aims to help solve the problem of fake news and biased misinformation. Users are able to search for articles and view helpful information about each article before reading it, including political analysis, sentiment analysis, and key topics in the article. For each topic area, users can view the proliferation of claims from different sources and related fact-check articles by using the search bar or clicking on any of the labels below an article. Articles can be filtered based on various criteria. As you scroll down the main page, additional articles are loaded each time you pass a specific scroll threshold.  

The app is built using **ReactJS**, with **Semantic-UI** React components used for the overall design. **Jest** & **Enzyme** are used for unit testing of each React component. 

Key NPM packages used for the app include React-Router, sizeMe ( higher-order component that tracks the window resolution ), lodash, axios, and StackGrid (used for the Pinterest-like layout of articles). 

Three different API providers are used on the front-end (newsapi.org to retrieve news articles, Indico for text analysis, and Hoaxy for retrieving fact-check and claim articles related to keywords).

## View Live App

**[http://woke-news.herokuapp.com/](http://woke-news.herokuapp.com/ "Woke News App")**

## View Project Board

* In July 2018, I started a project board for the web app to track tasks as I complete them:  
**[Web App Project Board](https://github.com/aliasunder/woke-news/projects/1?fullscreen=true "Woke News Project Board")**

## Install App
```
git clone https://github.com/aliasunder/woke-news.git
```

## Run Tests
```
npm test
```

## Next Stretch

* Build iOS and Android apps using React Native
* Create Chrome extension for analysing any news article page
