import React, { useState } from 'react'

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';
import { Progress, Button, Input, Container, Label } from 'semantic-ui-react'

import SharesContract from './SmartContracts/ERC20Shares'
import Transaction from './SmartContracts/Transaction'
import Web3Integrate from '../../web3-integrate';
import { matchPath } from 'react-router-dom';

export default (props) => {

    const { match } = props

    const dispatch = useDispatch();
    const {manageShares} = useMappedState(({managementState}) => managementState);
    const {network, currentAccount} = useMappedState(({accountState}) => accountState);
    const [balance, setBalance] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const [error, setError] = useState(null);
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');

    React.useEffect(() => {
        setTimeout( async () => {
            if (network === ''){
                try {
                    await Web3Integrate.callModal();
                    let accounts =  await web3.eth.getAccounts();
                    dispatch({ type: "Set Current Account", currentAccount: accounts[0] });
                    dispatch({ type: "Set Current Network", network: await web3.eth.net.getNetworkType() })
                    dispatch({type:'Set Shares Contract', contract: match.params.contract})
                    dispatch({type:'Set Shares Config', token:{
                        name: await SharesContract.getContract(match.params.contract).methods.name().call({from: accounts[0]}),
                        symbol: await SharesContract.getContract(match.params.contract).methods.symbol().call({from: accounts[0]}),
                        shares: await SharesContract.getContract(match.params.contract).methods.totalSupply().call({from: accounts[0]}),
                    }})
                    setBalance(await SharesContract.getContract(match.params.contract).methods.balanceOf(accounts[0]).call({from: accounts[0]}));
                    
                } catch (err) {
                    console.log(err)
                }
            }
        }, 10);
    },[balance])

    const sendTransaction = async () => {
        try {
            SharesContract.getContract(match.params.contract).methods.transfer(to, amount).send({from: currentAccount}, (error, hash) => {
                if (error) alert("Something went wrong! Check parameters and connection!")
                else setTransaction(hash);
            });
        } catch {
            alert("Something went wrong! Check parameters and connection!")
        }
    }

    const clearTransaction = async () => {
        setBalance(await SharesContract.getContract(match.params.contract).methods.balanceOf(currentAccount).call({from: currentAccount}));
        setTransaction(null);
    }

    const handleChangeAmount = (event) => {
        setAmount(event.target.value);
    }

    const handleChangeTo = (event) => {
        setTo(event.target.value);
    }

    return (
        <Container className="pnl-body">
            <div style={{textAlign: "left", marginBottom: "100px"}}>
                <h1>Token Transfer Tool</h1>
                <h3>Here you can transfer your membership tokens.</h3>
                { balance && <div>
                    <h2>{manageShares.symbol} - {manageShares.name}</h2>
                    <p>Total Supply: {manageShares.shares}</p>
                </div>}
                { balance && !transaction && <p>Your balance: {balance}</p>}
                { balance && !transaction && <div>Your Membership Percentage: <Progress percent={((balance/manageShares.shares)*100).toFixed(2)} progress style={{width: '50%'}} /></div>}
                { balance && !transaction && <div style={{width: '50%', display:'block'}}>
                    <Input 
                        type='text' 
                        className="token-input-container"
                        labelPosition='left'
                        defaultValue=''
                        onChange={handleChangeTo}
                    >
                        <input className="placeholder" />
                        <Label basic>To</Label>
                    </Input>
                    <Input 
                        type='text' 
                        className="token-input-container"
                        type='number' 
                        labelPosition='left' 
                        defaultValue={0}
                        max={balance}
                        onChange={handleChangeAmount}
                    >
                        <input className="placeholder" />
                        <Label basic>Amount</Label>
                    </Input>
                    <p><Button className="primary" onClick={sendTransaction}>Transfer Tokens</Button></p>
                </div>}
                { transaction && <Transaction hash={transaction} title="Transfer Token" callback={clearTransaction} ></Transaction> }
                <div className="ui active centered inline text loader" style={{ display: (!balance) ? "" : "none", zIndex : 0 }}>Loading Data</div>
            </div>
        </Container>
    )

}