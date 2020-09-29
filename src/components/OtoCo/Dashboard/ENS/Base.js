import React, { useState } from 'react'
import ENS from 'ethereum-ens'
// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import Config from './Config'
import Registered from './Registered'
import OtocoRegistrar from '../../SmartContracts/OtocoRegistrar'

export default () => {

    const dispatch = useDispatch();
    const {ensStep, manageSeries, manageEns} = useMappedState(({managementState}) => managementState);
    const {network} = useMappedState(({accountState}) => accountState);

    const ens = new ENS(web3.currentProvider);

    React.useEffect(() => {
        if (ensStep > 0) return;
        // ens.resolver(manageSeries.contract).addr().then((addr) => {
        //     dispatch({type:'Set ENS Step', step: 1})
        // }).catch((err) => {
        //     console.log(err)    
        // })
        OtocoRegistrar.getContract(network).methods.ownedDomains(manageSeries.contract).call(async (error, amount) => {
            if (amount > 0) dispatch({type:'Set ENS Step', step: 1})
        });
    }, [])

    return (
        <div className="animate-fade">
            {ensStep === 0 && <Config></Config>}
            {ensStep === 1 && <Registered></Registered>}
            {/* {ensStep === 1 && manageEns.selectedDomain === 'otoco.eth' && <RegisterOtoco></RegisterOtoco>} */}
            {/* {ensStep === 1 && manageEns.selectedDomain === 'eth' && <RegisterEth></RegisterEth>} */}
        </div>
    )

}