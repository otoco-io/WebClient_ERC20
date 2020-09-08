import React, { useState } from 'react'
import ENS from 'ethereum-ens';
// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import Registrar from '../../SmartContracts/OtocoRegistrar'
import ENSRegistrar from '../../SmartContracts/ENSRegistrarController'

import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Input from 'semantic-ui-react/dist/commonjs/elements/Input'
import Progress from 'semantic-ui-react/dist/commonjs/modules/Progress'
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'

export default () => {

    const dispatch = useDispatch();
    const {manageSeries, manageEns, ensOptions} = useMappedState(({managementState}) => managementState);
    const {currentAccount} = useMappedState(({accountState}) => accountState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [domainOwner, setDomainOwner] = useState(null);
    const [selectedName, setSelectedName] = useState(null);

    const ens = new ENS(web3.currentProvider);

    const handleInputChange = (event) => {
        setSelectedName(event.target.value.toLowerCase());
        setDomainOwner(null)
    }

    const handleDomainChange = (e, data) => {
        dispatch({type:'Set ENS Domain', domain: data.value})
    }

    const handleClickVerify = async (event) => {
        setLoading(true);
        if (selectedName.length < 4 || selectedName.length > 30){
            setError('Keep domain name length biggen than 3 and less than 30');
            return;
        }
        try {
            console.log('WILL VERIFY:', `${selectedName}.${manageEns.selectedDomain}`)
            const addr = await ens.resolver(`${selectedName}.${manageEns.selectedDomain}`).addr()
            console.log('OWNER:', addr)
            setDomainOwner(addr)
        } catch (err) {
            setDomainOwner(null)
            setSelectedName('');
            dispatch({type:'Set ENS Name', name: selectedName})
        }
        setLoading(false);
    }

    const handleClickRegister = (event) => {
        // dispatch({type:'Set Shares Config', token: token});
        // if (token.name.length < 3 || token.name.length > 50){
        //     setError('Keep token name length biggen than 2 and less than 50');
        //     return;
        // }
        // dispatch({type:'Set Shares Step', step: 1})
        // console.log('SELECTED NAME', selectedName)
        dispatch({type:'Set ENS Step', step: 1})
    }

    return (
        <div>
            <h4 style={{paddingTop: '30px'}}>You can set up an ENS subdomain for your company for free, which makes it easier to reference it as needed. Choose a subdomain under otoco.eth and click `Verify`!</h4>
            <Input 
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
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Dropdown
                        // placeholder={jurisdictionName}
                        inline
                        onChange={handleDomainChange}
                        options={ensOptions}
                        defaultValue={manageEns.selectedDomain}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </Label>
            </Input>
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
            {!domainOwner && manageEns.name && <Message>
                <Message.Header>This domain is available!</Message.Header>
                <p>To register, click 'Register Domain'.</p>
            </Message>}
            {(!domainOwner || domainOwner !== manageSeries.contract) && selectedName && <Button id="btn-check-nmae" className="primary" type="submit" onClick={handleClickVerify}>Verify Domain</Button>}
            {!domainOwner && manageEns.name && <Button id="btn-check-nmae" className="primary" type="submit" onClick={handleClickRegister}>Register Domain</Button>}
        </div>
    )

}