// React
import React from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Semantic UI for React
import { Input, Image, Button } from 'semantic-ui-react';

// Smart Contract
import MainContract from '../SmartContracts/MainContract';
import ERC20Contract from '../SmartContracts/ERC20Contract';

export default () => { 

    const dispatch = useDispatch();
    const {currentAccount, accountBalanceERC20, erc20Symbol, erc20SpinUpFee} = useMappedState(({accountState}) => accountState)
    const {availableName, approving, waitingTicktoc} = useMappedState(({welcomePanelState}) => welcomePanelState);
    const {txs} = useMappedState(({txsState}) => txsState);
    
    const clickCancelHandler = (e) => {
        dispatch({ type: "Resume Welcome Board" });
    }

    const clickApproveHandler = (e) => {
        dispatch({ type: "Open Welcome Board Loading" });
        
        MainContract.getContract().methods.seriesFee().call((error, SpinUpFee) => {
            ERC20Contract.getContract().methods.approve(MainContract.getContract().options.address, SpinUpFee).send({from: currentAccount},(error, result) => {
                
                if(result) {
                    dispatch({ type: "Open Welcome Board Approving" });
                    dispatch({ type: "Push Tx", txID: result });
                    function polling() {
                        setTimeout(function(){
                            web3.eth.getTransactionReceipt(result, function(error, tx){
                                console.log("tx_info", tx);
                                if(!tx){
                                    polling();
                                } else { 
                                    dispatch({ type: "Set Tx Pending", idx: 0});
                                    web3.eth.getBlockNumber(function(error, blockNum){
                                        console.log("blockNum", blockNum)
                                        console.log("confirmed", blockNum - tx.blockNumber)
                                        if(blockNum - tx.blockNumber < 1){
                                            dispatch({ type: "Increase Waiting Ticktoc" });
                                            polling();
                                        } else {
                                            dispatch({ type: "Set Tx Confirmed", idx: 0});
                                            dispatch({ type: "Close Welcome Board Loading" });
                                            dispatch({ type: "Welcome Board Go To Step N", N: 3 });
                                            dispatch({ type: "Close Welcome Board Approving" });
                                            dispatch({ type: "Reset Waiting Ticktoc" });
                                        }
                                    })
                                }     
                            })
                        }, 2000);
                    }
                    polling();
                }
                
                if(error) console.log("Something went wrong!", error);
                
            });
        });
    }

    return (
        <div>
            <div style={{display: (approving) ? 'none':''}}>
                <div style={{minHeight: '200px'}}>
                <p className="normal-text">All it takes to activate <b>{availableName}</b> is to send <b>{erc20SpinUpFee} {erc20Symbol}</b> to OtoCo from your connected wallet.</p>
                <p className="normal-text">Approve <b>{erc20SpinUpFee} {erc20Symbol}</b> of total <b>{accountBalanceERC20} {erc20Symbol}</b> available</p>
                <p className="normal-text">From Your Account: {currentAccount}</p>
                <p className="normal-text">To Address: <b>otoco.eth</b></p>
                <p className="normal-text"><a href="#"><b>Terms of Service</b></a></p>
                </div>
                <p className="align-right">
                    <Button id="btn-check-nmae" className="primary" onClick={clickCancelHandler}>Cancel</Button>
                    <Button id="btn-check-nmae" className="primary" onClick={clickApproveHandler}>Approve</Button>
                </p>
            </div>
            <div style={{display: (approving) ? '':'none'}}>
                <p>Waiting the Transaction to be confirmed....</p>
                <p>( { (txs[0]) ? (txs[0].status === "Confirmed" ? "Confirmed! Redirecting.." : (txs[0].status === "Pending" ? `Pending for ${waitingTicktoc}s ...` : "Initializing..")) : "Initializing.." } )</p>
                <p>* Please `<b>DO NOT</b>` Close This Window.</p>
                <p>* If transaction is confirmed, it will go to next step.</p> 
                <div style={{marginTop: '10px'}}>
                    ( <a href={`https://kovan.etherscan.io/tx/${(txs[0]) ? txs[0].id : ""}`} 
                        target="_blank">View Transaction on Etherscan
                    </a> )
                </div>
            </div>
        </div>
    );
    
}