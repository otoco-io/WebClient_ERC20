export const initAccountState = {
    memberInfo: {
        isLoggedIn: false,
        emailAddress: "",
    },
    currentAccount: "",
    accountBalanceETH: 0,
    accountBalanceERC20: 0,
    erc20Symbol: "",
    erc20SpinUpFee: "",
    isLocked: true,
    seriesLength: 0,
    series: [],
}

export const series = {
    idx: "",
    status: "Initialized",
    address: "",
    name: "",
}

export default initAccountState