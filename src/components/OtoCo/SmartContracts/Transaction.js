import React, { useState } from 'react'
import { Card, Icon, Popup } from 'semantic-ui-react'
import {useMappedState} from 'redux-react-hook'

export default (props) => {

    const { network } = useMappedState(({ accountState }) => accountState );

    const title = 'Deploying Series Contract';
    const [error, setError] = useState(false);
    const [exists, setExists] = useState(false);
    const [counter, setCounter] = useState(0);
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
                        if (err) reject(err)
                        else resolve(tx);
                    });
                })
                const receipt = await new Promise(( resolve, reject) => {
                    web3.eth.getTransactionReceipt(props.hash, (err, tx) => {
                        if (err) reject(err)
                        else resolve(tx);
                    })
                })
                if (transaction) setExists(true);
                if (receipt){
                    setBlockNumber(receipt.blockNumber);
                    web3.eth.getBlockNumber((error, blockNum) => {
                        setConfirmations(Math.max(0,blockNum - receipt.blockNumber))
                        setReceipt(receipt)
                    })
                }
            } catch (err) {
                setError(true);
                setTimeout( () => { if (props.error) props.error(err) }, 2000)
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
            <Card.Header>{ title }</Card.Header>
            <Card.Description>
                <p>Transaction hash: <a href={`https://${network === 'kovan' ? 'kovan.' : ''}etherscan.io/tx/${props.hash}`} target="_blank">
                    { props.hash.substring(0,32) } ...
                </a> <Icon name='copy' /></p>
                <p>Transaction Block: { blockNumber }</p>
                <p>Confirmations: { confirmations }</p>
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Icon name='clock' /> { counter } seconds ...
            </Card.Content>
        </Card>
    )

}