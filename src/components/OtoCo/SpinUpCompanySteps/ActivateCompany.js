// React
import React from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';
import { useHistory } from "react-router-dom";

// Semantic UI for React
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'

// Smart Contract
import MainContract from '../SmartContracts/MainContract';

import axios from 'axios';

export default () => { 

    const dispatch = useDispatch();
    const history = useHistory();

    const {currentAccount, network} = useMappedState(({accountState}) => accountState)
    const {availableName, jurisdictionSelected, jurisdictionName, currentStep, fastFee, totalCost} = useMappedState(({welcomePanelState}) => welcomePanelState);
    
    const gasCost = 710000;

    const clickCancelHandler = (e) => {
        dispatch({ type: "Resume Welcome Board" });
    }

    const clickActivateHandler = async (e) => {
        dispatch({ type: "Open Welcome Board Loading" });
        let requestInfo = {from: currentAccount, gas:800000};
        try {
            const gasFees = await axios.get(`https://ethgasstation.info/api/ethgasAPI.json`);
            requestInfo.gasPrice = web3.utils.toWei((gasFees.data.fast*0.1).toString(), 'gwei');
        } catch (err){
            console.log('Could not fetch gas fee for transaction.');
        }
        console.log(network, requestInfo)
        MainContract.getContract(network, jurisdictionSelected, jurisdictionName).methods.createSeries(availableName).send(requestInfo, (error, result) => {
            if(error) alert("Something went wrong! Please Try Again Later!")
            else {
                dispatch({ type: "Push Tx", txID: result });
                history.push('/confirmation');
            } 
        });
    }

    React.useEffect(() => {
        // When enter activate page
        async function populateFees(){
            if (currentStep === 2 && fastFee === 0){
                const gasFees = await axios.get(`https://ethgasstation.info/api/ethgasAPI.json`);
                let fee = gasFees.data.fast*0.1;
                let total = web3.utils.toWei((gasCost*fee).toString(), 'gwei');
                total = web3.utils.fromWei(total, 'ether');
                total = total.match(/^-?\d+(?:\.\d{0,3})?/)[0];
                // console.log(gasCost, fee, total)
                dispatch({ type: "Set Fees", fast: fee, total: total });
            }
        }
        populateFees();
    },[])

    return (
        <div>
            <div style={{minHeight: '200px'}}>
            <p className="normal-text">The current deployment cost is aprox. <b>{totalCost} ETH</b>.</p>
            <p className="normal-text">Click `<b>Activate</b>` to spin up `<b>{availableName}</b>` at <b>{jurisdictionName}</b>.</p>
            {/* <p className="normal-text">( Your Current {erc20Symbol} Balance: <b>{accountBalanceERC20} {erc20Symbol}</b> )</p> */}
            </div>
            <p className="align-right">
                <Button id="btn-check-nmae" className="primary" onClick={clickCancelHandler}>Cancel</Button>
                <Button id="btn-check-nmae" className="primary" onClick={clickActivateHandler}>Activate</Button>
            </p>
        </div>
    );
    
}