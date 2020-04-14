// React
import React, { useState, useEffect } from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Other Libs
import axios from 'axios';

// Components
import Logo from './Logo'
import Step_ActivateCompany from './OtoCo/SpinUpCompanySteps/ActivateCompany'
import Step_ApprovePayment from './OtoCo/SpinUpCompanySteps/ApprovePayment'
import Step_ConnectWallet from './OtoCo/SpinUpCompanySteps/ConnectWallet'
import Step_CheckName from './OtoCo/SpinUpCompanySteps/CheckName'
import Step_Nav from './OtoCo/SpinUpCompanySteps/Nav'
import PublicBetaDisclaimerModal from './PublicBetaDisclaimerModal'

// UI Framework
import { Container, Button, Image, Loader, Icon, Message, Grid } from 'semantic-ui-react'

export default () => {
    const {loading, currentStep, errMsg, availableName, waitingTicktoc} = useMappedState(({welcomePanelState}) => welcomePanelState);
    const {txs} = useMappedState(({txsState}) => txsState);
    const {ownSeriesContracts} = useMappedState(({accountState}) => accountState);
    
    const ConfirmationView = () => (
        <div>
            <div style={{textAlign: "left", marginBottom: "100px"}}>
                <h1 className="title">Confirmation</h1>
                <p className="subtitle">Your company <b>{availableName}</b> was validly formed! You can find proof of its existence here:</p>
                <div className="subtitle">
                    Transaction ID: <b>{(txs[1]) ? txs[1].id : ""}</b>
                    <div style={{marginTop: '10px'}}>
                        ( <a href={`https://kovan.etherscan.io/tx/${(txs[1]) ? txs[1].id : ""}`} 
                            target="_blank">View Transaction on Etherscan
                        </a> )
                    </div>
                </div>
                <div className="subtitle" style={{marginTop: '20px'}}>
                    Your Company Contract Address: <b>{(ownSeriesContracts.length > 0) ? ownSeriesContracts[ownSeriesContracts.length - 1] : `(${(txs[1]) ? (txs[1].status === "Confirmed" ? "Confirmed!" : (txs[1].status === "Pending" ? `Pending for ${waitingTicktoc}s ...` : "Initializing..")) : "Initializing.." })`}</b>
                    <div style={{marginTop: '10px', display: (ownSeriesContracts.length > 0) ? '' : 'none'}}>
                        ( <a href={`https://kovan.etherscan.io/address/${ownSeriesContracts[ownSeriesContracts.length - 1]}`} 
                            target="_blank">View Contract on Etherscan
                        </a> )
                    </div>
                </div>
            </div>
            <h2></h2>
            
        </div>
    )

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
        <div id="welcome-pnl">
            <div className="logo-container">
                <Logo />
            </div>
            <Container className="pnl-body">
                <Loader active={loading} />
                <div style={{display: (currentStep === "ok" ? "none" : "")}}>
                    <div style={{textAlign: "left", marginBottom: "30px"}}>
                        <h1 className="title">Welcome to OtoCo</h1>
                        <p className="subtitle">Instantly spin up your real-world Delaware LLC here.</p>
                        <p className="subtitle">(Please, read our <PublicBetaDisclaimerModal />！)</p>
                        <Message icon style={{ backgroundColor: "transparent", border: "1px solid #eee", lineHeight: "25px" }}>
                            <Icon name='attention notched' />
                            <Message.Content>
                                <Message.Header><b>Before You Getting Started.</b></Message.Header>
                                Current version only supports Kovan Test Network for testing. Check your Metamask and ensure you are on the Kovan Test Network before you getting started.
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
                                            <Icon name='exclamation triangle notched' />
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

                <div style={{display: (currentStep !== "ok" ? "none" : "")}}>
                    <ConfirmationView />
                </div>
                
            </Container>
        </div>
    )

}