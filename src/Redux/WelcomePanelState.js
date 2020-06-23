export const initWelcomePanelState = {
    showBoard: true,
    loading: false,
    approving: false,
    waitingTicktoc: 0,
    currentStep: 0,
    selectedCompanyName: '',
    availableName: '',
    jurisdictionSelected: 'us_de',
    jurisdictionName: 'Delaware',
    errMsg: {
        show: false,
        title: "",
        content: ""
    }
}

export default initWelcomePanelState