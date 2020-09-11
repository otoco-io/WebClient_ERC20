import React, { useState } from 'react'
import Config from './Config'
import Deploy from './Deploy'
import Shares from './Shares'
// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import TokenContract from '../../SmartContracts/OtocoToken'
import FactoryContract from '../../SmartContracts/TokenFactory'

export default () => {

    const dispatch = useDispatch();
    const {manageSeries, manageShares, sharesStep} = useMappedState(({managementState}) => managementState);
    const {currentAccount, network} = useMappedState(({accountState}) => accountState);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        setTimeout(async () => {
            if (manageShares.contract) {
                setLoading(false);
                return;
            }
            try {
                const token = await FactoryContract.getContract(network).methods.seriesToken(manageSeries.contract).call({from:currentAccount});
                dispatch({type:'Set Shares Config', token:{
                    name: await TokenContract.getContract(token).methods.name().call({from: currentAccount}),
                    symbol: await TokenContract.getContract(token).methods.symbol().call({from: currentAccount}),
                    shares: await TokenContract.getContract(token).methods.totalSupply().call({from: currentAccount}),
                }})
                dispatch({type:'Set Shares Contract', contract: token})
                dispatch({type:'Set Shares Step', step: 2})
                setLoading(false)
            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        }, 0);
    }, [])

    return (
        <div>
            <div className={`ui ${loading ? 'active' : 'disabled'} dimmer`}>
                <div className="ui text loader">Loading</div>
            </div>
            {!loading && <div>
                {sharesStep === 0 && <Config></Config>}
                {sharesStep === 1 && <Deploy></Deploy>}
                {sharesStep === 2 && <Shares></Shares>}
            </div>}
        </div>
    )

}