import React, { Component } from 'react';
import NewsCardContainer from './NewsCardContainer';
import NewsSearch from './NewsSearch';
import './App.css';
import axios from 'axios';
import config from './config.json';
import moment from 'moment';
import { Container, Search, Grid, Tab, Message, Dropdown, Menu } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import NewsResults from './NewsResults';
import sizeMe from 'react-sizeme';
import { ObjectID } from 'bson';

class App extends Component {
  constructor(){
    super();
    this.state = {
      newsHeadlines: [],
      labelsLoading: false,
      tabData: {},
      activeFilter: 'All News',
      newsPage: 1,
    }
    this.fetchArticles = this.fetchArticles.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleMobileTabChange = this.handleMobileTabChange.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  fetchArticles() {
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
        q: '(politics OR political OR policy OR social OR society OR threat OR law AND truth OR false OR fake OR fact OR biased)',
        sortBy: 'relevancy'
      }
    };
        
        
    let updatedHeadlines;
    let updatedUrls = [];   
    
    if (this.state.labelsLoading){
      return null
    }
    else{

    axios.get(newsHeadlinesUrl, newsOptions)
      .then(results =>{
        updatedHeadlines =  results.data.articles;
        

        updatedHeadlines.forEach(article => {
          updatedUrls.push(article.url)
        });

        updatedHeadlines.forEach(article => {
          article.key = new ObjectID()
        })

        let newsPageCopy = this.state.newsPage;
        let nextPage = newsPageCopy++; 
        this.setState({
          newsHeadlines: [...this.state.newsHeadlines, ...updatedHeadlines],
          labelsLoading: true,
          newsPage: newsPageCopy
        });
        console.log(this.state.newsHeadlines)
        return axios.post(indicoPoliticalUrl, JSON.stringify({
          api_key: config.indicoKey,
          data: updatedUrls,
          threshold: 0.25
        }))
      })
      .then(results => {
        let politicalResults = results.data.results;
        
        let politicalList = []
        for (let i = 0; i < politicalResults.length; i++){
          let politicalArray = Object.entries(politicalResults[i])
          let sorted = politicalArray.sort((a, b) => a[1] - b[1])
          let politicalObject = sorted.reduce((object, [key, value]) => { object[key] = value; return object }, {})
          let politicalLabels = Object.keys(politicalObject);
          politicalList.push(politicalLabels)
        }

        let createPoliticalObjects = function(updatedHeadlines){
          let updatedPoliticalList = [];

          for (let i = 0; i < updatedHeadlines.length; i++){
            updatedHeadlines[i].politicalLabels = politicalList[i];
            let politicalLabels = politicalList[i]
            let labelObjectArray = [];

            for (let i = 0; i < politicalLabels.length; i++){
              let labelObject = {};
              labelObject.label = politicalLabels[i]
              labelObject.key = new ObjectID();
              labelObjectArray.push(labelObject);
            }
            politicalList[i] = labelObjectArray;
            updatedPoliticalList.push(labelObjectArray)
          }
          return updatedPoliticalList;
        };
        
        let newPoliticalList = createPoliticalObjects(updatedHeadlines);

        for (let i = 0; i < updatedHeadlines.length; i++){
          updatedHeadlines[i].politicalLabels = newPoliticalList[i]
        };

        
        let newsHeadlinesCopy = [...this.state.newsHeadlines];
        let startIndex = newsHeadlinesCopy.length - 6;
          newsHeadlinesCopy.splice(startIndex, 6, updatedHeadlines);
          newsHeadlinesCopy =  _.flattenDepth(newsHeadlinesCopy, 1)
        

        this.setState({
          newsHeadlines: newsHeadlinesCopy
        })
  
        return axios.post(indicoSentimentUrl, JSON.stringify({
          api_key: config.indicoKey,
          data: updatedUrls
        }))
      })
      .then(results => {
        let sentimentList = results.data.results
        
        for (let i = 0; i < updatedHeadlines.length; i++){
          updatedHeadlines[i].sentiment = sentimentList[i]
        }

        let newsHeadlinesCopy = [...this.state.newsHeadlines];
        let startIndex = newsHeadlinesCopy.length - 6;
        newsHeadlinesCopy.splice(startIndex, 6, updatedHeadlines);
        newsHeadlinesCopy =  _.flattenDepth(newsHeadlinesCopy, 1)

        this.setState({
          newsHeadlines: newsHeadlinesCopy
        })
        
        return axios.post(indicoKeywordsUrl, JSON.stringify({
          api_key: config.indicoKey,
          data: updatedUrls,
          threshold: 0.25,
          top_n: 9
        }))
      })
      .then(results => {
        let keywordResults = results.data.results;

        let createKeywordObjects = function(keywordResults){
          let keywordList = []

          for (let i = 0; i < keywordResults.length; i++){
            let keywordLabels = Object.keys(keywordResults[i]);
            let keywordObjectArray = [];

            for (let i = 0; i < keywordLabels.length; i++){
              let keywordObject = {};
              keywordObject.keyword = keywordLabels[i]
              keywordObject.key = new ObjectID();
              keywordObjectArray.push(keywordObject)
            }
          keywordList.push(keywordObjectArray);
          }
          return keywordList;
        }

        let newKeywordList = createKeywordObjects(keywordResults);

        for (let i = 0; i < updatedHeadlines.length; i++){
          updatedHeadlines[i].keywords = newKeywordList[i]
        };

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
  };

  handleTabChange(event, data){
    let index = data.activeIndex;
    let filterTerm = data.panes[index].menuItem
    this.setState({ 
      tabData: data,
      activeFilter: filterTerm
    })
  };

  handleMobileTabChange(event, value){
    let filterTerm = value.value
    this.setState({
      activeFilter: filterTerm
    })
  };

  refresh(){
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

  render() {
    const { width } = this.props.size;

    const panes = [
      { menuItem: 'All News', render: () => <Tab.Pane as="div"></Tab.Pane> },
      { menuItem: 'Positive', render: () => <Tab.Pane as="div"></Tab.Pane> },
      { menuItem: 'Negative', render: () => <Tab.Pane as="div"></Tab.Pane> },
      { menuItem: 'Liberal', render: () => <Tab.Pane as="div"></Tab.Pane> },
      { menuItem: 'Conservative', render: () => <Tab.Pane as="div"> </Tab.Pane> },
      { menuItem: 'Green', render: () => <Tab.Pane as="div"></Tab.Pane> },
      { menuItem: 'Libertarian', render: () => <Tab.Pane as="div"></Tab.Pane> },
      { menuItem: 'Claims', render: () => <Tab.Pane as="div"></Tab.Pane> },
      { menuItem: 'Fact-Check', render: () => <Tab.Pane as="div"></Tab.Pane> },
    ]

    const mobilePanes = [
      { key:'All News', text: 'All News', value: 'All News' },
      { key:'Positive', text: 'Positive', value: 'Positive' },
      { key:'Negative', text: 'Negative', value: 'Negative' },
      { key:'Liberal', text: 'Liberal', value: 'Liberal' },
      { key:'Conservative', text: 'Conservative', value: 'Conservative' },
      { key:'Green', text: 'Green', value: 'Green' },
      { key:'Libertarian', text: 'Libertarian', value: 'Libertarian' },
      { key:'Claims', text: 'Claims', value: 'Claims' },
      { key:'Fact-Check', text: 'Fact-Check', value: 'Fact-Check' }
    ]

    return (
      <div className="App">
        <Container>
          <Grid padded stackable>
            <Grid.Row>
              <Grid.Column>
                <Message color="black" size="massive">
                  <Message.Header>
                    Woke News
                  </Message.Header>
                  <p>
                    Context matters
                  </p>
                </Message>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns="two" >
              <Grid.Column>
                <NewsSearch />
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={ panes.length + 1 }>
              { width >= 768 ? 
                (<Tab menu={{ secondary: true }} panes={ panes } onTabChange={ this.handleTabChange }/>)      
                :
                (<Menu fluid>
                    <Dropdown fluid options={ mobilePanes } onChange={ this.handleMobileTabChange } placeholder={ this.state.activeFilter }  value={ this.state.activeFilter } selection/>
                  </Menu>)
              }
            </Grid.Row>
          </Grid>
          <Switch>
            <Route exact path="/" render={(props)=><NewsCardContainer   labelsLoading = { this.state.labelsLoading }
                                                                        handleTabChange = { this.handleTabChange }
                                                                        handleScroll = { this.handleScroll }
                                                                        activeFilter = { this.state.activeFilter }
                                                                        fetchArticles = { this.fetchArticles } 
                                                                        fetchSearchResults = { this.fetchSearchResults }
                                                                        newsHeadlines = { this.state.newsHeadlines } 
                                                                        dataLength={ this.state.newsHeadlines.length } 
                                                                        refreshFunction={ this.refresh }
                                                                        width = { width }
                                                                        match = { props.match } />}  
                          
                                                      />
                                            
            <Route path="/search/:term" render={(props)=><NewsResults labelsLoading = { this.state.labelsLoading } 
                                                                      activeFilter = { this.state.activeFilter }
                                                                      handleTabChange = { this.handleTabChange }
                                                                      loading={ this.state.isLoading }
                                                                      match = { props.match }
                                                                      results = { this.state.results } />}
                                                      />
          </Switch>
        </Container>
      </div>
    )
  }
};

export default sizeMe({ monitorWidth: true, refreshRate: 700 })(App);
