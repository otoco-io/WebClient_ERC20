// React
import React from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Semantic UI for React
import { Input, Image, Button } from 'semantic-ui-react';

// Smart Contract
import MainContract from '../SmartContracts/MainContract';

export default () => { 

    const dispatch = useDispatch();
    const {currentAccount, erc20Symbol, accountBalanceERC20} = useMappedState(({accountState}) => accountState)
    const {availableName} = useMappedState(({welcomePanelState}) => welcomePanelState);
    
    const clickCancelHandler = (e) => {
        dispatch({ type: "Resume Welcome Board" });
    }

    const clickActivateHandler = (e) => {
        dispatch({ type: "Open Welcome Board Loading" });
        MainContract.getContract().methods.createSeries(availableName).send({from: currentAccount}, function(error, result){
            if(error) alert("Something went wrong! Please Try Again Later!")
            else {
                // dispatch({ type: "Close Welcome Board Loading" });
                dispatch({ type: "Push Tx", txID: result });
                dispatch({ type: "Welcome Board Go To Step N", N: "ok" });
                function polling() {
                    setTimeout(function(){
                        web3.eth.getTransactionReceipt(result, function(error, tx){
                            console.log("tx_info", tx);
                            if(!tx){
                                polling();
                            } else { 
                                dispatch({ type: "Set Tx Pending", idx: 1});
                                web3.eth.getBlockNumber(function(error, blockNum){
                                    console.log("blockNum", blockNum)
                                    console.log("confirmed", blockNum - tx.blockNumber)
                                    if(blockNum - tx.blockNumber < 1){
                                        dispatch({ type: "Increase Waiting Ticktoc" });
                                        polling();
                                    } else {
                                        dispatch({ type: "Set Tx Confirmed", idx: 1});
                                        dispatch({ type: "Close Welcome Board Loading" });
                                        /* MainContract.getContract().methods.mySeries().call({from: currentAccount}, function(error, ss){
                                            console.log(ss)
                                            if(ss) dispatch({ type: "Set Own Company Contracts", ownSeriesContracts: ss });
                                            if(error) alert("Something went wrong!!!!");
                                        }) */
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

    return (
        <div>
            <div style={{minHeight: '200px'}}>
            <p className="normal-text">Click `<b>Activate</b>` to spin up `<b>{availableName}</b>`.</p>
            <p className="normal-text">( Your Current {erc20Symbol} Balance: <b>{accountBalanceERC20} {erc20Symbol}</b> )</p>
            <p className="normal-text"><a href="#"><b>Terms of Service</b></a></p>
            </div>
            <p className="align-right">
                <Button id="btn-check-nmae" className="primary" onClick={clickCancelHandler}>Cancel</Button>
                <Button id="btn-check-nmae" className="primary" onClick={clickActivateHandler}>Activate</Button>
            </p>
        </div>
    );
    
}