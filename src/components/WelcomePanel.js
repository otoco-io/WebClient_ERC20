// React
import React, { useState, useEffect } from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Other Libs
import axios from 'axios';

// Components
import Logo from './Logo'
import Step_ActivateCompany from './OtoCo/SpinUpCompanySteps/ActivateCompany'
// import Step_ApprovePayment from './OtoCo/SpinUpCompanySteps/ApprovePayment'
import Step_ConnectWallet from './OtoCo/SpinUpCompanySteps/ConnectWallet'
import Step_CheckName from './OtoCo/SpinUpCompanySteps/CheckName'
import Step_Nav from './OtoCo/SpinUpCompanySteps/Nav'
import Confirmation from './OtoCo/Dashboard/Confirmation'
import Dashboard from './OtoCo/Dashboard/Dashboard'
import PublicBetaDisclaimerModal from './PublicBetaDisclaimerModal'

// UI Framework
import { Container, Button, Image, Loader, Icon, Message, Grid } from 'semantic-ui-react'

export default () => {
    const {loading, currentStep, errMsg, availableName, waitingTicktoc} = useMappedState(({welcomePanelState}) => welcomePanelState);
    const {txs} = useMappedState(({txsState}) => txsState);
    const {ownSeriesContracts} = useMappedState(({accountState}) => accountState);

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
        <div id="welcome-pnl">
            <div className="logo-container">
                <Logo />
            </div>
            <Container className="pnl-body">
                <Loader active={loading} />
                <div style={{display: (typeof currentStep === 'string' ? "none" : "")}}>
                    <div style={{textAlign: "left", marginBottom: "30px"}}>
                        <h1 className="title">Welcome to OtoCo</h1>
                        <p className="subtitle">Instantly spin up your real-world LLC here.</p>
                        <Message icon style={{ backgroundColor: "transparent", border: "1px solid #eee", lineHeight: "25px" }}>
                            <Icon name='attention notched' />
                            <Message.Content>
                                <Message.Header><b>Before You Start</b></Message.Header>
                                Current version only supports Main and Kovan Test Network. Please check your Metamask to make sure you are connected to the correct one.
                                {/* (Read our <PublicBetaDisclaimerModal />！) */}
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

                <div style={{display: (currentStep !== "dashboard" ? "none" : "")}}>
                    <Dashboard />
                </div>
                
            </Container>
        </div>
    )

}