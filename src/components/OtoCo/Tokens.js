import React, { useState } from 'react'
import ENS from 'ethereum-ens';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';
import { useHistory } from "react-router-dom";

import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Input from 'semantic-ui-react/dist/commonjs/elements/Input'
import Progress from 'semantic-ui-react/dist/commonjs/modules/Progress'

import TokenContract from './SmartContracts/OtocoToken'
import Transaction from './UIComponents/Transaction'
import Address from './UIComponents/Address'
import Web3Integrate from '../../web3-integrate';
import { matchPath } from 'react-router-dom';

export default (props) => {

    const { match } = props

    const history = useHistory();
    const dispatch = useDispatch();
    const {manageShares} = useMappedState(({managementState}) => managementState);
    const {network, currentAccount} = useMappedState(({accountState}) => accountState);
    const [balance, setBalance] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const [error, setError] = useState(null);
    const [to, setTo] = useState('');
    const [ensAddress, setENSAddress] = useState(null);
    const [amount, setAmount] = useState('');
    const ens = new ENS(web3.currentProvider);

    const getBNDecimals = (decimals) => {
        const BN = web3.utils.BN;
        return new BN(10).pow(new BN(decimals)); 
    }

    React.useEffect(() => {
        setTimeout( async () => {
            
            dispatch({type:'Set Shares Contract', contract: match.params.contract})

            if (network === ''){
                try {
                    await Web3Integrate.callModal();
                } catch (err) {
                    console.log(err)
                }
            }
            let accounts =  await web3.eth.getAccounts();
            dispatch({ type: "Set Current Account", currentAccount: accounts[0] });
            dispatch({ type: "Set Current Network", network: await web3.eth.net.getNetworkType() })

            let decimals = await TokenContract.getContract(match.params.contract).methods.decimals().call({from: accounts[0]})
            let shares = await TokenContract.getContract(match.params.contract).methods.totalSupply().call({from: accounts[0]})
            let balance = await TokenContract.getContract(match.params.contract).methods.balanceOf(accounts[0]).call({from: accounts[0]})

            dispatch({type:'Set Shares Config', token:{
                name: await TokenContract.getContract(match.params.contract).methods.name().call({from: accounts[0]}),
                symbol: await TokenContract.getContract(match.params.contract).methods.symbol().call({from: accounts[0]}),
                shares: shares / getBNDecimals(decimals),
                decimals: decimals
            }})
            setBalance(balance / getBNDecimals(decimals));
        }, 10);
    },[balance])

    const sendTransaction = async () => {
        try {
            const toAddress = ensAddress ? ensAddress : to;
            const BN = web3.utils.BN;
            TokenContract.getContract(match.params.contract).methods.transfer(toAddress, (new BN(amount).mul(getBNDecimals(manageShares.decimals))).toString()).send({from: currentAccount}, (error, hash) => {
                if (error) alert(error)
                else setTransaction(hash);
            });
        } catch (err) {
            alert(err)
        }
    }

    const clearTransaction = async () => { 
        let balance = await TokenContract.getContract(match.params.contract).methods.balanceOf(currentAccount).call({from: currentAccount})
        setBalance(balance / getBNDecimals(manageShares.decimals)); 
        setTransaction(null);
    }

    const handleChangeAmount = (event) => {
        setAmount(event.target.value);
    }

    const handleChangeTo = (event) => {
        ens.resolver(event.target.value).addr().then((addr) => {
            console.log(addr)
            setENSAddress(addr)
        }).catch((err) => {
            setENSAddress(null)
            // console.log("ERR", err)
        })
        setTo(event.target.value);
    }

    const clickDashboardHandler = async (e) => {
        history.push(`/dashboard`);
    }

    return (
        <Container className="pnl-body">
            <div style={{textAlign: "left", marginBottom: "100px"}}>
                <h1>Token Transfer Tool</h1>
                <h3>Easily transfer your tokens.</h3>
                <div className="transfer-card">
                    { balance && <div>
                        <h2>{manageShares.symbol} - {manageShares.name}</h2>
                        <p>Total Supply: {manageShares.shares}</p>
                    </div>}
                    { balance && !transaction && <p>Balance: {balance}</p>}
                    { balance && !transaction && <p>Wallet: <Address address={currentAccount}></Address></p>}
                    { balance && !transaction && <div>Your Percentage: <Progress percent={((balance/manageShares.shares)*100).toFixed(2)} progress /></div>}
                    { balance && !transaction && <div>
                        <Input 
                            type='text' 
                            className="token-input-container"
                            labelPosition='left'
                            defaultValue=''
                            placeholder="Address or ENS..."
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
                    <div className="ui active centered inline text loader" style={{ display: (!balance) ? "" : "none", zIndex : 0 }}>Loading Data</div>
                    { transaction && <Transaction hash={transaction} title="Transfering Tokens" callback={clearTransaction} ></Transaction> }
                </div>
                <Button className="primary" onClick={clickDashboardHandler} style={{marginTop: '10px'}}>Back to Dashboard</Button>
            </div>
        </Container>
    )

}