import React from 'react';
import { Card, Image } from 'semantic-ui-react'
import { NewsLabels } from '../../shared';
import sizeMe from 'react-sizeme';
import PropTypes from 'prop-types';

const NewsCardComponent = (props) => {
   const { url, loading, image, politicalLabels, sentiment, keywords, title, meta, description } = props;
   return (
      <Card fluid centered aria-labelledby="newsCardContainer">
         <Card.Content  as="a"
                        href={ url }
                        target="_blank"
                        rel="noopener noreferrer external"
                        aria-label="External link. Opens in a new tab.">
               <Image src = { image } alt = { '' }/>
         </Card.Content>
         <Card.Content  as="a"
                        href = { url }
                        target="_blank"
                        rel="noopener noreferrer external"
                        header = { title }
                        meta={ meta }
                        description={ description }
                        aria-label="External link. Opens in a new tab."/>
         <Card.Content extra>
            <NewsLabels loading = { loading }
                        politicalLabels = { politicalLabels ? politicalLabels : null }
                        sentiment = { sentiment ? sentiment : null }
                        keywords = { keywords ? keywords : null }
                  />
         </Card.Content>
      </Card>
   )
}

NewsCardComponent.propTypes = {
   loading: PropTypes.bool.isRequired,
   url: PropTypes.string.isRequired,
   politicalLabels: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired
   })),
   keywords: PropTypes.arrayOf(PropTypes.shape({
      keyword: PropTypes.string.isRequired
   })),
   title: PropTypes.string.isRequired,
   meta: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
   image: PropTypes.string,
   sentiment: PropTypes.number
}
export { NewsCardComponent }; // exported for unit testing
export const NewsCard = sizeMe({ monitorHeight: true })(NewsCardComponent);
