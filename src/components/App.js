import React from 'react'

// Components
import WelcomePanel from './OtoCo/SpinUpCompanySteps/WelcomePanel'
import Dashboard from './OtoCo/Dashboard/Dashboard'
import Terms from './OtoCo/Dashboard/Terms'
import Privacy from './OtoCo/Dashboard/Privacy'
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default () => {
    return (
        <Router>
            <Route exact path="/" component={WelcomePanel}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/terms" component={Terms}/>
            <Route path="/privacy" component={Privacy}/>
        </Router>
    );
}

