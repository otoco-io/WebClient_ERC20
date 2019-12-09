import React from 'react'

// Redux
import {useMappedState} from 'redux-react-hook';

import _ from 'lodash';

export default () => {
    const {series} = useMappedState(({accountState}) => accountState);
    const {currentSeries} = useMappedState(({dashpanelState}) => dashpanelState);

    if (currentSeries) {
        const seriesObj = series[_.findIndex(series, { address: currentSeries })]
        return (
            <div className="series-container">
                <ul>
                    <li>
                        Contract Address: {currentSeries}     
                        ( <a href={`https://kovan.etherscan.io/address/${currentSeries}`} 
                            target="_blank">View Contract on Etherscan
                        </a> )
                    </li>
                    <li>
                        Operation Agreement PDF:   
                        ( <a href={`/.netlify/functions/pdf-generator?address=${seriesObj.address}&name=${seriesObj.name}`} 
                            target="_blank">Download
                        </a> )
                    </li>
                </ul>
            </div>
        )
    } else {
        return ""
    }
    
}