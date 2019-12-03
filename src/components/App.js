import React from 'react'

// Components
import WelcomePanel from './WelcomePanel'
import Web3ProviderOptionPanel from './Web3ProviderOptionPanel'
import Nav from './Nav'

// Redux
import {useMappedState, useDispatch} from 'redux-react-hook';

import { Card, Container, Image } from 'semantic-ui-react'
import Identicon from 'identicon.js'


export default () => {

    const dispatch = useDispatch();
    const {series, seriesLength} = useMappedState(({accountState}) => accountState); 

    const SeriesCards = () => {
        if (series.length > 0) {
            console.log("seriesLength", seriesLength)
            console.log("series.length", series.length)
            if (seriesLength === series.length) {
                let itms = [];
                console.log("series", series)
                for (let i = 0, len = series.length; i < len; i++) {
                    let currentSeries = series[i];
                    console.log("currentSeries", currentSeries)
                    let imgSrc = new Identicon(currentSeries.address.replace("0x", ""), 70).toString()
                    itms.push(
                        <Card key={`ssitem_${i}`} target="_blank" href={`/.netlify/functions/pdf-generator?address=${currentSeries.address}&name=${currentSeries.name}`}>
                            <Card.Content>
                                <Image
                                floated='left'
                                size='mini'
                                src={`data:image/png;base64,${imgSrc}`}
                                />
                                <Card.Header>{currentSeries.name}</Card.Header>
                                <Card.Meta>{`${currentSeries.address.substring(0,6)}...${currentSeries.address.substring(currentSeries.address.length -4, currentSeries.address.length)}`}</Card.Meta>
                            </Card.Content>
                        </Card>
                    );
                }
                return itms;
            } else {
                return "Loading...Please wait...";
            }
        } else {
            return "Create Your First Company or Connect Your Wallet!!";
        }
    }

    console.log( "ENV Varibles: ", `[ENV: ${process.env.NODE_ENV}, HOST_NAME: ${process.env.REACT_APP_HOST_NAME}, NETLIFY: ${process.env.NETLIFY}]`)

    return (
        <Container fluid>
            <Nav />
            <Card.Group className="series-container">
                <SeriesCards />
            </Card.Group>
            <WelcomePanel />
            <Web3ProviderOptionPanel />
        </Container>
    );
}

