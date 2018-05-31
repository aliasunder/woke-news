import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

class AppHeader extends Component {
    render(){
        return (
            <Message color="black" size="massive">
                <Message.Header>
                    Woke News
                </Message.Header>
                <p> Context matters </p>
            </Message>
        )
    }
}

export default AppHeader;