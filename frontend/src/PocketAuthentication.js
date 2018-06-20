import React, { Component } from 'react';
import axios from 'axios';
import config from './config.json';

/* class PocketAuthentication extends Component {
    logInWithPocket = ()=>{
        const pocketUrl = 'https://getpocket.com/v3/oauth/request'
        redirectUri = 'http://localhost:3000/'

        let pocketOptions = {
            headers: {
                'Content-Type':  'application/x-www-form-urlencoded; charset=UTF8',
                'X-Accept': 'application/x-www-form-urlencoded',
            },
            params: {
                'consumer_key': config.pocketKey,
                'redirect-uri': redirectUri,
                'code': config.pocketCode,
                'access_token': ''
            }
        }

        let pocketRedirect = 'https://getpocket.com/auth/authorize?request_token=' + config.code + '&redirect_uri=' + redirectUri

        axios.post(pocketURL, pocketOptions)
    }
    render() { 

        return (  )
    }
}

*/
 
export default PocketAuthentication;