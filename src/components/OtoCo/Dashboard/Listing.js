import React, { useState } from 'react'

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';
import { useHistory } from "react-router-dom";

// Semantic UI for React
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container'

// Smart Contract
import Management from './Management';
import MainContract from '../SmartContracts/MainContract';
import SeriesContract from '../SmartContracts/SeriesContract';
import Address from '../UIComponents/Address';
import UTCDate from '../UIComponents/UTCDate';
import Web3Integrate from '../../../web3-integrate';

const ListItem = ({series, managing}) => {

    const dispatch = useDispatch();

    return (
        <tr key={series.contract} className={managing ? 'selected' : ''}>
            <td className="name">{series.name}</td>
            <td><button className="ui mini button jurisdiction">{series.jurisdiction}</button></td>
            <td><UTCDate separator="" date={series.created}></UTCDate></td>
            <td><Address address={series.owner}></Address></td>
            <td><Address address={series.contract}></Address></td>
            <td style={{textAlign:'center'}}>
                { !managing && <Button className="primary mini" onClick={dispatch.bind(undefined, { type: "Select Manage Series", series:series })}><i className="cog icon" ></i> Manage</Button>}
                { managing &&  <Button className="primary mini" onClick={dispatch.bind(undefined, { type: "Clear Manage Series"})}><i className="close icon" ></i> Close</Button>}
            </td>
        </tr>
    )
}

const List = React.memo(({contracts, selected}) => {
    const managingIndex = contracts.findIndex(s => s.contract == selected)
    const series = contracts.map( (s) => <ListItem series={s} key={s.contract} managing={s.contract == selected}></ListItem> )
    if (managingIndex >= 0) series.splice(managingIndex+1, 0, <Management/>)
    return series
})

export default () => {

    const dispatch = useDispatch();
    const {ownSeriesContracts} = useMappedState(({dashboardState}) => dashboardState);
    const {manageSeries} = useMappedState(({managementState}) => managementState);

    return (
        <div className="animate-fade">
            <table className="ui celled table" style={{ display: (ownSeriesContracts.length > 0) ? "" : "none"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Jurisdiction</th>
                        <th>Creation date</th>
                        <th>Owner</th>
                        <th>Contract</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <List contracts={ownSeriesContracts} selected={manageSeries.contract}></List>
                </tbody>
            </table>
        </div>
    )
}
