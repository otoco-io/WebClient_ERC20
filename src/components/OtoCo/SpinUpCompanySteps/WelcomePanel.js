// React
import React, { useState, useEffect } from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';
import { useHistory, Link } from "react-router-dom";

// Components
import Logo from '../../Logo'
import Step_ActivateCompany from './ActivateCompany'
// import Step_ApprovePayment from './OtoCo/SpinUpCompanySteps/ApprovePayment'
import Step_ConnectWallet from './ConnectWallet'
import Step_CheckName from './CheckName'
import Step_Nav from './Nav'
import Confirmation from '../Dashboard/Confirmation'
import Dashboard from '../Dashboard/Dashboard'
import PublicBetaDisclaimerModal from '../UIComponents/PublicBetaDisclaimerModal'

// UI Framework
import { Container, Button, Image, Loader, Icon, Message, Grid } from 'semantic-ui-react'

export default () => {
    const {loading, currentStep, errMsg} = useMappedState(({welcomePanelState}) => welcomePanelState);
    const history = useHistory();

    const StepBoard = () => {
        switch (currentStep) {
            case 1: 
                return <Step_ConnectWallet />
            // case 2: 
            //     return <Step_ApprovePayment />
            case 2: 
                return <Step_ActivateCompany />
            default:
                return (
                    <Step_CheckName />
                ) 
        }
    }

    return (
        <Container className="pnl-body">
            <Loader active={loading} style={{'z-index': 0}} />
            <div style={{display: (typeof currentStep === 'string' ? "none" : "")}}>
                <div style={{textAlign: "left", marginBottom: "30px"}}>
                    <h1 className="title">Welcome to OtoCo</h1>
                    <p className="subtitle">Instantly spin up your real-world LLC here.</p>
                    <Message icon style={{ backgroundColor: "transparent", border: "1px solid #eee", lineHeight: "25px" }}>
                        <Icon name='attention notched' />
                        <Message.Content>
                            <Message.Header><b>Before You Start</b></Message.Header>
                            Current version only supports Main and Kovan Test Network. Please check your dapp browser to make sure you are connected to the correct one.
                            (Read our <Link to="/terms">Terms of Use</Link>！)
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

            <div style={{display: (currentStep !== "confirmation" ? "none" : "")}}>
                <Confirmation />
            </div>
            
        </Container>
    )

}