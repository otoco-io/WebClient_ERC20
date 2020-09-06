import React, { useState } from 'react'
// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import Config from './Config'
import RegisterEth from './RegisterEth'
import RegisterOtoco from './RegisterOtoco'

import Registrar from '../../SmartContracts/OtocoRegistrar'
import ENS from '../../SmartContracts/ENSRegistrarController'

import Message from 'semantic-ui-react/dist/commonjs/collections/Message'

export default () => {

    const dispatch = useDispatch();
    const {ensStep, manageEns} = useMappedState(({managementState}) => managementState);
    const {network} = useMappedState(({accountState}) => accountState);
    const [error, setError] = useState(null);

    React.useEffect(() => {
        if (!['main', 'ropsten'].includes(network)){
            setError(true)
        }
    }, [])

    return (
        <div>
            {error && <Message negative>
                <Message.Header>This network doesn't support ENS domains.</Message.Header>
                <p>Verify your network connection and connected wallet.</p>
            </Message>}
            {ensStep === 0 && !error && <Config></Config>}
            {ensStep === 1 && manageEns.selectedDomain === 'otoco.eth' && <RegisterOtoco></RegisterOtoco>}
            {ensStep === 1 && manageEns.selectedDomain === 'eth' && <RegisterEth></RegisterEth>}
        </div>
    )

}