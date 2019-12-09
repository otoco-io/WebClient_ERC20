import Web3ProviderOptionPanelState from './Web3ProviderOptionPanelState'
import welcomePanelState from './WelcomePanelState'
import accountState, {series} from './AccountState'
import txsState, {tx} from './TxsState'
import dashpanelState from './DashpanelState'

export const welcomePanelReducer = function(state = welcomePanelState, action){
    switch(action.type){
        case "WelcomePanel/OPEN":
            return Object.assign({}, state, {showBoard: true})
        case "WelcomePanel/CLOSE":
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
            return Object.assign({}, state, {currentStep: action.N})
        case "Enter Company Name on Welcome Board":
            return Object.assign({}, state, {
                inputCompanyName: action.value, 
                focusInputCompanyName: true
            });
        case "Unfocus Input-CompanyName on Welcome Board":
            return Object.assign({}, state, {
                focusInputCompanyName: false
            });
        case "Store Available Company Name":
            return Object.assign({}, state, {
                availableName: state.inputCompanyName + " LLC",
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

export const dashpanelReducer = function(state = dashpanelState, action) {
    switch(action.type) {
        case "Dashpanel/SetCurrentSeries":
            return Object.assign({}, state, {
                currentSeries: action.currentSeries
            });
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
        case "Set Account ETH Balance":
            return Object.assign({}, state, {
                accountBalanceETH: action.accountBalanceETH
            });
        case "Set Account ERC20 Balance":
            return Object.assign({}, state, {
                accountBalanceERC20: action.accountBalanceERC20
            });
        case "Set ERC20 Symbol":
            return Object.assign({}, state, {
                erc20Symbol: action.erc20Symbol
            });
        case "Set ERC20 Decimals":
            return Object.assign({}, state, {
                erc20Decimals: action.erc20Decimals
            });
        case "Set ERC20 Spin Up Fee":
            return Object.assign({}, state, {
                erc20SpinUpFee: action.erc20SpinUpFee
            });
        case "Account/UpdateSeriesLength":
            return Object.assign({}, state, {
                seriesLength: action.seriesLength
            });
        case "Account/PushSeries":
            return Object.assign({}, state, {
                series: [...state.series, {idx: action.idx, address: action.address, name: action.name, status: "Initialized"}]
            });
        case "Account/SeriesLoading":
            state.series[action.idx].status = "Loading...";
            return Object.assign({}, state, {
                series: [...state.series]
            });
        case "Account/SetSeriesName":
            state.series[action.idx].name = action.name
            state.series[action.idx].status = "Updated";
            return Object.assign({}, state, {
                series: [...state.series]
            });
        case "Account/SetNetwork":
            return Object.assign({}, state, {
                currentNetwork: action.currentNetwork
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

export const web3ProviderOptionPanelReducer = function(state = Web3ProviderOptionPanelState, action){
    switch(action.type){
        case "Web3ProviderOptionPanel/OPEN":
            return Object.assign({}, state, {showBoard: true})
        case "Web3ProviderOptionPanel/CLOSE":
            return Object.assign({}, state, {showBoard: false})
        default:
            return state;

    }
}