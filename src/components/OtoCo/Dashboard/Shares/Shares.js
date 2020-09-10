import React, { useState } from 'react'

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';
import { useHistory } from "react-router-dom";

import Address from '../../UIComponents/Address'
import UTCDate from '../../UIComponents/UTCDate'
import TokenContract from '../../SmartContracts/OtocoToken'

import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Progress from 'semantic-ui-react/dist/commonjs/modules/Progress'

export default () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const {sharesStep, manageShares, manageSeries} = useMappedState(({managementState}) => managementState);
    const {network, currentAccount} = useMappedState(({accountState}) => accountState);
    const [owners, setOwners] = useState([]);

    React.useEffect(() => {
        setTimeout( async () => {
            const owns = new Set();
            // Add first owner
            console.log('SHARES:', manageShares)
            await new Promise( (resolve,reject) => {
                TokenContract.getContract(manageShares.contract).getPastEvents('Initialized',{fromBlock: 0}, async (error, data) => {
                    const timestamp = await web3.eth.getBlock(data[0].blockNumber)
                    dispatch({type:'Set Shares Creation', creation:new Date(timestamp.timestamp * 1000)})
                    for (const o of data){
                        owns.add(o.returnValues.member)
                    }
                    resolve();
                });
            })
            // Add all receivers
            await new Promise( (resolve,reject) => {
                TokenContract.getContract(manageShares.contract).getPastEvents('Transfer',{fromBlock: 0}, (error, data) => {
                    for (const o of data){
                        owns.add(o.returnValues.to)
                    }
                    resolve();
                });
            })
            const result = [];
            for (const o of [...owns]){
                let owner = {
                    address: o,
                    balance: await TokenContract.getContract(manageShares.contract).methods.balanceOf(o).call({from: currentAccount})
                }
                result.push(owner)
            }
            setOwners(result);
        }, 0);
    },[])

    const ListOwners = () => {
        return owners.map( (m, idx) =>
            <tr key={idx}>
                <td className="noborder"><Address address={m.address}></Address></td>
                <td className="noborder">{m.balance}</td>
                <td>
                    <Progress percent={((m.balance/manageShares.shares)*100).toFixed(2)} progress style={{margin:'0px'}} />
                </td>
            </tr>
        )
    }

    const clickCopyHandler = (info) => {
        let link = ''
        if (network === 'ropsten') link = 'https://ropsten.etherscan.io/address/';
        if (network === 'kovan') link = 'https://kovan.etherscan.io/address/';
        if (network === 'main') link = 'https://etherscan.io/address/';
        link += info;
        window.open(link,'_blank');
    }

    const clickTransferHandler = async (e) => {
        history.push(`/tokens/${manageShares.contract}`);
    }

    return (
        <div>
            <div className={`ui ${!owners ? 'active' : 'disabled'} dimmer`}>
                <div className="ui text loader">Loading</div>
            </div>
            {manageShares.creation && <h4>
                A total of {manageShares.shares} {manageShares.name} with symbol {manageShares.symbol} were minted on <UTCDate separator="at" date={manageShares.creation}></UTCDate>.
            </h4>}
            <p>{manageShares.symbol} token address: <Address address={manageShares.contract}></Address></p>
            <p>List of current holders:</p>
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th style={{width:'30%'}}>Wallet</th>
                        <th style={{width:'20%'}}>Balance</th>
                        <th style={{width:'50%'}}></th>
                    </tr>
                </thead>
                <tbody>
                    <ListOwners/>
                </tbody>
            </table>
            <Button className="primary" onClick={clickTransferHandler}>Transfer Tokens</Button>
            <Button className="primary" onClick={clickCopyHandler.bind(undefined, manageShares.contract)}>View token on Etherscan</Button>
            <p style={{margin: '80px'}}></p>
        </div>
    )

}