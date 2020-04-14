// React
import React, { useState, useEffect } from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Other Libs
import axios from 'axios';

// Components
import Step_ActivateCompany from './OtoCo/SpinUpCompanySteps/ActivateCompany'
import Step_ApprovePayment from './OtoCo/SpinUpCompanySteps/ApprovePayment'
import Step_ConnectWallet from './OtoCo/SpinUpCompanySteps/ConnectWallet'
import Step_CheckName from './OtoCo/SpinUpCompanySteps/CheckName'
import Step_Nav from './OtoCo/SpinUpCompanySteps/Nav'
import PublicBetaDisclaimerModal from './PublicBetaDisclaimerModal'

// UI Framework
import { Container, Button, Image, Loader, Icon, Message, Grid } from 'semantic-ui-react'

export default () => {
    const {loading, currentStep, errMsg, availableName, waitingTicktoc, showBoard} = useMappedState(({welcomePanelState}) => welcomePanelState);
    const {txs} = useMappedState(({txsState}) => txsState);
    const {newestSeries} = useMappedState(({accountState}) => accountState);

    const dispatch = useDispatch();
    
    const PanelContent = () => {

        if(currentStep === "ok") {
            return (
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
                            Your Company Contract Address: <b>{(newestSeries) ? newestSeries : `(${(txs[1]) ? (txs[1].status === "Confirmed" ? "Confirmed!...Please wait..." : (txs[1].status === "Pending" ? `Pending for ${waitingTicktoc}s ...` : "Initializing..")) : "Initializing.." })`}</b>
                            <div style={{marginTop: '10px', display: (newestSeries) ? '' : 'none'}}>
                                ( <a href={`https://kovan.etherscan.io/address/${newestSeries}`} 
                                    target="_blank">View Contract on Etherscan
                                </a> )
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div style={{textAlign: "left", marginBottom: "100px"}}>
                        <h1 className="title">Welcome to OtoCo</h1>
                        <p className="subtitle">Instantly spin up your real-world Delaware LLC here.</p>
                        <p className="subtitle">(Please, read our <PublicBetaDisclaimerModal />！)</p>
                    </div>
                    
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4} style={{textAlign: "right"}}>

                                <Step_Nav stepNum={currentStep} />

                            </Grid.Column>
                            <Grid.Column width={7} style={{textAlign: "left", minHeight: '280px', }}>
                                <Message negative style={{display: (errMsg.show) ? "" : "none"}}>
                                    <Message.Header>{errMsg.title}</Message.Header>
                                    <p>{errMsg.content}</p>
                                </Message>
                                
                                <StepBoard /> 

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            )
        }
    }

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

    const onCloseClick = () =>  dispatch({type: "WelcomePanel/CLOSE"})
    const BtnCloseBord = () => <Button className="btn-close" circular icon='close' onClick={onCloseClick} />

    return (
        <div id="welcome-pnl" style={{display: (showBoard) ? '' : 'none'}}>
            <BtnCloseBord />
            <Container className="pnl-body">
                <Loader active={loading} />
                <PanelContent />
            </Container>
        </div>
    )

}