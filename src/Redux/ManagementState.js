export const initManagementState = {
    manageSeries: {},
    manageOption: 0,
    sharesStep: 0,
    manageShares: {
        shares: 1000000,
        name: '',
        symbol: '',
        contract: ''
    },
    ensStep: 0,
    ensOptions: [
        {
            key: '0',
            text: '.otoco.eth',
            value: 'otoco.eth',
        },
        // {
        //     key: '1',
        //     text: '.eth',
        //     value: 'eth',
        // }
    ],
    manageEns: {
        selectedDomain: 'otoco.eth',
        name: '',
        rentTime: '63072000',           // 2 Years
        secret: '',
    }
}

export default initManagementState