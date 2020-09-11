import React, { useState } from 'react'
import ENS from 'ethereum-ens';

import OtocoRegistrar from '../SmartContracts/OtocoRegistrar'

import {useMappedState,useDispatch} from 'redux-react-hook'

export default (props) => {

    const dispatch = useDispatch();
    const { network } = useMappedState(({ accountState }) => accountState );
    const { addresses } = useMappedState(({ addressState }) => addressState );
    const [isEns, setENS] = useState(false);
    const [address, setAddress] = useState(props.address);
    const [linkSearch, setLinkSearch] = useState(null);
    const [isStop, setStop] = useState(false);

    const clickCopyHandler = (info) => {
        navigator.clipboard.writeText(info);
    }

    const ens = new ENS(web3.currentProvider);

    React.useEffect(() => {
        if (isStop) return
        console.log('REDRAW ADDRESSES')
        if (network === 'ropsten') setLinkSearch('https://ropsten.etherscan.io/address/');
        if (network === 'kovan') setLinkSearch('https://kovan.etherscan.io/address/');
        if (network === 'main') setLinkSearch('https://etherscan.io/address/');
        
        if (addresses[props.address]) {
            setAddress(addresses[props.address]);
            setENS(true);
            return;
        }

        ens.reverse(props.address).name().then(async (addr) => {
            // console.log(addr);
            dispatch({type:'Set Address', address: props.address, domain:addr})
            await setAddress(addr);
            await setENS(true);
            return;
        }).catch((err) => {
            // console.log("ERR", err)
            OtocoRegistrar.getContract(network).methods.ownedDomains(props.address).call(async (error, amount) => {
                if (amount <= 0) return;
                OtocoRegistrar.getContract(network).methods.resolve(props.address, amount-1).call( async (error, name) => {
                    dispatch({type:'Set Address', address: props.address, domain:name+'.otoco.eth'})
                    await setAddress(name+'.otoco.eth');
                    await setENS(true);
                    return;
                });
            });
        });
        setStop(true)
    },[])

    return (
        <span>
            {isEns && <a className="primary" href={linkSearch+props.address} target="blank">
                {address}
            </a>}
            {!isEns && <a className="primary" href={linkSearch+props.address} target="blank">
                {address.substring(0,6)}...{address.substring(address.length-5,address.length-1)}
            </a>}
            &nbsp;<i className="copy link icon" onClick={clickCopyHandler.bind(undefined, props.address)}></i>
        </span>
    )

}