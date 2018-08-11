import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import StackGrid from 'react-stack-grid';
import NewsCard from './NewsCard';

class NewsCardContainer extends Component {
   static propTypes = {
      width: PropTypes.number.isRequired,
      newsHeadlines: PropTypes.arrayOf(PropTypes.object).isRequired,
      activeFilter: PropTypes.string.isRequired,
      labelsLoading: PropTypes.bool.isRequired
   }
    
   componentDidMount() {
      this.props.fetchArticles() 
   }

   updateLayout = ()=> {
      this.grid.updateLayout();
   }    

   render() { 
      const { newsHeadlines, activeFilter, width, labelsLoading } = this.props;
    
      let filteredNews = newsHeadlines.filter(article => {
         if (activeFilter === 'Positive'){
            return article.sentiment > 0.5
         }
         else if (activeFilter === 'Negative'){
            return article.sentiment < 0.5
         }
         else if (activeFilter === 'Liberal'){
            return _.find(article.politicalLabels, { 'label': 'Liberal'});
         }
         else if (activeFilter === 'Conservative'){
            return _.find(article.politicalLabels, { 'label': 'Conservative'});
         }
         else if (activeFilter === 'Green'){
            return _.find(article.politicalLabels, { 'label': 'Green'});
         }
         else if (activeFilter === 'Libertarian'){
            return _.find(article.politicalLabels, { 'label': 'Libertarian'});
         }
         else if (activeFilter === 'Claims'){
            return _.find(article.politicalLabels, { 'label': 'Claims'});
         }
         else if (activeFilter === 'Fact-Check'){
            return _.find(article.politicalLabels, { 'label': 'Fact-Check'});
         }
         else {
            return newsHeadlines;    
         }
      })

      return (  
         <div style={{ padding: '1% 5%' }} id="newsCardContainer"> 
            <StackGrid  columnWidth= { width <= 768 ? '90%' : '35%' } 
                        gutterWidth={ 20 } 
                        gutterHeight={ 20 }  
                        gridRef={grid => this.grid = grid}
                        style = {{ width: '100%' }}>
                    { 
                        filteredNews.map((prop)=>{
                           return <NewsCard  key = { prop.key} 
                                             className="item"
                                             description = { prop.description }
                                             image = { prop.urlToImage }
                                             title = { prop.title }
                                             url = { prop.url }
                                             meta = { prop.source.name }
                                             loading = { labelsLoading } 
                                             politicalLabels = { prop.politicalLabels ? prop.politicalLabels : null } 
                                             sentiment = { prop.sentiment ? prop.sentiment : null }
                                             keywords = { prop.keywords ? prop.keywords : null }
                                             onSize = { this.updateLayout }
                                                />
                                    }, this)
                     }
            </StackGrid>
         </div> 
      )
   }
};

export default NewsCardContainer;