import React, { useState } from 'react'
import ENS from 'ethereum-ens';
// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import Address from '../../UIComponents/Address'
import OtocoRegistrar from '../../SmartContracts/OtocoRegistrar'

export default () => {

    const dispatch = useDispatch();
    const {manageSeries} = useMappedState(({managementState}) => managementState);
    const {network} = useMappedState(({accountState}) => accountState);
    
    const ens = new ENS(web3.currentProvider);

    React.useEffect(() => {
        // ens.resolver(manageSeries.contract).addr().then((addr) => {
        //     console.log(addr)
        // }).catch((err) => {
        //     dispatch({type:'Set ENS Step', step: 0})
        // })
        OtocoRegistrar.getContract(network).methods.ownedDomains(manageSeries.contract).call(async (error, amount) => {
            if (amount <= 0) dispatch({type:'Set ENS Step', step: 0})
        });
    }, [])

    return (
        <div>
            <h4 style={{paddingTop: '30px'}}>
                <Address address={manageSeries.contract}></Address> was successfully registered addressing your Series contract {manageSeries.contract}.
            </h4>
        </div>
    )

}