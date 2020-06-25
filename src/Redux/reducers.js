import welcomePanelState from './WelcomePanelState'
import accountState from './AccountState'
import dashboardState from './DashboardState'
import txsState, {tx} from './TxsState'

import TagManager from 'react-gtm-module'

export const welcomePanelReducer = function(state = welcomePanelState, action){
    switch(action.type){
        case "Close Welcome Board":
            return Object.assign({}, state, {showBoard: false})
        case "Open Welcome Board Loading":
            return Object.assign({}, state, {loading: true})
        case "Close Welcome Board Loading":
            return Object.assign({}, state, {loading: false})
        case "Open Welcome Board Approving":
            return Object.assign({}, state, {approving: true})
        case "Close Welcome Board Approving":
            return Object.assign({}, state, {approving: false})
        case "Increase Waiting Ticktoc":
            return Object.assign({}, state, {waitingTicktoc: state.waitingTicktoc + 1})
        case "Reset Waiting Ticktoc":
            return Object.assign({}, state, {waitingTicktoc: 0})
        case "Welcome Board Go To Step N":
            TagManager.dataLayer({dataLayer: { event: 'Step N Visited', N: action.N }});
            console.log(dataLayer);
            return Object.assign({}, state, {currentStep: action.N})
        case "Enter Company Name on Welcome Board":
            return Object.assign({}, state, {
                selectedCompanyName: action.value
            });
        case "Store Available Company Name":
            return Object.assign({}, state, {
                availableName: state.selectedCompanyName + " LLC",
            });    
        case "Select Jurisdiction":
            return Object.assign({}, state, {
                jurisdictionSelected: action.value,
                jurisdictionName: action.name
            });
        case "Show Error Msg on Welcome Board":
            return Object.assign({}, state, {
                errMsg: {
                    show: true,
                    title: action.title,
                    msg: action.msg
                }
            });
        case "Hide Error Msg on Welcome Board":
            return Object.assign({}, state, {
                errMsg: {
                    show: false,
                    title: "",
                    msg: ""
                }
            });
        case "Resume Welcome Board":
            return welcomePanelState;
        default:
            return state;
    }
}

export const accountReducer = function(state = accountState, action){
    switch(action.type){
        case "Set Current Account":
            return Object.assign({}, state, {
                currentAccount: action.currentAccount
            });
        case "Set Current Network":
            if (action.network === '42') action.network = 'kovan';
            if (action.network === '1') action.network = 'main';
            console.log('network',action.network);
            return Object.assign({}, state, {
                network: action.network
            });
        case "Set Account ETH Balance":
            return Object.assign({}, state, {
                accountBalanceETH: action.accountBalanceETH
            });
        // case "Set Account ERC20 Balance":
        //     return Object.assign({}, state, {
        //         accountBalanceERC20: action.accountBalanceERC20
        //     });
        // case "Set ERC20 Symbol":
        //     return Object.assign({}, state, {
        //         erc20Symbol: action.erc20Symbol
        //     });
        // case "Set ERC20 Spin Up Fee":
        //     return Object.assign({}, state, {
        //         erc20SpinUpFee: action.erc20SpinUpFee
        //     });
        case "Set Own Company Contracts":
            return Object.assign({}, state, {
                ownSeriesContracts: action.ownSeriesContracts
            });
        default:
            return state;

    }
}

export const txsReducer = function(state = txsState, action){
    switch(action.type){
        case "Push Tx":
            tx.id = action.txID;
            tx.status = "Initialized";
            return Object.assign({}, state, {
                txs: [...state.txs, tx]
            });
        case "Set Tx Confirmed":
            state.txs[action.idx].status = "Confirmed";
            return Object.assign({}, state, {
                txs: [...state.txs]
            });
        case "Set Tx Pending":
            state.txs[action.idx].status = "Pending";
            return Object.assign({}, state, {
                txs: [...state.txs]
            });
        default:
            return state;

    }
}

export const dashboardReducer = function(state = dashboardState, action){
    switch(action.type){
        case "Set Dashboard Loading":
            return Object.assign({}, state, {
                loading: action.loading
            });
        case "Set Own Series Contracts":
            return Object.assign({}, state, {
                ownSeriesContracts: action.ownSeriesContracts
            });
        default:
            return state;
    }
}