import React, { useState } from 'react'

// Redux Hook
import {useMappedState, useDispatch} from 'redux-react-hook';

import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Container from 'semantic-ui-react/dist/commonjs/elements/Container'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Input from 'semantic-ui-react/dist/commonjs/elements/Input'

import MainContract from './SmartContracts/MainContract'
import Web3Integrate from '../../web3-integrate';

export default () => {

    const dispatch = useDispatch();
    const {network, currentAccount} = useMappedState(({accountState}) => accountState);
    const [error, setError] = useState(null);
    const [tokenAddress, setTokenAddress] = useState('');
    const [amountTax, setAmount] = useState('');

    const getBNDecimals = (decimals) => {
        const BN = web3.utils.BN;
        return new BN(10).pow(new BN(decimals)); 
    }

    React.useEffect(() => {
        setTimeout( async () => {
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
            console.log(network)
            if (await MainContract.getContract(network, 'us_de').methods.owner().call({from:accounts[0]}) !== accounts[0])
                setError('Not the contract owner DELAWARE');
            if (await MainContract.getContract(network, 'us_wy').methods.owner().call({from:accounts[0]}) !== accounts[0])
                setError('Not the contract owner WYOMING');
        }, 10);
    },[network])

    const sendTokenChange = async (jurisdiction) => {
        try {
            const BN = web3.utils.BN;
            MainContract.getContract(network, jurisdiction).methods.changeTknAddr(tokenAddress).send({from: currentAccount}, (error, hash) => {
                if (error) alert(error.message)
            });
        } catch (err) {
            alert(err)
        }
    }

    const sendTaxChange = async (jurisdiction) => {
        try {
            const BN = web3.utils.BN;
            console.log(jurisdiction, (new BN(amountTax).mul(getBNDecimals(18))).toString())
            MainContract.getContract(network, jurisdiction).methods.changeSeriesFee((new BN(amountTax).mul(getBNDecimals(18))).toString()).send({from: currentAccount}, (error, hash) => {
                if (error) alert(error.message)
            });
        } catch (err) {
            alert(err)
        }
    }

    const handleChangeAmount = (event) => {
        setAmount(event.target.value);
    }

    const handleChangeToken = (event) => {
        setTokenAddress(event.target.value);
    }


    return (
        <Container className="pnl-body">
            <div style={{textAlign: "left", marginBottom: "100px"}}>
                <h1>Admin Tool</h1>
                <h3>Change taxes and token used.</h3>
                <div className="transfer-card">
                    {!error && <div>
                        <Input 
                            type='text' 
                            className="token-input-container"
                            labelPosition='left'
                            defaultValue=''
                            placeholder="Address or ENS..."
                            onChange={handleChangeToken}
                            style={{margin: '16px 0px'}}
                        >
                            <input className="placeholder" />
                            <Label basic>Token Address</Label>
                        </Input>
                        <Button className="primary" onClick={sendTokenChange.bind(undefined, 'us_de')}>Change DELAWARE</Button>
                        <Button className="primary" onClick={sendTokenChange.bind(undefined, 'us_wy')}>Change WYOMING</Button>
                        <Input 
                            type='text' 
                            className="token-input-container"
                            type='number' 
                            labelPosition='left' 
                            defaultValue={0}
                            onChange={handleChangeAmount}
                            style={{margin: '16px 0px'}}
                        >
                            <input className="placeholder" />
                            <Label basic>Spin-Up Tax</Label>
                        </Input>
                        <Button className="primary" onClick={sendTaxChange.bind(undefined, 'us_de')}>Change DELAWARE</Button>
                        <Button className="primary" onClick={sendTaxChange.bind(undefined, 'us_wy')}>Change WYOMING</Button>
                    </div>}
                    {error && <h3>{error}</h3>}
                </div>
            </div>
        </Container>
    )

}