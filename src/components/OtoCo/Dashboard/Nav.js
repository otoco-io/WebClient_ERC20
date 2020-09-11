import React from 'react'

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'

export default () => {

    const dispatch = useDispatch();
    const {manageOption, manageSeries} = useMappedState(({managementState}) => managementState);

    return (
        <Menu pointing secondary vertical className="series-step-wrap">
            <Menu.Item
                className="series-step-item"
                name='Tokens'
                active={manageOption === 0}
                onClick={dispatch.bind(undefined, { type: "Set Manage Option", option:0 })}
            />
            <Menu.Item
                className="series-step-item"
                name='ENS'
                active={manageOption === 1}
                onClick={dispatch.bind(undefined, { type: "Set Manage Option", option:1 })}
            />
            <Menu.Item
                className="series-step-item"
                name='Legal Documents'
                active={manageOption === 2}
                onClick={dispatch.bind(undefined, { type: "Set Manage Option", option:2 })}
            />
        </Menu>
    )
}