import React, { useState } from 'react'

import Card from 'semantic-ui-react/dist/commonjs/views/Card'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'

import {useMappedState} from 'redux-react-hook'

export default (props) => {

    const { network } = useMappedState(({ accountState }) => accountState );

    const [error, setError] = useState(null);
    const [message, setMessage] = useState('Fetching transaction');
    const [exists, setExists] = useState(false);
    const [counter, setCounter] = useState(0);
    const [cost, setCost] = useState(0);
    const [receipt, setReceipt] = useState({});
    const [blockNumber, setBlockNumber] = useState(0);
    const [confirmations, setConfirmations] = useState(0);

    React.useEffect(() => {
        setTimeout( async () => {
            if (confirmations > 0){
                props.callback(receipt)
                return;
            }
            try {
                const transaction = await new Promise((resolve, reject) => {
                    web3.eth.getTransaction(props.hash, (err, tx) => {
                        try { setCost(parseFloat(web3.utils.fromWei(tx.gasPrice))*tx.gas) } catch (err) {}
                        if (err) reject(err)
                        else resolve(tx);
                    });
                })
                const receipt = await new Promise(( resolve, reject) => {
                    web3.eth.getTransactionReceipt(props.hash, (err, tx) => {
                        try { setCost(parseFloat(web3.utils.fromWei(tx.gasPrice))*tx.gas) } catch (err) {}
                        if (err) reject(err)
                        else resolve(tx);
                    })
                })
                if (transaction) setExists(true);
                else setMessage('Fetching transaction')
                if (receipt){
                    setBlockNumber(receipt.blockNumber);
                    web3.eth.getBlockNumber((error, blockNum) => {
                        setConfirmations(Math.max(0,blockNum - receipt.blockNumber))
                        setReceipt(receipt)
                        if (blockNum - receipt.blockNumber <= 0) setMessage('Waiting confirmation')
                        if (blockNum - receipt.blockNumber > 0) setMessage('Transaction confimed')
                    })
                } else setMessage('Waiting to be mined')
            } catch (err) {
                console.log(err)
                if (props.hash.length !== 66){
                    setError('Not a valid transaction hash')
                }
                setTimeout( () => { if (props.error) props.error(err) }, 3000)
            }
            setCounter( counter + 2 );
        }, 2000);
    },[props.hash, counter])

    return (
        <Card className="transaction-card">
            <div className="icons-header">
                <i className="file outline massive icon"></i>
                { error && <i className="big spinner x icon error"></i> }
                { !exists && !error && <i className="big spinner loading icon"></i> }
                { exists && !error && <i className="big check success icon"></i> }
                { confirmations === 0 && !error && <i className="big spinner loading icon"></i> }
                { confirmations > 0 && !error && <i className="big check success icon"></i> }
            </div>
            <Card.Content>
            <Card.Header>{ props.title }</Card.Header>
            <Card.Description>
                <p>Transaction hash: <a href={`https://${network === 'kovan' ? 'kovan.' : ''}etherscan.io/tx/${props.hash}`} target="_blank">
                    { props.hash.substring(0,32) } ...
                </a> <Icon name='copy' /></p>
                <p>Transaction Block: { blockNumber }</p>
                <p>Confirmations: { confirmations }</p>
                <p>Estimated cost: { cost } ETH</p>
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Icon name='clock' /> { counter } seconds ...
            {error && <div style={{float:'right'}}>{error}</div>}
            {!error && <div style={{float:'right'}}>{message}</div>}
            </Card.Content>
        </Card>
    )

}