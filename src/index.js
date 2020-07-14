// React
import React from 'react';
import ReactDOM from 'react-dom';

// Integrated Redux
import {StoreContext} from 'redux-react-hook';
import {store} from './Redux/store';

// Components
import App from './components/App';
import Logo from './components/Logo';
import AccountDetails from './components/AccountDetails';

// Style Sheets
import 'semantic-ui-less/semantic.less'
import './stylesheets/index.less'

import TagManager from 'react-gtm-module'

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
    <AccountDetails />
    <div class='footer'>
      <a href="http://otoco.otonomos.com" target="blank">Documentation and FAQs</a><br/>
      ©️ 2020 Otonomos Blockchain Technologies Ltd.
      </div>
  </StoreContext.Provider>,
  document.getElementById('app')
);




