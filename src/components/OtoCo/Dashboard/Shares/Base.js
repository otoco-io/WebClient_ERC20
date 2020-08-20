import React, { useState } from 'react'
import Steps from './Steps'
import Config from './Config'
import Deploy from './Deploy'
import Ownership from './Ownership'
import Shares from './Shares'
// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import SharesContract from '../../SmartContracts/ERC20Shares'

export default () => {

    const dispatch = useDispatch();
    const {manageSeries, sharesStep} = useMappedState(({managementState}) => managementState);
    const {currentAccount} = useMappedState(({accountState}) => accountState);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        setTimeout(async () => {
            try {
                await SharesContract.getContract(manageSeries.owner).methods.balanceOf(currentAccount).call({from: currentAccount})
                dispatch({type:'Set Shares Config', token:{
                    name: await SharesContract.getContract(manageSeries.owner).methods.name().call({from: currentAccount}),
                    symbol: await SharesContract.getContract(manageSeries.owner).methods.symbol().call({from: currentAccount}),
                    shares: await SharesContract.getContract(manageSeries.owner).methods.totalSupply().call({from: currentAccount}),
                }})
                dispatch({type:'Set Shares Contract', contract: manageSeries.owner})
                dispatch({type:'Set Shares Step', step: 3})
                setLoading(false)
            } catch (err) {
                console.log(err);
                setLoading(false)
            }
        }, 10);
    },[sharesStep])

    return (
        <div>
            <div className={`ui ${loading ? 'active' : 'disabled'} dimmer`}>
                <div className="ui text loader">Loading</div>
            </div>
            {!loading && <div>
                {sharesStep < 3 && <Steps></Steps>}
                {sharesStep === 0 && <Config></Config>}
                {sharesStep === 1 && <Deploy></Deploy>}
                {sharesStep === 2 && <Ownership></Ownership>}
                {sharesStep === 3 && <Shares></Shares>}
            </div>}
        </div>
    )

}