import React, { useState } from 'react'

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import Address from '../../UIComponents/Address'
import Transaction from '../../UIComponents/Transaction'
import SeriesContract from '../../SmartContracts/SeriesContract'

// Semantic UI for React
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'

export default () => {

    const dispatch = useDispatch();
    const {manageShares, manageSeries} = useMappedState(({managementState}) => managementState);
    const {currentAccount} = useMappedState(({accountState}) => accountState);
    const [transaction, setTransaction] = useState(null);

    const clickTransferOwnership = async (e) => {
        let requestInfo = {from: currentAccount, gas:800000};
        try {
            const gasFees = await axios.get(`https://ethgasstation.info/api/ethgasAPI.json`);
            requestInfo.gasPrice = web3.utils.toWei((gasFees.data.fast*0.1).toString(), 'gwei');
        } catch (err){
            console.log('Could not fetch gas fee for transaction.');
        }
        SeriesContract.getContract(manageSeries.contract).methods.transferOwnership(manageShares.contract).send(requestInfo, (error, hash) => {
            if (error) alert("Something went wrong! Please Try Again Later!")
            else setTransaction(hash);
        });
    }

    const nextStepHandler = async (logs) => {
        console.log(logs);
        dispatch({type:'Set Shares Step', step: 3})
    }

    function Form() {
        if (transaction) {
            return <Transaction hash={transaction} title="Transfering Ownership" callback={nextStepHandler} ></Transaction>;
        }
        return <div>
            <p style={{paddingTop: '30px'}}>You have successfully deployed shares token.</p>
            <p>Now is time to transfer series ownership to token. So we could track membership shares. <b>This could be undone at any moment as you wish.</b></p>
            <Button className="primary" onClick={clickTransferOwnership}>Transfer Ownership</Button>
        </div>;
    }

    return (
        <div>
            <p>Shares Token address: <Address address={manageShares.contract}></Address></p>
            <Form></Form>
        </div>
    )

}