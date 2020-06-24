import React from 'react'

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Semantic UI for React
import { Button } from 'semantic-ui-react'

export default () => {

    const dispatch = useDispatch();
    const {availableName, waitingTicktoc} = useMappedState(({welcomePanelState}) => welcomePanelState);
    const {txs} = useMappedState(({txsState}) => txsState);
    const {ownSeriesContracts} = useMappedState(({accountState}) => accountState);

    const clickBackHandler = async (e) => {
        await ethereum.enable();
        dispatch({ type: "Welcome Board Go To Step N", N: 0 });
    }

    
    return (
        <div>
            <div style={{textAlign: "left", marginBottom: "100px"}}>
                <h1 className="title">Dashboard</h1>
                <p class="subtitle">Here you can manage your companies.</p>
                <p></p>
                <table class="ui celled table">
                <thead>
                    <tr>
                        <th>name</th>
                        <th>creation date</th>
                        <th>owner</th>
                        <th>contract</th>
                        <th>legal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><button class="ui mini right floated button jurisdiction">DE</button>Doiim LCC</td>
                        <td>10/10/2019 20:20</td>
                        <td>0xE7b73239495a62b6cAD1...</td>
                        <td>0xE7b73239495a62b6cAD1...</td>
                        <td>
                            <button class="ui mini button ui button primary"><i class="download icon"></i>Doc</button>
                            <button class="ui mini button ui button primary"><i class="file icon"></i>Doc</button>
                        </td>
                    </tr>
                </tbody>
                </table>
                <Button id="btn-check-nmae" className="ui right floated button primary" type="submit" onClick={clickBackHandler}>Back</Button>
                {/* <div class="ui active dimmer">
                    <div class="ui indeterminate text loader">Loading Companies</div>
                </div> */}
            </div>
            <h2></h2>
        </div>
    )
}