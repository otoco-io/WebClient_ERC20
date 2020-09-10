import React, { useState } from 'react'
import ENS from 'ethereum-ens';

import Card from 'semantic-ui-react/dist/commonjs/views/Card'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'

import OtocoRegistrar from '../SmartContracts/OtocoRegistrar'

import {useMappedState} from 'redux-react-hook'

export default (props) => {

    const { network } = useMappedState(({ accountState }) => accountState );
    const [message, setMessage] = useState();
    const [isEns, setENS] = useState(false);
    const [address, setAddress] = useState(props.address);
    const [linkSearch, setLinkSearch] = useState(null);

    const clickCopyHandler = (info) => {
        navigator.clipboard.writeText(info);
    }

    const ens = new ENS(web3.currentProvider);

    React.useEffect(() => {

        if (network === 'ropsten') setLinkSearch('https://ropsten.etherscan.io/address/');
        if (network === 'kovan') setLinkSearch('https://kovan.etherscan.io/address/');
        if (network === 'main') setLinkSearch('https://etherscan.io/address/');
        ens.reverse(props.address).name().then(async (addr) => {
            console.log(addr);
            await setAddress(addr);
            await setENS(true);
            return;
        }).catch((err) => {
            // console.log("ERR", err)
            OtocoRegistrar.getContract(network).methods.ownedDomains(props.address).call(async (error, amount) => {
                if (amount <= 0) return;
                OtocoRegistrar.getContract(network).methods.resolve(props.address, amount-1).call( async (error, name) => {
                    await setAddress(name+'.otoco.eth');
                    await setENS(true);
                    return;
                });
            });
        });
    },[props.address])

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