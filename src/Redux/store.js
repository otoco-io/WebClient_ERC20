import {createStore, combineReducers} from 'redux';
import {
    welcomePanelReducer, 
    accountReducer,
    txsReducer,
    dashboardReducer,
    managementReducer,
    addressReducer
} from './reducers';

const reducers = combineReducers({
    welcomePanelState: welcomePanelReducer,
    accountState: accountReducer,
    txsState: txsReducer,
    dashboardState: dashboardReducer,
    managementState: managementReducer,
    addressState: addressReducer,
})

export const store  = createStore(reducers);