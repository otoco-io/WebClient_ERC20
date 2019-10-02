export const initWelcomePanelState = {
    showBoard: true,
    loading: false,
    approving: false,
    waitingTicktoc: 0,
    currentStep: 1,
    inputCompanyName: '',
    availableName: '',
    focusInputCompanyName: false,
    errMsg: {
        show: false,
        title: "",
        content: ""
    }
}

export default initWelcomePanelState