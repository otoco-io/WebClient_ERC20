import React from 'react';

import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu'

export default {
    Item: ({children, active}) => (
        <Menu.Item 
            className="otoco-step-item"
            name={children} 
            active={active} />
    ),
    Wrap: ({children}) => {
        return (
            <Menu pointing secondary vertical className="otoco-step-wrap">
                {children}
            </Menu>
        )
    }
}
