import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react'
import NewsLabels from '../appComponents/NewsLabels';
import sizeMe from 'react-sizeme';
import { PocketButton } from 'react-social-sharebuttons';
import PropTypes from 'prop-types';

const NewsCard = (props) => {
   const { url, loading, image, politicalLabels, sentiment, keywords, title, meta, description, match } = props;
   return ( 
      <Card fluid centered> 
         <Card.Content as="a" href={ url } target="_blank">
                  <Label style = {{ backgroundColor: 'white' }} attached='top right'><PocketButton /></Label>
                  <Image src = { image } />
         </Card.Content>
         <Card.Content as="a" href = { url } target="_blank" header = { title } meta={ meta } description={ description } />
         <Card.Content extra>
            <NewsLabels loading = { loading} 
                        politicalLabels = { politicalLabels ? politicalLabels : null } 
                        sentiment = { sentiment ? sentiment : null }
                        keywords = { keywords ? keywords : null }
                        match = { match }
                  />
         </Card.Content>
      </Card>
   )
}

NewsCard.propTypes = {
   loading: PropTypes.bool.isRequired,
   url: PropTypes.string.isRequired,
   politicalLabels: PropTypes.arrayOf(PropTypes.object.isRequired),
   keywords: PropTypes.arrayOf(PropTypes.object.isRequired),
   title: PropTypes.string.isRequired,
   meta: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
   image: PropTypes.string,
   sentiment: PropTypes.number
}

export default sizeMe({ monitorHeight: true })(NewsCard);