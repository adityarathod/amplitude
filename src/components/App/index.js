import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import Login from '../Login'

import 'bulma/css/bulma.min.css'

const App = () => (
    <Router>
        {/* <h1>App</h1> */}
        <Route exact path={ROUTES.LOGIN} component={Login} />
    </Router>
)
export default App