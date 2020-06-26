import React from 'react'

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Semantic UI for React
import { Button } from 'semantic-ui-react'

export default () => {

    const dispatch = useDispatch();

    const {availableName, waitingTicktoc} = useMappedState(({welcomePanelState}) => welcomePanelState);
    const {id, status} = useMappedState(({txsState}) => txsState);
    const {ownSeriesContracts, network} = useMappedState(({accountState}) => accountState);

    const clickDashboardHandler = async (e) => {
        let accounts = await ethereum.enable();
        dispatch({ type: "Set Current Account", currentAccount: accounts[0] });
        dispatch({ type: "Set Current Network", network: ethereum.networkVersion });
        dispatch({type: 'Hide Error Msg on Welcome Board'});
        dispatch({ type: "Welcome Board Go To Step N", N: 'dashboard' });
    }

    return (
        <div>
            <div style={{textAlign: "left", marginBottom: "100px"}}>
                <h1 className="title">Confirmation</h1>
                <p className="subtitle">Your company <b>{availableName}</b> was validly formed! You can find proof of its existence here:</p>
                <div className="subtitle">
                    Transaction ID: <b>{id}</b>
                    <div style={{marginTop: '10px'}}>
                        <a href={`https://${network === 'kovan' ? 'kovan.' : ''}etherscan.io/tx/${id}`} 
                            target="_blank">View Transaction on Etherscan
                        </a>
                    </div>
                </div>
                <div className="subtitle" style={{marginTop: '20px'}}>
                    Your Company Contract Address: <b>{(ownSeriesContracts.length > 0) ? ownSeriesContracts[ownSeriesContracts.length - 1] : `(${id ? (status === "Confirmed" ? "Confirmed!" : (status === "Pending" ? `Pending for ${waitingTicktoc}s ...` : "Initializing..")) : "Initializing.." })`}</b>
                    <div style={{marginTop: '10px', display: (ownSeriesContracts.length > 0) ? '' : 'none'}}>
                        <a href={`https://${network === 'kovan' ? 'kovan.' : ''}etherscan.io/address/${ownSeriesContracts[ownSeriesContracts.length - 1]}`} 
                            target="_blank">View Contract on Etherscan
                        </a>
                    </div>
                    <Button id="btn-check-nmae" className="ui right floated button primary" type="submit" onClick={clickDashboardHandler} style={{display: (ownSeriesContracts.length > 0) ? '' : 'none'}}>Go to Dashboard</Button>
                </div>
            </div>
            <h2></h2>
            
        </div>
    )
}