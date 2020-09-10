import React, { useState } from 'react'
import axios from 'axios';
import ENS from 'ethereum-ens';
// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import OtocoRegistrar from '../../SmartContracts/OtocoRegistrar'
import ENSRegistrar from '../../SmartContracts/ENSRegistrarController'

import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Input from 'semantic-ui-react/dist/commonjs/elements/Input'
import Progress from 'semantic-ui-react/dist/commonjs/modules/Progress'
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'
import Address from '../../UIComponents/Address';
import Transaction from '../../UIComponents/Transaction';

export default () => {

    const dispatch = useDispatch();
    const {manageSeries, manageEns, ensOptions} = useMappedState(({managementState}) => managementState);
    const {currentAccount, network} = useMappedState(({accountState}) => accountState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [domainOwner, setDomainOwner] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [transaction, setTransaction] = useState(null);
    const [status, setStatus] = useState('start');  // start, typing, used, available, claiming, success

    const ens = new ENS(web3.currentProvider);

    const handleInputChange = (event) => {
        setSelectedName(event.target.value.toLowerCase());
        setDomainOwner(null)
        setStatus('typing')
    }

    const handleDomainChange = (e, data) => {
        dispatch({type:'Set ENS Domain', domain: data.value})
    }

    const handleClickVerify = async (event) => {
        setLoading(true);
        if (selectedName.length < 4 || selectedName.length > 30){
            setError('Keep domain name length biggen than 3 and less than 30');
            setLoading(false);
            return;
        }
        try {
            console.log('WILL VERIFY:', `${selectedName}.${manageEns.selectedDomain}`)
            const addr = await ens.resolver(`${selectedName}.${manageEns.selectedDomain}`).addr()
            console.log('OWNER:', addr)
            setDomainOwner(addr)
            setStatus('used')
        } catch (err) {
            setDomainOwner(null)
            setSelectedName('');
            setStatus('available')
            dispatch({type:'Set ENS Name', name: selectedName})
        }
        setLoading(false);
    }

    const handleClickClaim = async (event) => {
        let requestInfo = {from: currentAccount, gas:200000};
        try {
            const gasFees = await axios.get(`https://ethgasstation.info/api/ethgasAPI.json`);
            requestInfo.gasPrice = web3.utils.toWei((gasFees.data.fast*0.1).toString(), 'gwei');
        } catch (err){
            console.log('Could not fetch gas fee for transaction.');
        }
        console.log(network, requestInfo)
        try {
            OtocoRegistrar.getContract(network).methods.registerAndStore(
                manageEns.name,
                manageSeries.contract
            ).send(requestInfo, (error, hash) => {
                setTransaction(hash);
                setStatus('claiming')
            })
        } catch (err) {
            console.log(err);
        }
    }

    const registeringFinished = async (e) => {
        setTransaction(null);
        setStatus('success')
    }

    return (
        <div>
            <h4 style={{paddingTop: '30px'}}>Link your company address <Address address={manageSeries.contract}></Address> to an otoco.eth to make it easy to use. Simply check availability and claim your domain for free.</h4>
            {(status != 'claiming') && <Input 
                type='text' 
                className="checkname-input-container" 
                labelPosition='right' 
                id="check_name"
                defaultValue={manageEns.name}
                placeholder='Choose a subdomain...'
                onChange={handleInputChange}
            >
                <input className="placeholder" />
                <Label basic>
                    {/* &nbsp;&nbsp;&nbsp;&nbsp;
                    <Dropdown
                        // placeholder={jurisdictionName}
                        inline
                        onChange={handleDomainChange}
                        options={ensOptions}
                        defaultValue={manageEns.selectedDomain}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp; */}
                    .otoco.eth
                </Label>
            </Input>}
            <div className={`ui ${loading ? 'active' : 'disabled'} dimmer`}>
                <div className="ui text loader">Loading</div>
            </div>
            {domainOwner && domainOwner !== manageSeries.contract && <Message negative>
                <Message.Header>Sorry! This domain has been used.</Message.Header>
                <p>Please Enter Another Domain Name.</p>
            </Message>}
            {domainOwner && domainOwner === manageSeries.contract && <Message>
                <Message.Header>Your series already own this domain!</Message.Header>
                <p>No need to register it.</p>
            </Message>}
            {(status == 'available') && <Message>
                <Message.Header>This domain is available!</Message.Header>
                <p>To register, click 'Claim Name'.</p>
            </Message>}
            {(status == 'typing') && <Button id="btn-check-nmae" className="primary" type="submit" onClick={handleClickVerify}>Verify Name</Button>}
            {(status == 'available') && <Button id="btn-check-nmae" className="primary" type="submit" onClick={handleClickClaim}>Claim Name</Button>}
            {transaction && <Transaction hash={transaction} title="Register Subdomain" callback={registeringFinished}></Transaction>}
            {(status == 'success') && <p>Your successfully claimed {manageEns.name}.{manageEns.selectedDomain} as the name for your company address {manageSeries.contract}.</p>}
        </div>
    )

}