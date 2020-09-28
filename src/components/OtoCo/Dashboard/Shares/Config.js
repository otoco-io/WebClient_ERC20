import React, { useState } from 'react'
import ENS from 'ethereum-ens';
// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Semantic UI for React
import Input from 'semantic-ui-react/dist/commonjs/elements/Input'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'


export default () => {

    const dispatch = useDispatch();
    const {manageShares} = useMappedState(({managementState}) => managementState);
    const {currentAccount, network} = useMappedState(({accountState}) => accountState);
    const [error, setError] = useState(null);

    const token = {
        name: manageShares.name,
        symbol: manageShares.symbol,
        shares: manageShares.shares,
        decimals: 18
    };

    const handleChangeName = (event) => {
        token.name = event.target.value;
    }
    const handleChangeSymbol = (event) => {
        token.symbol = event.target.value;
    }
    const handleChangeShares = (event) => {
        token.shares = parseInt(event.target.value);
    }

    const handleClickNext = (event) => {
        //console.log(token)
        dispatch({type:'Set Shares Config', token: token});
        if (token.name.length < 3 || token.name.length > 50){
            setError('Keep token name length biggen than 2 and less than 50');
            return;
        }
        if (!/^[A-Z]+$/.test(token.symbol)){
            setError('For Token Symbol only use upper case letters');
            return;
        }
        if (token.symbol.length < 3){
            setError('For Token Symbol only use upper case letters');
            return;
        }
        if (token.shares < 100 || token.shares > 100000000000 ){
            setError('For Total Shares use integers between 100 and 100000000000');
            return;
        }
        dispatch({type:'Set Shares Step', step: 1})
    }

    return (
        <div>
            <h4 style={{paddingTop: '30px'}}>We made it easy for your new company to issue ERC20 tokens.</h4>
            <p>You decide what the tokens represent: equity in your company, a usage right, a convertible, etc. Simply set you token parameters and click 'Next' to create the new contract.</p>
            <Input 
                type='text' 
                className="token-input-container" 
                labelPosition='left'
                maxLength="30"
                defaultValue={manageShares.name}
                placeholder='Choose a name for the token'
                onChange={handleChangeName}
                style={{width: '50%', marginRight:"5%"}}
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
                style={{width: '50%', marginRight:"5%"}}
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
                max={100000000000}
                onChange={handleChangeShares}
                style={{width: '50%'}}
            >
                <input className="placeholder" />
                <Label basic>Total Shares</Label>
            </Input>
            {error && <Message className="negative" style={{width: '50%'}}>
                <p>{error}</p>
            </Message>}
            <p><Button className="primary" onClick={handleClickNext}>Next</Button></p>
        </div>
    )

}