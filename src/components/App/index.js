import React from 'react'
import 'bulma/css/bulma.min.css'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import { withAuthentication } from '../Session'

import Login from '../Login'
import Dashboard from '../Dashboard'
import Landing from '../Landing';


const App = () => (
    <Router>
        <main>
            {/* <h1>App</h1> */}
            <Route exact path={ROUTES.LANDING} component={Landing} />
            <Route exact path={ROUTES.LOGIN} component={Login} />
            <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
        </main>
    </Router>
)
export default withAuthentication(App)