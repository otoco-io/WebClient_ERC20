import {createStore, combineReducers} from 'redux';
import {
    web3ProviderOptionPanelReducer,
    welcomePanelReducer, 
    accountReducer,
    txsReducer
} from './reducers';

const reducers = combineReducers({
    web3ProviderOptionPanelState: web3ProviderOptionPanelReducer,
    welcomePanelState: welcomePanelReducer,
    accountState: accountReducer,
    txsState: txsReducer
})

export const store  = createStore(reducers);