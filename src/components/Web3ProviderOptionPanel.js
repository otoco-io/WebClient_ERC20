import React from 'react';

// Redux
import {useMappedState, useDispatch} from 'redux-react-hook';

// Components
import Button_ConnectMetamask from './OtoCo/UIComponents/Button_ConnectMetamask'

import { Button, Header } from 'semantic-ui-react'


export default () => {

    const {showBoard} = useMappedState(({web3ProviderOptionPanelState}) => web3ProviderOptionPanelState); 
    const {currentAccount} = useMappedState(({accountState}) => accountState); 
    const dispatch = useDispatch();

    const onCloseClick = () =>  dispatch({type: "Web3ProviderOptionPanel/CLOSE"})
    const BtnCloseBoard = () => <Button className="btn-close" circular icon='close' onClick={onCloseClick} />
    const onConnected = () => dispatch({type: "Web3ProviderOptionPanel/CLOSE"});
    const beforeAction = () => console.log("before action");
    const onError = () => console.log("error!!");

    const CurrentBoard = () => {
        if(showBoard && currentAccount === "") {
            return (
                <div id="sign-up-pnl" style={{display: (showBoard) ? '' : 'none'}}>
            
                    <BtnCloseBoard />

                    <div className='sign-up-form-container'>
                        <Header as='h1'>Connect You Wallet</Header>

                        <div>
                            <Header as='h3'>Please Choose Your Wallet Provider Below:</Header>
                            <Button_ConnectMetamask onConnected={onConnected} beforeAction={beforeAction} onError={onError} />
                        </div>
                        
                    </div>
                </div>
            )
        } else {
            return ""
        }
    }

    return <CurrentBoard />
}