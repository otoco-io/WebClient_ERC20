import React from 'react'

// Components
import WelcomePanel from './WelcomePanel'
import Web3ProviderOptionPanel from './Web3ProviderOptionPanel'
import Nav from './Nav'

// Redux
import {useMappedState, useDispatch} from 'redux-react-hook';

// Firebase
// import { myFirebase } from "../firebase/firebase";

import { Card, Container, Image } from 'semantic-ui-react'
import Identicon from 'identicon.js'


export default () => {

    const dispatch = useDispatch();
    const {series, seriesLength} = useMappedState(({accountState}) => accountState); 

    /* myFirebase.auth().onAuthStateChanged(function(user) {

        console.log("Trigger Auth state change")
    
        if (user) {
            // User is signed in.
            dispatch({type: "Account/SIGNEDIN", user_email: user.email + "(Verified: " + user.emailVerified + ")"})
            // console.log("Signed In \n(UID: " + user.uid + ") \nEmail : " + user.email )
        } else {
            // No user is signed in.
            console.log("Non-Signed-In")
        }
    }); 

    // Confirm the link is a sign-in with email link.
    if (myFirebase.auth().isSignInWithEmailLink(window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        var email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        myFirebase.auth().signInWithEmailLink(email, window.location.href)
        .then(function(result) {
            // Clear email from storage.
            // window.localStorage.removeItem('emailForSignIn');
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser

        })
        .catch(function(error) {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
        });
    }*/

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

