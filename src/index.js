// React
import React from 'react';
import ReactDOM from 'react-dom';

// Blockchain
import Web3Integrte from './web3-integrate'
const supported = Web3Integrte.init();

// Integrated Redux
import {StoreContext} from 'redux-react-hook';
import {store} from './Redux/store';

// Components
import App from './components/App';

// Style Sheets
import './stylesheets/index.less'
import 'semantic-ui-less/semantic.less'

import TagManager from 'react-gtm-module'



if(supported){
  const tagManagerArgs = {
    gtmId: 'GTM-NT2CJB3'
  }

  TagManager.initialize(tagManagerArgs)
  
  ReactDOM.render(
    <StoreContext.Provider value={store}>
        <App />
    </StoreContext.Provider>,
    document.getElementById('app')
  );
}




