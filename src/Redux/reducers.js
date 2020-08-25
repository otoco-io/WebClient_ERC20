import welcomePanelState from './WelcomePanelState'
import accountState from './AccountState'
import dashboardState from './DashboardState'
import managementState from './ManagementState'
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
            if (state.jurisdictionSelected == "us_de") state.selectedCompanyName += " LLC"
            return Object.assign({}, state, {
                availableName: state.selectedCompanyName,
            });    
        case "Select Jurisdiction":
            return Object.assign({}, state, {
                jurisdictionSelected: action.value,
                jurisdictionName: action.name
            });
        case "Set Fees":
            return Object.assign({}, state, {
                fastFee: action.fast,
                totalCost: action.total
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
            // console.log('network',action.network);
            return Object.assign({}, state, {
                network: action.network
            });
        case "Set Account ETH Balance":
            return Object.assign({}, state, {
                accountBalanceETH: action.accountBalanceETH
            });
        case "Set Own Company Contracts":
            return Object.assign({}, state, {
                ownSeriesContracts: action.ownSeriesContracts
            });
        case "Disconnect":
            return Object.assign({}, state, {
                network: '',
                currentAccount: ''
            })
        default:
            return state;

    }
}

export const txsReducer = function(state = txsState, action){
    switch(action.type){
        case "Push Tx":
            return Object.assign({}, state, {
                id: action.txID
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

export const managementReducer = function(state = managementState, action){
    let obj = {};
    switch(action.type){
        case "Select Manage Series":
            let shares = {
                shares: 0,
                name: '',
                symbol: '',
                contract: ''
            }
            return Object.assign({}, state, {
                manageSeries: action.series,
                manageShares: shares,
                sharesStep: 0
            });
        case "Clear Manage Series":
            return Object.assign({}, state, {
                manageSeries: {}
            });
        case "Set Manage Option":
            return Object.assign({}, state, {
                manageOption: action.option
            });
        case "Set Shares Config":
            obj = state.manageShares;
            obj.name = action.token.name;
            obj.symbol = action.token.symbol;
            obj.shares = action.token.shares
            return Object.assign({}, state, {
                manageShares: obj
            });
        case "Set Shares Contract":
            obj = state.manageShares;
            obj.contract = action.contract;
            return Object.assign({}, state, {
                manageShares: obj
            });
        case "Set Shares Creation":
            obj = state.manageShares;
            obj.creation = action.creation;
            return Object.assign({}, state, {
                manageShares: obj
            });
        case "Set Shares Step":
            return Object.assign({}, state, {
                sharesStep: action.step
            });
        case "Set Shares Contract":
            obj = state.manageShares;
            obj.contract = action.contract;
            return Object.assign({}, state, obj);
        case "Set Config Shares":
            return Object.assign({}, state, {
                manageOption: action.option
            });
        default:
            return state;
    }
}