export const initAccountState = {
    memberInfo: {
        isLoggedIn: false,
        emailAddress: "",
    },
    currentAccount: "",
    currentNetwork: null,
    accountBalanceETH: 0,
    accountBalanceERC20: 0,
    erc20Symbol: "",
    erc20Decimals: "",
    erc20SpinUpFee: "",
    isLocked: true,
    seriesLength: 0,
    series: [],
}

export default initAccountState