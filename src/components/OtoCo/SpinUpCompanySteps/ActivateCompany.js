// React
import React from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Semantic UI for React
import { Input, Image, Button } from 'semantic-ui-react';

// Smart Contract
import MainContract from '../SmartContracts/MainContract';

import axios from 'axios';

export default () => { 

    const dispatch = useDispatch();
    const {currentAccount, network, erc20Symbol, accountBalanceERC20} = useMappedState(({accountState}) => accountState)
    const {availableName, jurisdictionSelected, jurisdictionName, currentStep, fastFee, totalCost} = useMappedState(({welcomePanelState}) => welcomePanelState);
    
    const gasCost = 710000;

    const clickCancelHandler = (e) => {
        dispatch({ type: "Resume Welcome Board" });
    }

    const clickActivateHandler = async (e) => {
        dispatch({ type: "Open Welcome Board Loading" });
        let requestInfo = {from: currentAccount, gas:2000000};
        try {
            const gasFees = await axios.get(`https://ethgasstation.info/api/ethgasAPI.json`);
            requestInfo.gasPrice = web3.utils.toWei((gasFees.data.fast*0.1).toString(), 'gwei');
        } catch (err){
            console.log('Could not fetch gas fee for transaction.');
        }
        console.log(network, requestInfo)
        MainContract.getContract(network, jurisdictionSelected, jurisdictionName).methods.createSeries(availableName).send(requestInfo, function(error, result){
            if(error) alert("Something went wrong! Please Try Again Later!")
            else {
                // dispatch({ type: "Close Welcome Board Loading" });
                dispatch({ type: "Push Tx", txID: result });
                dispatch({ type: "Welcome Board Go To Step N", N: "confirmation" });
                function polling() {
                    setTimeout(function(){
                        web3.eth.getTransactionReceipt(result, function(error, tx){
                            console.log("tx_info", tx);
                            if(!tx){
                                polling();
                            } else { 
                                dispatch({ type: "Set Tx", status: "Pending"});
                                web3.eth.getBlockNumber(function(error, blockNum){
                                    console.log("blockNum", blockNum)
                                    console.log("confirmed", blockNum - tx.blockNumber)
                                    if(blockNum - tx.blockNumber < 1){
                                        dispatch({ type: "Increase Waiting Ticktoc" });
                                        polling();
                                    } else {
                                        dispatch({ type: "Set Tx", status: "Confirmed"});
                                        dispatch({ type: "Close Welcome Board Loading" });
                                        MainContract.getContract(network,jurisdictionSelected).methods.mySeries().call({from: currentAccount}, function(error, ss){
                                            console.log(ss)
                                            if(ss) dispatch({ type: "Set Own Company Contracts", ownSeriesContracts: ss });
                                            if(error) alert("Something went wrong!!!!");
                                        })
                                    }
                                })

                            }
                            
                        })
                    }, 2000);
                }
                polling();
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
    },[currentStep])

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