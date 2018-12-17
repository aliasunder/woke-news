import React from 'react';
import { Message } from 'semantic-ui-react';

export const AppHeader = (props) => {
   return (
      <Message color="black" size="massive" style={{ textAlign: 'center' }}>
      <Message.Header as={ 'h1' }>
         Woke News
      </Message.Header>
         <p> Context matters </p>
      </Message>
   )
}
