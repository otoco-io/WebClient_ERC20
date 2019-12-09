import React from 'react'

// Redux
import {useMappedState} from 'redux-react-hook';

// Semantic UI for React
import { Label } from 'semantic-ui-react'

const networkName = (networkId) => {
    switch (networkId) {
        case 1:
            return "Mainnet";
        case 2:
            return "Morden";
        case 3:
            return"Ropsten";
        case 4:
            return "Rinkeby";
        case 42:
            return "Kovan";
        default:
            return "Unknown";
    }
}

export default () => {
    const {currentNetwork} = useMappedState(({accountState}) => accountState);

    
    if(currentNetwork){
        return (
            <div>
                Current Network
                <Label color="red" tag style={{marginLeft: "20px"}}>
                    {networkName(currentNetwork)}
                </Label>
            </div>
        )
    } else {
        return "";
    }
    
}