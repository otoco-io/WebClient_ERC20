import React from 'react'
// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Semantic UI for React
import { Input, Label, Message, Button} from 'semantic-ui-react'

export default () => {

    const dispatch = useDispatch();
    const {manageShares} = useMappedState(({managementState}) => managementState);

    const token = {
        name: '',
        symbol: '',
        shares: 0
    };

    const handleChangeName = (event) => {
        token.name = event.target.value;
    }
    const handleChangeSymbol = (event) => {
        token.symbol = event.target.value;
    }
    const handleChangeShares = (event) => {
        token.shares = event.target.value;
    }

    const handleClickNext = (event) => {
        console.log(token);
        dispatch({type:'Set Shares Config', token: token});
        dispatch({type:'Set Shares Step', step: 1})
    }

    return (
        <div>
            <p style={{paddingTop: '30px'}}>Setup your token informations here. Fill form and click 'next'.</p>
            <Input 
                type='text' 
                className="token-input-container" 
                labelPosition='left'
                maxLength="30"
                defaultValue={manageShares.name}
                placeholder='Choose a name for the token'
                onChange={handleChangeName}
                style={{width: '100%'}}
            >
                <input className="placeholder" />
                <Label basic>Token Name</Label>
            </Input>
            <Input 
                type='text' 
                className="token-input-container" 
                labelPosition='left' 
                defaultValue={manageShares.symbol}
                maxLength="4"
                placeholder='e.g.: TOK'
                onChange={handleChangeSymbol}
                style={{width: '45%', marginRight:"5%"}}
            >
                <input className="placeholder" />
                <Label basic>Token Symbol</Label>
            </Input>
            <Input 
                type='text' 
                className="token-input-container"
                type='number' 
                labelPosition='left' 
                defaultValue={manageShares.symbol}
                placeholder='e.g.: 1000000'
                max={1000000000}
                onChange={handleChangeShares}
                style={{width: '50%'}}
            >
                <input className="placeholder" />
                <Label basic>Total Shares</Label>
            </Input>
            <p><Button className="primary" onClick={handleClickNext}>Next</Button></p>
        </div>
    )

}