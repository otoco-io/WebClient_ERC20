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
      <div id="welcome-pnl">
        <div className="logo-container">
            <Logo />
        </div>
        <App />
        {/* <Router>
          <Route path="/" component={App}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/terms" component={Dashboard}/>
          <Route path="/policy" component={Dashboard}/>
        </Router> */}
      </div>
    </StoreContext.Provider>,
    document.getElementById('app')
  );
}




