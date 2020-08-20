import React from 'react'

// Components
import WelcomePanel from './OtoCo/SpinUpCompanySteps/WelcomePanel'
import Dashboard from './OtoCo/Dashboard'
import Confirmation from './OtoCo/Confirmation'
import Tokens from './OtoCo/Tokens'
import Terms from './OtoCo/Terms'
import Privacy from './OtoCo/Privacy'
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default () => {
    return (
        <Router>
            <Route exact path="/" component={WelcomePanel}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/confirmation" component={Confirmation}/>
            <Route path="/terms" component={Terms}/>
            <Route path="/privacy" component={Privacy}/>
            <Route path="/tokens/:contract" component={Tokens}/>
        </Router>
    );
}

