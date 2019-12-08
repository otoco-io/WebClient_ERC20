// React
import React from 'react';
import PropTypes from 'prop-types';

// Redux Hook
import {useDispatch, useMappedState} from 'redux-react-hook';

// Smart Contract
import ERC20Contract from '../SmartContracts/ERC20Contract'
import MainContract from '../SmartContracts/MainContract';
import SeriesContract from '../SmartContracts/SeriesContract';

// Semantic UI for React
import { Image, Button } from 'semantic-ui-react'
import img_metamask from '../../../images/metamask.svg'

// Actions
import {doWeb3ProviderConnect} from '../Actions/ConnectWeb3Provider'

const Button_ConnectMetamask = ({beforeAction, onConnected, onError}) => { 
    const {currentAccount} = useMappedState(({accountState}) => accountState); 
    const dispatch = useDispatch();

    const setAccount = (accounts) => {
        dispatch({ type: "Set Current Account", currentAccount: accounts[0] });

        web3.eth.getBalance(accounts[0], function(error, result){
            if(result) dispatch({ type: "Set Account ETH Balance", accountBalanceETH: result / 10**18 });
            if(error) { if(onError) onError(error) }
        });

        // Call balanceOf function
        ERC20Contract.getContract().methods.balanceOf(accounts[0]).call((error, balance) => {
            
            // Get decimals
            ERC20Contract.getContract().methods.decimals().call((error, decimals) => {
                
                if(decimals) dispatch({ type: "Set Account ERC20 Balance", accountBalanceERC20: balance / 10**decimals});
                
                if(error) { if(onError) onError(error) }
                else{ if(onConnected) onConnected(); }
                
            });
        });

        // Get Symbol
        ERC20Contract.getContract().methods.symbol().call((error, symbol) => {
            // get ERC20 Symbol
            if(symbol) dispatch({ type: "Set ERC20 Symbol", erc20Symbol: web3.utils.hexToUtf8(symbol)});
            if(error) { if(onError) onError(error) }
        });

        // Get Created Series
        MainContract.getContract().methods.mySeries().call({from: accounts[0]}, function(error, ss){
            console.log(ss)
            dispatch({ type: "Account/UpdateSeriesLength", seriesLength: ss.length });
            if(ss) {
                for(let i = 0, len = ss.length; i < len; i++) {
                    SeriesContract.getContract(ss[i]).methods.getName().call(function(error, series_name){
                        // console.log(`series: ${ss[i]}`, {idx: i, address: ss[i], name: series_name});
                        
                        if(error) { 
                            if(onError) onError(error) 
                            console.log("error!!", error)
                        } else {
                            dispatch({ type: "Account/PushSeries", idx: i, address: ss[i], name: series_name });
                        }
                    })
                }
            }
            // if(ss) dispatch({ type: "Set Own Company Contracts", series });
            if(error) { if(onError) onError(error) }
        })
    }

    const onMetaMask_Click = (e) => {
        
        if(beforeAction) beforeAction();

        doWeb3ProviderConnect(
            (accounts) => {

                // Put Account Info into UI
                setAccount(accounts);

                // Listen Account Change Event
                ethereum.on('accountsChanged', setAccount);

            }, 
            (error) => {
                dispatch({ type: "Close Welcome Board Loading" });
                console.log("Something went wrong! Please try again later!: ", error)
            }
        )
    }

    const CurrentButton = () => {
        if (currentAccount === "") {
            return(
                <Button className="animated-metamask primary" animated='fade' onClick={onMetaMask_Click}>
                    <Button.Content visible>MetaMask</Button.Content>
                    <Button.Content hidden>
                        <Image src={img_metamask} />
                    </Button.Content>
                </Button>
            )
        } else {
            return "";
        }
    }

    return <CurrentButton />;
    
}

Button_ConnectMetamask.propTypes = {
    onConnected: PropTypes.func,
    beforeAction: PropTypes.func,
    onError: PropTypes.func,
};

export default Button_ConnectMetamask;