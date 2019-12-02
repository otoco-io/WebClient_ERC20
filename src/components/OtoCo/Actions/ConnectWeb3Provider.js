
/*
TODO: 
Here should be accepted multi web3 provider options in the future.
Now we only implement for Metamask.
*/

const enableAccounts = async () => {
    console.log("enableAccounts!");
    const accounts = await ethereum.enable();
    console.log("accounts!", accounts);
    return accounts;
}

export const doWeb3ProviderConnect = (onSuccess, onError) => {
    console.log("doWeb3ProviderConnect!");
    enableAccounts().then(onSuccess).catch(onError);
}



/* Success
(accounts) => {
        ethereum.on('accountsChanged', function (accounts) {
            setAccount(accounts);
        })
        setAccount(accounts);

    }
*/

/* Error
(error) => {
        dispatch({ type: "Close Welcome Board Loading" });
        console.log("Something went wrong! Please try again later!: ", error)
    }
*/