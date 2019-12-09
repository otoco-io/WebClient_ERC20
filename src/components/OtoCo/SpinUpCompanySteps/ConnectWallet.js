// React
import React from 'react';

// Components
import Button_ConnectMetamask from '../UIComponents/Button_ConnectMetamask'

import {useMappedState, useDispatch} from 'redux-react-hook';

// Smart Contract
import MainContract from '../SmartContracts/MainContract';

export default () => { 

    const {currentAccount} = useMappedState(({accountState}) => accountState);
    const dispatch = useDispatch();

    const onConnected = () => {
        // alert("Connected");
        dispatch({ type: "Welcome Board Go To Step N", N: 2 });
    }

    if(currentAccount === "") {
        return (
            <div>
                <Button_ConnectMetamask onConnected={onConnected} />
            </div>
        );
    } else {
        dispatch({ type: "Welcome Board Go To Step N", N: 2 });
        
        return (
            <div> Loading... </div>
        );
    }

    
    
}