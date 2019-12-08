import React from 'react'

// Components
import WelcomePanel from './WelcomePanel'
import Web3ProviderOptionPanel from './Web3ProviderOptionPanel'
import Nav from './Nav'

import { Container } from 'semantic-ui-react'


export default () => {

    console.log( "ENV Varibles: ", `[ENV: ${process.env.NODE_ENV}, HOST_NAME: ${process.env.REACT_APP_HOST_NAME}, NETLIFY: ${process.env.NETLIFY}]`)

    return (
        <Container fluid>
            <Nav />
            <WelcomePanel />
            <Web3ProviderOptionPanel />
        </Container>
    );
}

