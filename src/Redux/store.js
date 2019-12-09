import {createStore, combineReducers} from 'redux';
import {
    web3ProviderOptionPanelReducer,
    welcomePanelReducer, 
    accountReducer,
    txsReducer,
    dashpanelReducer
} from './reducers';

const reducers = combineReducers({
    web3ProviderOptionPanelState: web3ProviderOptionPanelReducer,
    welcomePanelState: welcomePanelReducer,
    accountState: accountReducer,
    txsState: txsReducer,
    dashpanelState: dashpanelReducer
})

export const store  = createStore(reducers);