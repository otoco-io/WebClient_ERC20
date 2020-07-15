import {createStore, combineReducers} from 'redux';
import {
    welcomePanelReducer, 
    accountReducer,
    txsReducer,
    dashboardReducer
} from './reducers';

const reducers = combineReducers({
    welcomePanelState: welcomePanelReducer,
    accountState: accountReducer,
    txsState: txsReducer,
    dashboardState: dashboardReducer
})

export const store  = createStore(reducers);