import React from 'react';
import { Message } from 'semantic-ui-react';

const AppHeader = (props) => {
   return (
      <Message color="black" size="massive" style={{ textAlign: 'center' }}>
      <Message.Header>
         Woke News
      </Message.Header>
         <p> Context matters </p>
      </Message>
   )
}

export default AppHeader;