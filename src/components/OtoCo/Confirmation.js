import React from 'react'

// Redux Hook
import {useMappedState, useDispatch} from 'redux-react-hook';
import { useHistory } from "react-router-dom";

// Semantic UI for React
import { Button, Container } from 'semantic-ui-react'

import Transaction from './SmartContracts/Transaction'

export default () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {availableName} = useMappedState(({welcomePanelState}) => welcomePanelState);
    const {id} = useMappedState(({txsState}) => txsState);

    const clickDashboardHandler = async (e) => {
        dispatch({ type: "Resume Welcome Board" });
        history.push("/dashboard");
    }

    const errorHandler = async (e) => {
        dispatch({ type: "Resume Welcome Board" });
        history.push("/");
    }

    return (
        <Container className="pnl-body">
            <div style={{textAlign: "left", marginBottom: "100px"}}>
                <h1 className="title">Confirmation</h1>
                <p className="subtitle">Your company <b>{availableName}</b> was validly formed! Once deployed you will be redirected to Dashboard...</p>
                <div class="ui two column centered grid">
                    <div class="column">
                        <Transaction hash={id} title="" callback={clickDashboardHandler} error={errorHandler}></Transaction>
                        {/* <Button id="btn-check-nmae" className="ui right floated button primary" type="submit" onClick={clickDashboardHandler} style={{display: (ownSeriesContracts.length > 0) ? '' : 'none'}}>Go to Dashboard</Button> */}
                    </div>
                </div>
            </div>
        </Container>
    )
}