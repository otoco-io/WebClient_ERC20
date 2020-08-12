import {createStore, combineReducers} from 'redux';
import {
    welcomePanelReducer, 
    accountReducer,
    txsReducer,
    dashboardReducer,
    managementReducer
} from './reducers';

const reducers = combineReducers({
    welcomePanelState: welcomePanelReducer,
    accountState: accountReducer,
    txsState: txsReducer,
    dashboardState: dashboardReducer,
    managementState: managementReducer,
})

export const store  = createStore(reducers);