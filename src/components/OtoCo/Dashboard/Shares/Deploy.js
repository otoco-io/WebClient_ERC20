import React, { useState } from 'react'
// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import Transaction from '../../SmartContracts/Transaction'
import SharesContract from '../../SmartContracts/ERC20Shares'

// Semantic UI for React
import { Input, Label, Message, Button} from 'semantic-ui-react'

export default () => {

    const dispatch = useDispatch();
    const {manageShares, sharesStep} = useMappedState(({managementState}) => managementState);
    const {network, currentAccount} = useMappedState(({accountState}) => accountState);

    const [transaction, setTransaction] = useState(null);

    const clickDeployHandler = async (e) => {
        let requestInfo = {from: currentAccount, gas:800000};
        try {
            const gasFees = await axios.get(`https://ethgasstation.info/api/ethgasAPI.json`);
            requestInfo.gasPrice = web3.utils.toWei((gasFees.data.fast*0.1).toString(), 'gwei');
        } catch (err){
            console.log('Could not fetch gas fee for transaction.');
        }
        console.log(network, requestInfo)
        try {
            const hash = await SharesContract.deployContract(network, currentAccount);
            setTransaction(hash);
        } catch (err) {
            console.log(err);
        }
    }

    const clickBackHandler = () => {
        dispatch({type:'Set Shares Step', step: 0})
    }

    const nextStepHandler = async (logs) => {
        console.log(logs);
        dispatch({type:'Set Shares Contract', contract: logs.contractAddress})
        dispatch({type:'Set Shares Step', step: 2})
    }

    function Form() {
        if (transaction) {
            return <Transaction hash={transaction} callback={nextStepHandler} ></Transaction>;
        }
        return <p>
            <Button className="primary" onClick={clickBackHandler}>Back</Button>
            <Button className="primary" onClick={clickDeployHandler}>Deploy</Button>
        </p>;
    }

    return (
        <div>
            <p>A new token named {manageShares.name}, with symbol {manageShares.symbol} and a total supply of {manageShares.supply} will be deployed.</p>
            <p>Deploy ERC20 token smart contracts containing all company shares.</p>
            <Form></Form>
        </div>
    )

}