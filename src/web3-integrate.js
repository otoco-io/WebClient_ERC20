import Web3 from "web3";
import Web3Modal from "web3modal";

import WalletConnectProvider from "@walletconnect/web3-provider";
// import UniLogin from "@unilogin/provider";
import Authereum from "authereum";

export default {

    provider: undefined,

    callModal: async function() {

        if (this.provider == undefined) {
            const providerOptions = {
                authereum: {
                    package: Authereum
                },
                unilogin: {
                    package: UniLogin
                },
                walletconnect: {
                    package: WalletConnectProvider, // required
                    options: {
                        infuraId: "f2e6a40391274a0793c63e923de0a170" // required
                    }
                }
            };

            const web3Modal = new Web3Modal({
                // network: "mainnet", // optional
                // cacheProvider: true, // optional
                providerOptions, // required
                theme: "dark"
            });

            this.provider = await web3Modal.connect();
            console.log(this.provider);
            const web3 = new Web3(this.provider);
            window.web3 = web3;

            if (this.provider.isAuthereum) this.provider.authereum.showWidget();
            // else if (this.provider.isUniLogin) web3.currentProvider.callModal = this.provider.boundOpenDashboard;
            else web3.currentProvider.callModal = undefined;
        }
        return true;
    },
    disconnect: function () {
        this.provider = undefined;
        window.web3 = undefined;
    }
}
