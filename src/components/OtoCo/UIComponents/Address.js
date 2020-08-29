import React, { useState } from 'react'
import ENS from 'ethereum-ens';

import Card from 'semantic-ui-react/dist/commonjs/views/Card'
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon'

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

        if (network === 'kovan') setLinkSearch('https://kovan.etherscan.io/address/');
        if (network === 'main') setLinkSearch('https://etherscan.io/address/');
        
        // ens.resolver('teca.certisign.eth').addr().then((addr) => {
        //     console.log(addr)
        // }).catch((err) => {
        //     console.log(err)
        // })
        ens.reverse(props.address).name().then((addr) => {
            console.log(addr)
            setAddress(addr);
            setENS(true);
        }).catch((err) => {
            // console.log("ERR", err)
        })
    },[props.address])

    return (
        <span>
            {isEns && <a className="primary" href={linkSearch+props.address} target="blank">
                {address}
            </a>}
            {!isEns && <a className="primary" href={linkSearch+props.address} target="blank">
                {address.substring(0,6)}...{address.substring(address.length-5,address.length-1)}
            </a>}
            <i className="copy link icon" onClick={clickCopyHandler.bind(undefined, props.address)}></i>
        </span>
    )

}