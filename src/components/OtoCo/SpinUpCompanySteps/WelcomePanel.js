// React
import React, { useState, useEffect } from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';
import { useHistory, Link } from "react-router-dom";

// Components
import Step_ActivateCompany from './ActivateCompany'
import Step_ConnectWallet from './ConnectWallet'
import Step_ApprovePayment from './ApprovePayment'
import Step_CheckName from './CheckName'
import Step_Nav from './Nav'

// UI Framework
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'

export default () => {
    const {loading, currentStep, errMsg} = useMappedState(({welcomePanelState}) => welcomePanelState);
    const history = useHistory();

    const StepBoard = () => {
        switch (currentStep) {
            case 1: 
                return <Step_ConnectWallet />
            case 2: 
                return <Step_ApprovePayment />
            case 3: 
                return <Step_ActivateCompany />
            default:
                return (
                    <Step_CheckName />
                ) 
        }
    }

    return (
        <Container className="pnl-body">
            <Loader active={loading} style={{zIndex: 0}} />
            <div style={{display: (typeof currentStep === 'string' ? "none" : "")}}>
                <div style={{textAlign: "left", marginBottom: "30px"}}>
                    <h1 className="title">Welcome to OtoCo</h1>
                    <p className="subtitle">Instantly spin up your real-world LLC here.</p>
                    <Message icon style={{ backgroundColor: "transparent", border: "1px solid #eee", lineHeight: "25px" }}>
                        <Icon name='attention notched' />
                        <Message.Content>
                            <Message.Header><b>Before You Start</b></Message.Header>
                            OtoCo is live on the Ethereum Mainnet. Please use a Web3 compatible browser like Opera, or a Web3 extension like MetaMask. Activating a company using OtoCo will create a valid legal entity.  PLEASE READ OUR <Link to="/terms">TERMS OF USE</Link>.
                        </Message.Content>
                    </Message>
                </div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4} style={{textAlign: "right"}}>

                            <Step_Nav stepNum={currentStep} />

                        </Grid.Column>
                        <Grid.Column width={7} style={{textAlign: "left", minHeight: '280px', }}>
                            <Message style={{ display: (errMsg.show) ? "" : "none", backgroundColor: "transparent", padding: "0px"}}>
                                
                                <Message.Content>
                                    <Message.Header style={{ color: "#f71100" }}>
                                        <Icon name='exclamation triangle' />
                                        &nbsp;&nbsp;
                                        {errMsg.title}
                                    </Message.Header>
                                </Message.Content>
                            </Message>
                            
                            <StepBoard /> 

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </Container>
    )

}