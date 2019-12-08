import React from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import { Button } from 'semantic-ui-react'

import Logo from './Logo'
import MySeriesDropdown from './OtoCo/UIComponents/MySeriesDropdown'


export default () => {

    // const {showBoard} = useMappedState(({welcomePanelState}) => welcomePanelState); 
    // const {showBoard} = useMappedState(({signInPanelState}) => signInPanelState); 
    const {currentAccount} = useMappedState(({accountState}) => accountState);
    const dispatch = useDispatch();

    const onGettingStarted_Click = () => dispatch({type: "WelcomePanel/OPEN"})
    const onConnect_Click = () => dispatch({type: "Web3ProviderOptionPanel/OPEN"})
    const onSignOut_Click = () => dispatch({type: "Account/SIGN_OUT"})

    return (
        <div className="nav clearfix">
            
            <div className="left-group">
                <Logo />
                <MySeriesDropdown />
            </div>
            
            <div className="right-group">
                <Button inverted color='teal' onClick={onGettingStarted_Click}>
                    Getting Started
                </Button>
                <Button inverted color='brown' onClick={onConnect_Click} style={{display: (currentAccount !== "") ? 'none' : ''}}>
                    Connect
                </Button>
                <Button inverted color='red' onClick={onSignOut_Click} style={{display: 'none'}}>
                    Sign Out
                </Button>
                <span style={{display: (currentAccount !== "") ? '' : 'none'}}>&nbsp;&nbsp;&nbsp;&nbsp; Hi, {currentAccount}</span>
            </div>
        </div>
    )
}
    