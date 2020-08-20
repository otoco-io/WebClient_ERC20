import React, { useState } from 'react'

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import SharesContract from '../../SmartContracts/ERC20Shares'
import { Button, Icon } from 'semantic-ui-react'

export default () => {

    const dispatch = useDispatch();
    const {sharesStep, manageShares, manageSeries} = useMappedState(({managementState}) => managementState);
    const {network, currentAccount} = useMappedState(({accountState}) => accountState);
    const [owners, setOwners] = useState([]);
    const [creation, setCreation] = useState(null);

    React.useEffect(() => {
        setTimeout( async () => {
            const owns = new Set();
            // Add first owner
            await new Promise( (resolve,reject) => {
                SharesContract.getContract(manageSeries.owner).getPastEvents('OwnershipTransferred',{fromBlock: 0}, async (error, data) => {
                    const timestamp = await web3.eth.getBlock(data[0].blockNumber)
                    setCreation(new Date(timestamp.timestamp * 1000))
                    for (const o of data){
                        owns.add(o.returnValues.newOwner)
                    }
                    console.log(data)
                    resolve();
                });
            })
            // Add all receivers
            await new Promise( (resolve,reject) => {
                SharesContract.getContract(manageSeries.owner).getPastEvents('Transfer',{fromBlock: 0}, (error, data) => {
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
                    balance: await SharesContract.getContract(manageSeries.owner).methods.balanceOf(o).call({from: currentAccount})
                }
                result.push(owner)
            }
            setOwners(result);
        }, 10);
    },[sharesStep])

    const ListItems = () => {
        
        let linkSearch = '';
        if (network === 'kovan') linkSearch = 'https://kovan.etherscan.io/address/';
        if (network === 'main') linkSearch = 'https://etherscan.io/address/';
        console.log(owners)
        return owners.map( (m, idx) =>
            <tr key={idx}>
                <td className="noborder">{m.address}</td>
                <td className="noborder">{m.balance}</td>
                <td className="noborder" style={{textAlign:'center'}}>
                    <a className="primary" href={linkSearch+m.address} target="blank"></a> 
                    <i className="copy link icon"></i>
                </td>
            </tr>
        )
    }

    const handleTransfer = () => {
        var host = window.location.host;
        window.open(`http://${host}/tokens/${manageShares.contract}`, '_blank');
    }

    return (
        <div>
            <div className={`ui ${!owners ? 'active' : 'disabled'} dimmer`}>
                <div className="ui text loader">Loading</div>
            </div>
            {creation && <h4>
                <i class="large ethereum icon"></i>
                Membership tokens were minted on {creation.getUTCDate()}/{creation.getUTCMonth()+1}/{creation.getUTCFullYear()} at {creation.getUTCHours()}:{creation.getUTCMinutes()} UTC 
                with the ticket {manageShares.symbol} and supply of {manageShares.shares}.
            </h4>}
            <p>Membership Token address: {manageShares.contract}</p>
            <p>List of current holders:</p>
            <table className="ui celled table">
                <thead>
                    <tr>
                        <th>Wallet</th>
                        <th>Balance</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <ListItems/>
                </tbody>
            </table>
            <Button className="primary" onClick={handleTransfer}>Transfer Tokens</Button>
        </div>
    )

}