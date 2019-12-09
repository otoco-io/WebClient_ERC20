
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