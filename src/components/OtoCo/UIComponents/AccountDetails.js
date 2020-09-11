import React from 'react';

// Redux Hook
import {useMappedState, useDispatch} from 'redux-react-hook';
import web3Integrate from '../../../web3-integrate';

export default () => { 

    const dispatch = useDispatch();
    const {network, currentAccount} = useMappedState(({accountState}) => accountState);

    const handleManage = () => {
        if (web3.currentProvider.callModal) web3.currentProvider.callModal();
    }

    const handleDisconnect = () => {
        web3Integrate.disconnect();
        dispatch({ type: "Disconnect" })
    }

    const handleConnect = async () => {
        await web3Integrate.callModal();
        let accounts =  await web3.eth.getAccounts();
        dispatch({ type: "Set Current Account", currentAccount: accounts[0] });
        dispatch({ type: "Set Current Network", network: await web3.eth.net.getNetworkType() })
    }

    return (
        <div>
            <div className="account-details" style={{display: (currentAccount !== "") ? '' : 'none'}}>
                <p onClick={handleManage}>{currentAccount.substring(0,8)}... <span className='network'>{network}</span></p>
                <p className="button"><span onClick={handleDisconnect}>disconnect</span></p>
            </div>
            <div className="account-details" style={{display: (currentAccount === "") ? '' : 'none'}}>
                <p className="button"><span onClick={handleConnect}>disconnected</span></p>
            </div>
        </div>
    );
    
}