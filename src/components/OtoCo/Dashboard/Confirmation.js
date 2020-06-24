import React from 'react'

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

export default () => {

    const {availableName, waitingTicktoc} = useMappedState(({welcomePanelState}) => welcomePanelState);
    const {txs} = useMappedState(({txsState}) => txsState);
    const {ownSeriesContracts} = useMappedState(({accountState}) => accountState);

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
}