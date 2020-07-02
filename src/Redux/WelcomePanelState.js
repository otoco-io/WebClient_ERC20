export const initWelcomePanelState = {
    showBoard: true,
    loading: false,
    approving: false,
    waitingTicktoc: 0,
    currentStep: 0,
    selectedCompanyName: '',
    availableName: '',
    fastFee: 0,
    totalCost: '',
    jurisdictionSelected: 'us_de',
    jurisdictionName: 'Delaware',
    jurisdictionOptions: [
        {
            key: '0',
            text: 'Delaware',
            value: 'us_de',
        },
        {
            key: '1',
            text: 'Wyoming',
            value: 'us_wy',
        }
    ],
    jurisdictionStreet: {
        'us_de': '1201 N. Orange Street, Suite 7160, Wilmington, 19801 Delaware.',
        'us_wy': '30 N. Gould St Ste R, Sheridan, 82801 Wyoming'
    },
    errMsg: {
        show: false,
        title: "",
        content: ""
    }
}

export default initWelcomePanelState