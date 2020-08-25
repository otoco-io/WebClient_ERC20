import React, { useState } from 'react'
// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import Transaction from '../../SmartContracts/Transaction'
import SharesContract from '../../SmartContracts/ERC20Shares'

// Semantic UI for React
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'

export default () => {

    const dispatch = useDispatch();
    const {manageShares, manageSeries} = useMappedState(({managementState}) => managementState);
    const {network, currentAccount} = useMappedState(({accountState}) => accountState);

    const [transaction, setTransaction] = useState(null);

    const clickUnlinkHandler = async (e) => {
        let requestInfo = {from: currentAccount, gas:800000};
        try {
            const gasFees = await axios.get(`https://ethgasstation.info/api/ethgasAPI.json`);
            requestInfo.gasPrice = web3.utils.toWei((gasFees.data.fast*0.1).toString(), 'gwei');
        } catch (err){
            console.log('Could not fetch gas fee for transaction.');
        }
        console.log(network, requestInfo)
        SharesContract.getContract(manageShares.contract).methods.transferSeriesOwnership().send({from:currentAccount}, (error, hash) => {
            if (error) alert('Some problem has occurred, check your balance.');
            else setTransaction(hash);
        })
    }

    const clickBackHandler = () => {
        dispatch({type:'Set Shares Step', step: 3})
    }

    const nextStepHandler = () => {
        dispatch({type:'Set Shares Step', step: 0})
    }

    function Form() {
        if (transaction) {
            return <Transaction hash={transaction} callback={nextStepHandler} ></Transaction>;
        }
        return <p>
            <Button className="primary" onClick={clickBackHandler}>Back</Button>
            <Button className="red" onClick={clickUnlinkHandler}>Unlink Tokens</Button>
        </p>;
    }

    return (
        <div>
            <p></p>
            {manageShares.creation && <h4>
                <i class="big ethereum icon" style={{float: 'left'}}></i>
                Membership tokens were minted on {manageShares.creation.getUTCDate()}/{manageShares.creation.getUTCMonth()+1}/{manageShares.creation.getUTCFullYear()} at {manageShares.creation.getUTCHours()}:{manageShares.creation.getUTCMinutes()} UTC 
                with the ticket {manageShares.symbol} and a total supply of {manageShares.shares}.
            </h4>}
            <p>{manageShares.symbol} token address: {manageShares.contract}</p>
            <Message icon style={{ backgroundColor: "transparent", border: "1px solid #eee", lineHeight: "25px" }}>
                <Icon name='attention notched' />
                <Message.Content>
                    <Message.Header><b>Before You Proceed</b></Message.Header>
                    This procedure will unlink your tokens from your series. Will turn tokens useless..
                </Message.Content>
            </Message>
            <Form></Form>
        </div>
    )

}