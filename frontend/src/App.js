import React, { Component } from 'react';
import NewsCard from './NewsCard';
import './App.css';
import axios from 'axios';
import config from './config.json';
import moment from 'moment';
import _ from 'lodash';
import { Container, Search, Grid, Tab, Message, Pagination } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import NewsResults from './NewsResults';

class App extends Component {
  constructor(){
    super();
    this.state = {
      newsHeadlines: [],
      labelsLoading: false,
      value: '',
      results: [],
      isLoading: false,
      activePage: 5,
      boundaryRange: 1,
      siblingRange: 1,
      showEllipsis: true,
      showFirstAndLastNav: true,
      showPreviousAndNextNav: true,
      totalPages: 50,
    }
    this.fetchArticles = this.fetchArticles.bind(this);
    this.fetchSearchResults = this.fetchSearchResults.bind(this);
    this.resetComponent = this.resetComponent.bind(this);
    this.openLink = this.openLink.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
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
        page: 1,
        from: moment().isoWeek(),
        to: moment().isoWeek(),
        q: '(politics or political or technology or tech or policy or environment or social or society or internet or "social media")',
        sortBy: 'popularity'
      }
    };

    axios.get(newsHeadlinesUrl, newsOptions)
      .then(results =>{
        let updatedHeadlines = results.data.articles
        let updatedUrls = []
        updatedHeadlines.forEach(article => {
          updatedUrls.push(article.url)
        });
        this.setState({
          newsHeadlines: updatedHeadlines,
          labelsLoading: true
        });
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
      
        let newsHeadlinesCopy = [...this.state.newsHeadlines];
        for (let i = 0; i < newsHeadlinesCopy.length; i++){
          newsHeadlinesCopy[i].label = politicalList[i]
        }
        this.setState({
          newsHeadlines: newsHeadlinesCopy
        })
        let updatedUrls = []
        newsHeadlinesCopy.forEach(article => {
          updatedUrls.push(article.url)
        });
        return axios.post(indicoSentimentUrl, JSON.stringify({
          api_key: config.indicoKey,
          data: updatedUrls
        }))
      })
      .then(results => {
        let sentimentList = results.data.results
        let newsHeadlinesCopy = [...this.state.newsHeadlines];
        for (let i = 0; i < newsHeadlinesCopy.length; i++){
          newsHeadlinesCopy[i].sentiment = sentimentList[i]
        }
        this.setState({
          newsHeadlines: newsHeadlinesCopy
        })
        let updatedUrls = []
        newsHeadlinesCopy.forEach(article => {
          updatedUrls.push(article.url)
        });
        return axios.post(indicoKeywordsUrl, JSON.stringify({
          api_key: config.indicoKey,
          data: updatedUrls,
          threshold: 0.25,
          top_n: 9
        }))
      })
      .then(results => {
        let keywordResults = results.data.results;

        let keywordList = []
        for (let i = 0; i < keywordResults.length; i++){
          let keywordLabels = Object.keys(keywordResults[i]);
            keywordList.push(keywordLabels)
        }

        let newsHeadlinesCopy = [...this.state.newsHeadlines];
        for (let i = 0; i < newsHeadlinesCopy.length; i++){
          newsHeadlinesCopy[i].keywords = keywordList[i]
        }
        this.setState({
          newsHeadlines: newsHeadlinesCopy,
          labelsLoading: false
        })
        console.log(this.state.newsHeadlines)
      })
      .catch(error => {
        console.log(error)
      })
  };

  resetComponent(){
    this.setState({ 
      isLoading: false, 
      results: [], 
      value: "" 
    })
  };

  fetchSearchResults(value){
   
    let targetValue = value;

    this.setState({
      value: targetValue,
      isLoading: true
    })

    const hoaxyUrl = 'https://api-hoaxy.p.mashape.com/articles?';

    let options = {
      headers: {
        'X-Mashape-Key': config.hoaxyKey,
        'Accept': 'application/json'
      },
      params: {
        query: targetValue
      }
    };

    axios.get(hoaxyUrl, options)
      .then(results => {
        let searchResults = [];
        searchResults = results.data.articles;
        
        setTimeout(() => {
          if (this.state.value.length < 1) this.resetComponent();

          const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
          const isMatch = result => re.test(result.title);

          const source = searchResults.map(article => {
            return {  title: article.title,
                      description: article.domain,
                      url: article.canonical_url,
                      id: article.id,
                      site_type: article.site_type,
                      date: article.date_published,
                      numOfTweets: article.number_of_tweets }
          })

          this.setState({
            isLoading: false,
            results: _.filter(source, isMatch)
          });
        }, 300)
      })
      .catch(error => {
          console.log(error)
      })
  };

  openLink(event, result){
    let url = result.result.url
    window.open(url, '_blank');
};

handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

  render() {
    const panes = [
      { menuItem: 'Tab 1', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
      { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
      { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    ]

    const {
      activePage,
      boundaryRange,
      siblingRange,
      showEllipsis,
      showFirstAndLastNav,
      showPreviousAndNextNav,
      totalPages,
    } = this.state

    return (
      <div className="App">
        <Container>
          <Grid padded>
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
            <Grid.Row columns="three">
              <Grid.Column>
                <Search   results={ this.state.results } 
                          loading={ this.state.isLoading } 
                          value={ this.state.value } 
                          onResultSelect={ this.openLink}
                          onSearchChange={ _.debounce((event)=>this.fetchSearchResults(event.target.value), 500, { leading: true })}/>
              </Grid.Column>
              <Grid.Column>
                <Pagination
                  activePage={activePage}
                  boundaryRange={boundaryRange}
                  onPageChange={this.handlePaginationChange}
                  size='mini'
                  siblingRange={siblingRange}
                  totalPages={totalPages}
                  ellipsisItem={showEllipsis ? undefined : null}
                  firstItem={showFirstAndLastNav ? undefined : null}
                  lastItem={showFirstAndLastNav ? undefined : null}
                  prevItem={showPreviousAndNextNav ? undefined : null}
                  nextItem={showPreviousAndNextNav ? undefined : null}
                />
              </Grid.Column>
              <Grid.Column>
                <Tab menu={{ secondary: true }} panes={panes} />

              </Grid.Column>
            </Grid.Row>
          </Grid>
            
          <Switch>
            <Route exact path="/" render={(props)=><NewsCard  labelsLoading = { this.state.labelsLoading } 
                                                              fetchArticles = { this.fetchArticles } 
                                                              fetchSearchResults = { this.fetchSearchResults }
                                                              newsHeadlines = { this.state.newsHeadlines } 
                                                              match = { props.match } />}
                                                        />
            <Route path="/search/:term" render={(props)=><NewsResults labelsLoading = { this.state.labelsLoading } 
                                                                      fetchSearchResults= { this.fetchSearchResults } 
                                                                      loading={ this.state.isLoading }
                                                                      value={ this.state.value } 
                                                                      match = { props.match }
                                                                      results = { this.state.results } />}
                                                        />
          </Switch>
        </Container>
      </div>
    )
  }
};

export default App;
