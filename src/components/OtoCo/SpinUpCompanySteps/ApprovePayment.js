// React
import React, { useState } from 'react';

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Semantic UI for React
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'

import Address from '../UIComponents/Address';
import Transaction from '../UIComponents/Transaction';

// Smart Contract
import MainContract from '../SmartContracts/MainContract';
import ERC20Contract from '../SmartContracts/ERC20';

export default () => { 

    const dispatch = useDispatch();
    const {currentAccount, network} = useMappedState(({accountState}) => accountState)
    const {jurisdictionSelected, availableName} = useMappedState(({welcomePanelState}) => welcomePanelState);
    const [transaction, setTransaction] = useState(null);
    const [accountAllowance, setAllowance] = useState(0);
    const [accountBalance, setBalance] = useState(0);
    const [erc20, setERC20] = useState({
        symbol: 'DAI',
        spinUpFee: 5
    });
    const [erc20Target, setERC20Target] = useState('');

    // TODO : Verify if company already not allow master to address payment
    React.useEffect(() => {
        // When enter page
        setTimeout( async () => {
            let allowance = await ERC20Contract.getContract(network).methods.allowance(currentAccount,MainContract.addresses[network+'_'+jurisdictionSelected]).call({from: currentAccount})
            let balance = await ERC20Contract.getContract(network).methods.balanceOf( currentAccount ).call({from: currentAccount})
            allowance = parseFloat(allowance)
            balance = parseFloat(balance)
            // console.log("PASSOU", allowance, balance, erc20.spinUpFee);
            setERC20Target(MainContract.addresses[network+'_'+jurisdictionSelected])
            setAllowance(allowance)
            setBalance(balance)
            if(erc20.spinUpFee <= allowance && balance >= allowance)
                dispatch({ type: "Welcome Board Go To Step N", N: 3 });
        }, 0)
    },[network])


    const clickApproveHandler = async (e) => {
        let requestInfo = {from: currentAccount, gas:200000};
        try {
            const gasFees = await axios.get(`https://ethgasstation.info/api/ethgasAPI.json`);
            requestInfo.gasPrice = web3.utils.toWei((gasFees.data.fast*0.1).toString(), 'gwei');
        } catch (err){
            console.log('Could not fetch gas fee for transaction.');
        }
        console.log(network, requestInfo)
        try {
            ERC20Contract.getContract(network).methods.approve(erc20Target, erc20.spinUpFee)
            .send(requestInfo, (error, hash) => {
                setTransaction(hash);
            })
        } catch (err) {
            console.log(err);
        }
    }

    const nextStepHandler = () => {
        dispatch({ type: "Welcome Board Go To Step N", N: 3 });
    }

    const clickBackHandler = () => {
        dispatch({ type: "Resume Welcome Board" });
    }

    function Form() {
        if (transaction) {
            return <div style={{minHeight: '200px'}}>
                <Transaction hash={transaction} title="Approving Tokens" callback={nextStepHandler} ></Transaction>
                <p>* Once transaction is confirmed, it will automatically proceed to next step.</p> 
            </div>
        }
        return <div style={{minHeight: '200px'}}>
            <p>All it takes to activate your LCC is to approve <b>{erc20.spinUpFee} {erc20.symbol}</b> to OtoCo from your connected wallet.</p>
            <p>Approved <b>{accountAllowance} {erc20.symbol}</b> of total <b>{accountBalance} {erc20.symbol}</b> available.</p>
            <p>From Your Account: <Address address={currentAccount}></Address></p>
            <p>To Address: <Address address={erc20Target}></Address></p>
        </div>;
    }

    return (
        <div>
            <div>
                <Form></Form>
                { !transaction && <p className="align-right">
                    <Button className="primary" onClick={clickBackHandler}>Back</Button>
                    <Button className="primary" onClick={clickApproveHandler}>Approve</Button>
                </p>}
            </div>
        </div>
    );
    
}