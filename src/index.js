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
import Logo from './components/Logo';

// Style Sheets
import 'semantic-ui-less/semantic.less'
import './stylesheets/index.less'

import TagManager from 'react-gtm-module'

if(supported){
  const tagManagerArgs = {
    gtmId: 'GTM-NT2CJB3'
  }

  TagManager.initialize(tagManagerArgs)
  
  ReactDOM.render(
    <StoreContext.Provider value={store}>
      <div id="welcome-pnl">
        <div className="logo-container">
            <Logo />
        </div>
        <App />
      </div>
      <div class='footer'>©️ 2020 Otonomos Blockchain Technologies Ltd.</div>
    </StoreContext.Provider>,
    document.getElementById('app')
  );
}




