// React
import React from 'react';

// Redux Hook
import {useDispatch} from 'redux-react-hook';

import Web3Integrate from './../../../web3-integrate';

// Semantic UI for React
import { Button } from 'semantic-ui-react'

export default ({setStepNum}) => { 

    const getAccounts = async () => {
        await Web3Integrate.callModal();
        return await web3.eth.getAccounts();
    }

    const dispatch = useDispatch();

    const setAccount = (accounts) => {
        dispatch({ type: "Set Current Account", currentAccount: accounts[0] });

        web3.eth.getBalance(accounts[0], function(error, result){
            if(result) {
                dispatch({ type: "Set Account ETH Balance", accountBalanceETH: result / 10**18 });
                dispatch({ type: "Welcome Board Go To Step N", N: 2 });
                dispatch({ type: "Close Welcome Board Loading" });
            }
            if(error) console.log("Something went wrong! Please try again later!: ", error);
        });
    }

    const clickConnectkHandler = (e) => {
        dispatch({ type: "Open Welcome Board Loading" });
        getAccounts().then(async (accounts) => {
            dispatch({ type: "Set Current Network", network: await web3.eth.net.getNetworkType() });
            setAccount(accounts);
        }).catch((error) => {
            dispatch({ type: "Close Welcome Board Loading" });
            console.log("Something went wrong! Please try again later!: ", error)
        });
    }

    return (
        <div>
            <p>Choose a wallet to connect and spin up.</p>
            <Button  className="primary" onClick={clickConnectkHandler}>Connect Wallet</Button>
        </div>
    );
    
}