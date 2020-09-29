import firebase from "firebase";

var config = {
    apiKey: "AIzaSyDfskU_rkwnxDQ83BoZt4bnhPw_uV2fBao",
    authDomain: "otoco-281518.firebaseapp.com",
    databaseURL: "https://otoco-281518.firebaseio.com",
    storageBucket: "otoco-281518.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(config);

export default {

    fillForm: async (wallet, email, name, website) => {
        try {
            const res = await firebase.database().ref('data/' + wallet).set({
                email,
                // name,
                // website,
                filling: true
            });
            return res;
        } catch (err) {
            console.log(err);
        }
    },

    getFilling: async (wallet) => {
        const ret = await firebase.database().ref('/data/' + wallet +'/filling').once('value')
        return ret.val()
    }
}