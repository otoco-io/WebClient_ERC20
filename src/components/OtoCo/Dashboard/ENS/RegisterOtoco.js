import React, { useState } from 'react'
import ENS from 'ethereum-ens';
// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import Registrar from '../../SmartContracts/OtocoRegistrar'
import ENSRegistrar from '../../SmartContracts/ENSRegistrarController'
import Address from '../../UIComponents/Address'

import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Input from 'semantic-ui-react/dist/commonjs/elements/Input'
import Progress from 'semantic-ui-react/dist/commonjs/modules/Progress'
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'
import OtocoRegistrar from '../../SmartContracts/OtocoRegistrar';
import Transaction from '../../UIComponents/Transaction';

export default () => {

    const dispatch = useDispatch();
    const {manageSeries, manageEns, ensOptions} = useMappedState(({managementState}) => managementState);
    const {currentAccount, network} = useMappedState(({accountState}) => accountState);
    const [transaction, setTransaction] = useState(null);
    const [success, setSuccess] = useState(false);

    const ens = new ENS(web3.currentProvider);

    const handlerClickSend = async (e) => {
        let requestInfo = {from: currentAccount, gas:200000};
        try {
            const gasFees = await axios.get(`https://ethgasstation.info/api/ethgasAPI.json`);
            requestInfo.gasPrice = web3.utils.toWei((gasFees.data.fast*0.1).toString(), 'gwei');
        } catch (err){
            console.log('Could not fetch gas fee for transaction.');
        }
        console.log(network, requestInfo)
        try {
            const hash = await OtocoRegistrar.getContract(network).methods.register(
                web3.utils.sha3(manageEns.name),
                currentAccount,
                manageSeries.contract
            ).send(requestInfo, (error, hash) => {
                setTransaction(hash);
            })
        } catch (err) {
            console.log(err);
        }
    }

    const registeringFinished = async (e) => {
        setTransaction(null);
        setSuccess(true);
    }

    const handlerClickBack = async (e) => {
        dispatch({type:'Set ENS Name', name: ''})
        dispatch({type:'Set ENS Step', step: 0})
    }

    return (
        <div>
            <h4 style={{paddingTop: '30px'}}>
                {manageEns.name}.{manageEns.selectedDomain} will be registered on behalf of the company manager <Address address={currentAccount}></Address>
                , and the domain will point to the company contract address <Address address={manageSeries.contract}></Address>
            </h4>
            {transaction && <Transaction hash={transaction} title="Register Subdomain" callback={registeringFinished}></Transaction>}
            {!transaction && !success && <Button id="btn-check-nmae" className="primary" type="submit" onClick={handlerClickSend}>Send Request</Button>}
            {success && <p>Your domain was successfully registered! Click 'back' and verify the domain.</p>}
            {success && 
                <Button id="btn-check-nmae" className="primary" type="submit" onClick={handlerClickBack}>Back to Verification</Button>
            }
        </div>
    )

}