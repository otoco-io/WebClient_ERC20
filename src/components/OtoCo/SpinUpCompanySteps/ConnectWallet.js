// React
import React from 'react';

// Components
import Button_ConnectMetamask from '../UIComponents/Button_ConnectMetamask'

export default () => { 

    const onConnected = () => {
        alert("Connected");
    }

    return (
        <div>
            <Button_ConnectMetamask onConnected={onConnected} />
        </div>
    );
    
}